import { createServer } from 'node:http';
import { isIP } from 'node:net';
import { validateContact } from '../src/lib/contactValidation.js';
import { sendMail } from './mailgun.js';
import { verifyRecaptcha } from './recaptcha.js';
import { uploadLimits } from '../src/lib/contactUploads.js';
import { parseContactMultipart } from './contactUploads.js';

const MAX_BYTES = 24 * 1024;
const WINDOW_MS = 15 * 60 * 1000;
const normalIP = value => value?.replace(/^::ffff:/, '') || 'unknown';

export function createContactServer(config, { deliver = (values, settings, attachments) => sendMail(values, settings, fetch, attachments), verify = verifyRecaptcha, now = Date.now, maxRequests = 5 } = {}) {
  const attempts = new Map();
  let lastSweep = 0;
  const server = createServer(async (request, response) => {
    const reply = (status, body) => {
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      response.end(JSON.stringify(body));
    };
    const fail = (status, message) => reply(status, { success: false, message });
    if (request.url?.split('?')[0] !== '/api/contact') return fail(404, 'Not found.');
    const origin = request.headers.origin;
    if (origin && !config.origins.includes(origin)) return fail(403, 'This website is not allowed to submit this form.');
    if (origin) {
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Vary', 'Origin');
    }
    if (request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Methods', 'POST');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      response.writeHead(204); return response.end();
    }
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST, OPTIONS'); return fail(405, 'Use POST for contact enquiries.');
    }
    const current = now();
    if (current - lastSweep >= 60000) {
      for (const [key, entry] of attempts) if (entry.expires <= current) attempts.delete(key);
      lastSweep = current;
    }
    const remote = normalIP(request.socket.remoteAddress);
    let client = remote;
    // Trust only explicitly configured immediate proxies. They must append/overwrite X-Forwarded-For.
    if (config.trustedProxyIPs.map(normalIP).includes(remote)) {
      const forwarded = request.headers['x-forwarded-for']?.split(',').at(-1)?.trim();
      if (forwarded && isIP(forwarded)) client = normalIP(forwarded);
    }
    let entry = attempts.get(client);
    if (!entry || entry.expires <= current) {
      if (!entry && attempts.size >= 10000) return fail(503, 'The form is busy. Please try again later.');
      entry = { count: 0, expires: current + WINDOW_MS }; attempts.set(client, entry);
    }
    if (++entry.count > maxRequests) {
      response.setHeader('Retry-After', String(Math.ceil((entry.expires - current) / 1000)));
      return fail(429, 'Too many attempts. Please wait 15 minutes or call +27 81 045 0505.');
    }
    const contentType = request.headers['content-type'] || '';
    const mediaType = contentType.split(';')[0].trim().toLowerCase();
    const multipart = mediaType === 'multipart/form-data';
    const maxBytes = multipart ? uploadLimits.total + 64 * 1024 : MAX_BYTES;
    if (!multipart && mediaType !== 'application/json') {
      return fail(415, 'Please send a supported contact form.');
    }
    if (Number(request.headers['content-length']) > maxBytes) {
      request.resume(); return fail(413, 'The submitted form is too large.');
    }
    try {
      const chunks = [];
      let size = 0;
      // Drain oversized chunked bodies without keeping them in memory.
      for await (const chunk of request) {
        size += chunk.length;
        if (size > maxBytes) {
          if (!response.writableEnded) fail(413, 'The submitted form is too large.');
        } else if (!response.writableEnded) chunks.push(chunk);
      }
      if (response.writableEnded) return;
      let payload;
      let attachments = [];
      try {
        const body = Buffer.concat(chunks);
        if (multipart) {
          const parsed = await parseContactMultipart(body, contentType);
          if (parsed.error) return reply(400, { success: false, message: 'Please check the selected images.', errors: { images: parsed.error } });
          payload = parsed.payload;
          attachments = parsed.attachments;
        } else payload = JSON.parse(body.toString('utf8'));
      }
      catch { return fail(400, 'The submitted form could not be read.'); }
      const { values, errors } = validateContact(payload);
      if (Object.keys(errors).length) return reply(400, { success: false, message: 'Please check the highlighted fields.', errors });
      if (values.website) return fail(400, 'Unable to submit this form. Please call +27 81 045 0505.');
      if (typeof payload.captchaToken !== 'string' || !payload.captchaToken.trim() || payload.captchaToken.length > 8192) {
        return fail(400, 'Verification is required. Please submit the form again.');
      }
      try {
        if (!await verify(payload.captchaToken, config.recaptcha)) {
          return fail(403, 'Verification was unsuccessful. Please try again or call +27 81 045 0505.');
        }
      } catch {
        return fail(503, 'Verification is temporarily unavailable. Please try again later.');
      }
      try { await deliver(values, config, attachments); }
      catch {
        // Never return provider diagnostics, keys or visitor data to the browser/logs.
        console.error('Contact email delivery could not be confirmed.');
        return fail(502, 'We could not confirm submission. Please try again later or call +27 81 045 0505.');
      }
      return reply(200, { success: true, message: 'Your enquiry has been submitted.' });
    } catch {
      if (!response.writableEnded && !response.destroyed) fail(400, 'The submission was interrupted. Please try again.');
    }
  });
  server.requestTimeout = 90000;
  server.headersTimeout = 10000;
  return server;
}
