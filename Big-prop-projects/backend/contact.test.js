import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { validateContact } from '../src/lib/contactValidation.js';
import { createContactServer } from './app.js';
import { readConfig, makeMessage, sendMail } from './mailgun.js';

const valid = { fullName: 'Ané O’Brien', email: 'ane+project@example.com', area: 'Benoni', company: '',
  projectType: 'painting', budget: 'not-sure', timeline: 'future-option', description: 'Walls & ceilings: repair, then paint.\nThank you!', website: '', captchaToken: 'test-token' };
const env = { MAILGUN_API_KEY: 'test-only', MAILGUN_DOMAIN: 'mg.example.com', MAILGUN_REGION: 'EU',
  FROM_EMAIL: 'website@mg.example.com', TO_EMAIL: 'owner@example.com', ALLOWED_ORIGINS: 'http://localhost:5173',
  RECAPTCHA_VERSION: 'v3', RECAPTCHA_SECRET: 'test-only', RECAPTCHA_HOSTNAMES: 'localhost' };
const config = readConfig(env);

test('validation accepts names, punctuation and multiline descriptions; trims fields', () => {
  const result = validateContact({ ...valid, fullName: ' Ané O’Brien ' });
  assert.deepEqual(result.errors, {}); assert.equal(result.values.fullName, valid.fullName);
});
test('validation rejects empty, malformed, oversized, tampered and header-injection inputs', () => {
  for (const input of [null, [], 'text', {}]) assert.ok(Object.keys(validateContact(input).errors).length);
  for (const [field, value] of [['email', 'x@example.com\r\nBcc:a@example.com'], ['fullName', {}],
    ['description', ' '.repeat(3001)], ['area', '   '], ['budget', 'free'], ['timeline', 'never'], ['projectType', 'invalid']]) {
    assert.ok(validateContact({ ...valid, [field]: value }).errors[field], field);
  }
});
test('configuration validates required server settings and uses EU endpoint', () => {
  assert.equal(config.apiBase, 'https://api.eu.mailgun.net');
  assert.throws(() => readConfig({ ...env, MAILGUN_API_KEY: '' }));
  assert.throws(() => readConfig({ ...env, MAILGUN_REGION: 'other' }));
  assert.throws(() => readConfig({ ...env, FROM_EMAIL: 'visitor@gmail.com' }));
  assert.throws(() => readConfig({ ...env, ALLOWED_ORIGINS: '*' }));
});
test('Mailgun payload fixes recipient/sender, uses Reply-To, and sends plain text', async () => {
  const message = makeMessage({ ...valid, to: 'attacker@example.com', description: '<script>example</script>' }, config);
  assert.equal(message.to, env.TO_EMAIL); assert.equal(message['h:Reply-To'], valid.email);
  assert.equal(message.html, undefined); assert.match(message.text, /Not sure yet/);
  await sendMail(valid, config, async (url, options) => {
    assert.equal(url, 'https://api.eu.mailgun.net/v3/mg.example.com/messages');
    assert.equal(options.body.get('to'), env.TO_EMAIL);
    assert.equal(options.body.get('h:Reply-To'), valid.email);
    assert.equal(options.body.get('html'), null);
    return new Response(JSON.stringify({ id: 'mock-message' }), { status: 200 });
  });
  await assert.rejects(sendMail(valid, config, async () => new Response('{}', { status: 401 })));
});

async function withServer(run, options = {}) {
  const sent = [];
  const server = createContactServer(config, { deliver: async values => { sent.push(values); }, verify: async () => true, ...options });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const url = `http://127.0.0.1:${server.address().port}/api/contact`;
  const post = (body, headers = {}) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  try { await run({ post, url, sent }); }
  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}
test('API sends valid enquiries and never sends invalid forms or honeypot submissions', async () => {
  await withServer(async ({ post, sent }) => {
    assert.equal((await post(valid)).status, 200);
    const invalid = await post({ ...valid, email: 'not-an-email' });
    assert.equal(invalid.status, 400); assert.ok((await invalid.json()).errors.email);
    assert.equal((await post({ ...valid, website: 'spam.example' })).status, 400);
    assert.equal(sent.length, 1);
  });
});
test('API blocks unapproved origins and malformed/oversized payloads', async () => {
  await withServer(async ({ post, url, sent }) => {
    assert.equal((await post(valid, { Origin: 'https://other.example' })).status, 403);
    assert.equal((await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' })).status, 400);
    assert.equal((await post({ ...valid, description: 'x'.repeat(25000) })).status, 413);
    assert.equal((await fetch(url)).status, 405);
    assert.equal((await post(valid, { 'Content-Type': 'text/plain' })).status, 415);
    assert.equal(sent.length, 0);
  });
});
test('rate limit ignores spoofed forwarding headers and resets after expiry', async () => {
  let clock = Date.now();
  await withServer(async ({ post, sent }) => {
    assert.equal((await post(valid)).status, 200);
    const limited = await post(valid, { 'X-Forwarded-For': '203.0.113.9' });
    assert.equal(limited.status, 429); assert.ok(limited.headers.get('retry-after'));
    clock += 16 * 60 * 1000;
    assert.equal((await post(valid)).status, 200); assert.equal(sent.length, 2);
  }, { maxRequests: 1, now: () => clock });
});
test('provider failures do not report success or leak diagnostics', async () => {
  await withServer(async ({ post }) => {
    const response = await post(valid); const body = await response.json();
    assert.equal(response.status, 502); assert.equal(body.success, false);
    assert.ok(!JSON.stringify(body).includes('secret-provider-error'));
  }, { deliver: async () => { throw new Error('secret-provider-error'); } });
});

test('API never sends email for missing, rejected or unavailable verification', async () => {
  await withServer(async ({ post, sent }) => {
    assert.equal((await post({ ...valid, captchaToken: undefined })).status, 400);
    assert.equal((await post(valid)).status, 403);
    assert.equal(sent.length, 0);
  }, { verify: async () => false });
  await withServer(async ({ post, sent }) => {
    assert.equal((await post(valid)).status, 503);
    assert.equal(sent.length, 0);
  }, { verify: async () => { throw new Error('Verification unavailable'); } });
});
