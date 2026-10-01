import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyRecaptcha } from './recaptcha.js';

const config = { version: 'v3', secret: 'DO-NOT-LOG-SECRET', hostnames: ['localhost'], minScore: 0.5 };
const valid = { success: true, hostname: 'localhost', action: 'contact_submit', score: 0.9 };

test('rejection diagnostics distinguish each cause without exposing secrets or tokens', async () => {
  for (const [result, reason] of [
    [{ success: false, 'error-codes': ['invalid-input-secret'] }, 'google-rejected-token'],
    [{ ...valid, hostname: 'other.example' }, 'hostname-mismatch'],
    [{ ...valid, action: 'login' }, 'action-mismatch'],
    [{ ...valid, score: undefined }, 'invalid-or-missing-score'],
    [{ ...valid, score: 0.1 }, 'score-below-threshold'],
    [null, 'google-rejected-token'],
  ]) {
    const logs = [];
    const allowed = await verifyRecaptcha('DO-NOT-LOG-TOKEN', config,
      async () => new Response(JSON.stringify(result)), entry => logs.push(entry));
    assert.equal(allowed, false);
    assert.equal(logs[0].reason, reason);
    assert.doesNotMatch(JSON.stringify(logs), /DO-NOT-LOG/);
  }
});
test('valid verification passes without logging; unknown Google error strings are redacted', async () => {
  const logs = [];
  assert.equal(await verifyRecaptcha('token', config,
    async () => new Response(JSON.stringify(valid)), entry => logs.push(entry)), true);
  assert.equal(logs.length, 0);
  await verifyRecaptcha('token', config,
    async () => new Response(JSON.stringify({ success: false, 'error-codes': ['DO-NOT-LOG-SECRET'] })), entry => logs.push(entry));
  assert.deepEqual(logs[0].errorCodes, ['redacted-nonstandard-error']);
});

test('previously unknown structured error codes remain visible', async () => {
  const logs = [];
  await verifyRecaptcha('private-token', config,
    async () => new Response(JSON.stringify({ success: false, 'error-codes': ['browser-error', 'new-provider-code'] })), entry => logs.push(entry));
  assert.deepEqual(logs[0].errorCodes, ['browser-error', 'new-provider-code']);
});
