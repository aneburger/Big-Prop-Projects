export function readRecaptchaConfig(env = process.env) {
  if (env.RECAPTCHA_VERSION !== 'v3') throw new Error('This contact form requires RECAPTCHA_VERSION=v3.');
  if (!env.RECAPTCHA_SECRET?.trim()) throw new Error('Missing RECAPTCHA_SECRET.');
  const hostnames = (env.RECAPTCHA_HOSTNAMES || '').split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  if (!hostnames.length || hostnames.some(host => !/^[a-z0-9.-]+$/.test(host))) {
    throw new Error('RECAPTCHA_HOSTNAMES must contain exact hostnames, without schemes, paths or ports.');
  }
  const minScore = Number(env.RECAPTCHA_MIN_SCORE ?? '0.5');
  if (!Number.isFinite(minScore) || minScore < 0 || minScore > 1) throw new Error('RECAPTCHA_MIN_SCORE must be between 0 and 1.');
  return { version: env.RECAPTCHA_VERSION, secret: env.RECAPTCHA_SECRET, hostnames, minScore };
}

const safeName = value => typeof value === 'string' && /^[a-zA-Z0-9._/-]{1,253}$/.test(value) ? value : '(missing or invalid)';

export async function verifyRecaptcha(token, config, fetcher = fetch,
  report = diagnostic => console.warn('[reCAPTCHA]', JSON.stringify(diagnostic))) {
  const reject = (reason, details = {}) => { report({ reason, ...details }); return false; };
  if (typeof token !== 'string' || !token.trim() || token.length > 8192) return reject('invalid-token-format');
  const response = await fetcher('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: config.secret, response: token }), signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    report({ reason: 'google-http-error', status: response.status });
    throw new Error('Verification service unavailable.');
  }
  const result = await response.json();
  // Report only diagnostic metadata. Never log the token, secret, full response or form data.
  if (result?.success !== true) {
    const errors = Array.isArray(result?.['error-codes']) ? result['error-codes'] : [];
    return reject('google-rejected-token', {
      errorCodes: errors.slice(0, 8).map(code => {
        // Google's published list is not exhaustive. Preserve short structured codes,
        // while excluding free text, tokens and anything containing the configured secret.
        const safe = typeof code === 'string' && code.length <= 80
          && /^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*$/.test(code)
          && !code.includes(token) && !(config.secret && code.includes(config.secret));
        return safe ? code : 'redacted-nonstandard-error';
      }),
    });
  }
  if (typeof result.hostname !== 'string' || !config.hostnames.includes(result.hostname.toLowerCase())) {
    return reject('hostname-mismatch', { hostname: safeName(result.hostname) });
  }
  if (config.version !== 'v3' || result.action !== 'contact_submit') {
    return reject('action-mismatch', { action: safeName(result.action), expectedAction: 'contact_submit' });
  }
  if (typeof result.score !== 'number' || !Number.isFinite(result.score) || result.score < 0 || result.score > 1) {
    return reject('invalid-or-missing-score');
  }
  if (result.score < config.minScore) {
    return reject('score-below-threshold', { score: result.score, requiredScore: config.minScore });
  }
  return true;
}
