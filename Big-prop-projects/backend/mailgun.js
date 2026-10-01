import { budgets, projectTypes, timelines, validEmail } from '../src/lib/contactValidation.js';
import { readRecaptchaConfig } from './recaptcha.js';

export function readConfig(env = process.env) {
  for (const name of ['MAILGUN_API_KEY', 'MAILGUN_DOMAIN', 'MAILGUN_REGION', 'FROM_EMAIL', 'TO_EMAIL', 'ALLOWED_ORIGINS']) {
    if (!env[name]?.trim()) throw new Error(`Missing ${name}. Configure backend/.env first.`);
  }
  if (!['US', 'EU'].includes(env.MAILGUN_REGION)) throw new Error('MAILGUN_REGION must be US or EU.');
  if (!/^[a-zA-Z0-9.-]+$/.test(env.MAILGUN_DOMAIN)) throw new Error('Invalid MAILGUN_DOMAIN.');
  if (!validEmail(env.FROM_EMAIL) || !validEmail(env.TO_EMAIL)) throw new Error('Use a single plain email address for FROM_EMAIL and TO_EMAIL.');
  if (env.FROM_EMAIL.split('@')[1].toLowerCase() !== env.MAILGUN_DOMAIN.toLowerCase()) {
    throw new Error('FROM_EMAIL must use your Mailgun sending domain.');
  }
  const origins = env.ALLOWED_ORIGINS.split(',').map(value => value.trim());
  if (origins.some(origin => { try { return new URL(origin).origin !== origin || !/^https?:\/\//.test(origin); } catch { return true; } })) {
    throw new Error('ALLOWED_ORIGINS must contain exact http(s) origins without trailing slashes.');
  }
  const port = Number(env.PORT || 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT.');
  return {
    recaptcha: readRecaptchaConfig(env),
    apiKey: env.MAILGUN_API_KEY, domain: env.MAILGUN_DOMAIN,
    apiBase: env.MAILGUN_REGION === 'EU' ? 'https://api.eu.mailgun.net' : 'https://api.mailgun.net',
    from: env.FROM_EMAIL, to: env.TO_EMAIL, origins, port, host: env.HOST || '127.0.0.1',
    trustedProxyIPs: (env.TRUSTED_PROXY_IPS || '').split(',').map(value => value.trim()).filter(Boolean),
  };
}

const label = (items, value) => items.find(item => item.value === value)?.label || value;
export function makeMessage(values, config) {
  // Plain text avoids interpreting enquiry content as HTML. Headers never use the name/message.
  const text = [
    'New Big Prop Projects enquiry', '',
    `Full name: ${values.fullName}`, `Email: ${values.email}`, `Area: ${values.area}`,
    `Company: ${values.company || 'Not provided'}`,
    `Project type: ${label(projectTypes, values.projectType)}`,
    `Budget: ${label(budgets, values.budget)}`, `Start: ${label(timelines, values.timeline)}`,
    '', 'Project description:', values.description,
  ].join('\n');
  return {
    from: `Big Prop Projects website <${config.from}>`, to: config.to,
    subject: 'New website project enquiry', 'h:Reply-To': values.email, text,
  };
}

export async function sendMail(values, config, fetcher = fetch) {
  const body = new FormData();
  for (const [name, value] of Object.entries(makeMessage(values, config))) body.append(name, value);
  const response = await fetcher(`${config.apiBase}/v3/${encodeURIComponent(config.domain)}/messages`, {
    method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`api:${config.apiKey}`).toString('base64')}` },
    body, signal: AbortSignal.timeout(12000),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.id) throw new Error('Mailgun did not confirm message acceptance.');
}
