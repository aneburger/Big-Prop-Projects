import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createContactServer } from './app.js';
import { sendMail } from './mailgun.js';
import { validateUploads, uploadLimits } from '../src/lib/contactUploads.js';

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jF9sAAAAASUVORK5CYII=', 'base64');
const values = { fullName: 'Test Visitor', email: 'test@example.com', area: 'Benoni', company: '',
  projectType: 'painting', budget: 'not-sure', timeline: 'future-option', description: 'Please paint my walls.', website: '', captchaToken: 'fake-token' };
const config = { origins: ['http://localhost:5173'], trustedProxyIPs: [], recaptcha: {},
  from: 'website@mg.example.com', to: 'owner@example.com', apiBase: 'https://api.mailgun.net', domain: 'mg.example.com', apiKey: 'fake' };
function form(files = []) {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) body.append(key, value);
  for (const file of files) body.append('images', file);
  return body;
}
async function runServer(run, verify = async () => true) {
  const deliveries = [];
  const server = createContactServer(config, { maxRequests: 50, verify,
    deliver: async (data, settings, files) => deliveries.push({ data, files }) });
  // Exercise the real handler using serialized multipart bytes without opening sockets.
  const post = async body => {
    const encoded = new Request('http://localhost/api/contact', { method: 'POST', body });
    const bytes = Buffer.from(await encoded.arrayBuffer());
    const request = Readable.from([bytes.subarray(0, 100), bytes.subarray(100)]);
    request.url = '/api/contact'; request.method = 'POST';
    request.headers = { 'content-type': encoded.headers.get('content-type') };
    request.socket = { remoteAddress: '127.0.0.1' };
    return new Promise((resolve, reject) => {
      const response = {
        writableEnded: false, destroyed: false, status: 200,
        setHeader() {},
        writeHead(status) { this.status = status; },
        end(text) { this.writableEnded = true; resolve(new Response(text, { status: this.status })); },
      };
      server.listeners('request')[0](request, response).catch(reject);
    });
  };
  await run(post, deliveries);
}
test('multipart enquiries work with no files and with multiple images', async () => {
  await runServer(async (post, deliveries) => {
    assert.equal((await post(form())).status, 200);
    const files = [new File([png], 'first.png', { type: 'image/png' }), new File([png], 'second.png', { type: 'image/png' })];
    assert.equal((await post(form(files))).status, 200);
    assert.equal(deliveries[0].files.length, 0);
    assert.equal(deliveries[1].files.length, 2);
    assert.deepEqual(deliveries[1].files[0].bytes, png);
    assert.equal(deliveries[1].data.description, values.description);
  });
});
test('invalid extensions, MIME, disguised text, empty files and too many files never send', async () => {
  await runServer(async (post, deliveries) => {
    const cases = [
      [new File([png], 'file.svg', { type: 'image/png' })],
      [new File([png], 'file.png', { type: 'image/jpeg' })],
      [new File(['not a photo'], 'file.jpg', { type: 'image/jpeg' })],
      [new File([], 'empty.png', { type: 'image/png' })],
      Array.from({ length: 6 }, () => new File([png], 'file.png', { type: 'image/png' })),
    ];
    for (const files of cases) {
      const response = await post(form(files));
      assert.equal(response.status, 400);
      assert.ok((await response.json()).errors.images);
    }
    assert.equal(deliveries.length, 0);
  });
});
test('shared metadata limits reject oversized individual and combined files', () => {
  const file = size => ({ name: 'photo.jpg', type: 'image/jpeg', size });
  assert.match(validateUploads([file(uploadLimits.perFile + 1)]), /5 MB/);
  assert.match(validateUploads([file(uploadLimits.perFile), file(uploadLimits.perFile), file(1)]), /10 MB/);
  assert.equal(validateUploads([]), '');
});
test('server enforces per-file size and multipart body limit', async () => {
  await runServer(async (post, deliveries) => {
    assert.equal((await post(form([new File([new Uint8Array(uploadLimits.perFile + 1)], 'large.png', { type: 'image/png' })]))).status, 400);
    assert.equal((await post(form([new File([new Uint8Array(uploadLimits.total + 65536)], 'large.png', { type: 'image/png' })]))).status, 413);
    assert.equal(deliveries.length, 0);
  });
});
test('duplicate fields and files in unexpected fields are rejected', async () => {
  await runServer(async (post, deliveries) => {
    const duplicate = form(); duplicate.append('email', 'other@example.com');
    assert.equal((await post(duplicate)).status, 400);
    const unexpected = form(); unexpected.append('emailFile', new File([png], 'photo.png'));
    assert.equal((await post(unexpected)).status, 400);
    assert.equal(deliveries.length, 0);
  });
});
test('attachments cannot bypass reCAPTCHA', async () => {
  await runServer(async (post, deliveries) => {
    assert.equal((await post(form([new File([png], 'photo.png', { type: 'image/png' })]))).status, 403);
    assert.equal(deliveries.length, 0);
  }, async () => false);
});
test('Mailgun receives repeated binary attachment fields and the existing enquiry text', async () => {
  await sendMail(values, config, async (url, options) => {
    const attachments = options.body.getAll('attachment');
    assert.equal(attachments.length, 2);
    assert.equal(attachments[0].name, 'photo.png');
    assert.equal(attachments[0].type, 'image/png');
    assert.deepEqual(Buffer.from(await attachments[0].arrayBuffer()), png);
    assert.match(options.body.get('text'), /Please paint my walls/);
    return new Response(JSON.stringify({ id: 'mock' }));
  }, [{ name: 'photo.png', type: 'image/png', bytes: png }, { name: 'other.png', type: 'image/png', bytes: png }]);
});
