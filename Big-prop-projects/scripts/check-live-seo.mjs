import { site } from '../src/seo/site.js';

// Run only after the upgraded build is deployed on the production domain.
if (!process.argv.includes('--live')) {
  throw new Error('After launch, run: node scripts/check-live-seo.mjs --live');
}
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const get = url => fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
const robots = await get(`${site.origin}/robots.txt`);
const robotsText = await robots.text();
check(robots.status === 200 && robotsText.includes(`Sitemap: ${site.origin}/sitemap.xml`), 'robots.txt is missing its sitemap declaration.');
check(!/^Disallow:\s*\/\s*$/mi.test(robotsText), 'robots.txt blocks the entire website.');
const sitemap = await get(`${site.origin}/sitemap.xml`);
const xml = await sitemap.text();
check(sitemap.status === 200 && xml.includes('<urlset'), 'sitemap.xml is missing or invalid.');
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1].replace(/&amp;/g, '&'));
check(urls.length >= 7, 'The sitemap has fewer than the seven expected main/service pages.');
for (const url of urls) {
  if (new URL(url).origin !== site.origin) { failures.push(`Unexpected sitemap origin: ${url}`); continue; }
  try {
    const response = await get(url);
    const html = await response.text();
    check(response.status === 200, `${url}: HTTP ${response.status}, expected 200.`);
    check(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${url}: noindex response header.`);
    check(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html), `${url}: noindex meta tag.`);
    check(html.includes(`rel="canonical" href="${url}"`), `${url}: missing/mismatched canonical.`);
    check(/<title>[^<]+<\/title>/.test(html), `${url}: missing title.`);
    check(/name="description" content="[^"]+"/.test(html), `${url}: missing description.`);
  } catch { failures.push(`${url}: request failed.`); }
}
const missing = await get(`${site.origin}/seo-missing-page-check`);
check(missing.status === 404, `Unknown page returned ${missing.status}; expected 404.`);
const legacy = await get(`${site.origin}/service?type=waterproofing`);
check(legacy.status === 301 && legacy.headers.get('location') === `${site.origin}/services/waterproofing`, 'Legacy service URL is not permanently redirected.');
const apex = await get('http://bigpropprojects.co.za/about');
check([301, 308].includes(apex.status), 'HTTP/non-www domain is not permanently redirected.');
for (const failure of failures) console.error(failure);
console.log(`Checked ${urls.length} sitemap URLs. ${failures.length} issue(s). This checks crawl readiness, not Google index status.`);
process.exitCode = failures.length ? 1 : 0;
