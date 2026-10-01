import test from 'node:test';
import assert from 'node:assert/strict';
import { readRecaptchaConfig, verifyRecaptcha } from './recaptcha.js';

const config = readRecaptchaConfig({ RECAPTCHA_VERSION: 'v3', RECAPTCHA_SECRET: 'test-only', RECAPTCHA_HOSTNAMES: 'example.com' });
const accepted = { success: true, hostname: 'example.com', action: 'contact_submit', score: 0.9 };
const provider = result => async () => new Response(JSON.stringify(result));

test('valid v3 verification passes and wrong action/hostname/score fails', async () => {
  assert.equal(await verifyRecaptcha('token', config, provider(accepted)), true);
  for (const patch of [{ success: false }, { hostname: 'evil.example' }, { action: 'login' }, { action: undefined },
  { score: 0.1 }, { score: '0.9' }, { score: undefined }, { score: 2 }]) {
    assert.equal(await verifyRecaptcha('token', config, provider({ ...accepted, ...patch })), false);
  }
});
test('missing or malformed tokens are rejected without contacting Google', async () => {
  const unexpected = () => { throw new Error('Should not call Google'); };
  for (const token of [undefined, '', '   ', {}, 'a'.repeat(8193)]) {
    assert.equal(await verifyRecaptcha(token, config, unexpected), false);
  }
});
test('configuration cannot disable v3 score checking', () => {
  for (const patch of [{ RECAPTCHA_VERSION: 'v2' }, { RECAPTCHA_SECRET: '' }, { RECAPTCHA_HOSTNAMES: '*' }, { RECAPTCHA_MIN_SCORE: 'NaN' }]) {
    assert.throws(() => readRecaptchaConfig({ RECAPTCHA_VERSION: 'v3', RECAPTCHA_SECRET: 'test', RECAPTCHA_HOSTNAMES: 'example.com', ...patch }));
  }
});
test('verification uses server secret and fails closed on provider errors', async () => {
  await verifyRecaptcha('token', config, async (url, options) => {
    assert.equal(url, 'https://www.google.com/recaptcha/api/siteverify');
    assert.equal(options.body.get('secret'), 'test-only');
    assert.equal(options.body.get('response'), 'token');
    return new Response(JSON.stringify(accepted));
  });
  await assert.rejects(verifyRecaptcha('token', config, async () => new Response('{}', { status: 503 })));
  await assert.rejects(verifyRecaptcha('token', config, async () => { throw new Error('Timeout'); }));
});
