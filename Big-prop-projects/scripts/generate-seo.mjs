import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { loadEnv } from 'vite';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { defineQuery } from 'groq';
import { site, staticPages, projectMeta, headMarkup, escapeHTML } from '../src/seo/site.js';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const config = {
  projectId: env.VITE_SANITY_PROJECT_ID || 'df6rlsmo',
  dataset: env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-02-19', perspective: 'published', useCdn: false,
};
const query = defineQuery(`*[_type == "project" && defined(slug.current)] | order(slug.current asc) {
  title, description, location, "slug": slug.current, _updatedAt,
  "cover": images[0] {asset, crop, hotspot}
}`);
// Fail the build if Sanity is unavailable rather than publish an incomplete sitemap.
const projects = await createClient(config).fetch(query, {}, { timeout: 20000 });
const images = createImageUrlBuilder(config);
const dist = resolve('dist');
const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const marker = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;
if (!marker.test(template)) throw new Error('Missing SEO markers in index.html.');
const entries = Object.entries(staticPages).map(([path, meta]) => ({ ...meta, path }));
const seen = new Set();
for (const project of projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || seen.has(project.slug)) {
    throw new Error('Sanity contains an invalid or duplicate project slug. Fix it before deploying.');
  }
  seen.add(project.slug);
  const image = project.cover?.asset ? images.image(project.cover).width(1200).height(630).fit('crop').auto('format').url() : undefined;
  entries.push({ ...projectMeta({ ...project, cardImage: image }), lastmod: project._updatedAt });
}
if (entries.length > 50000) throw new Error('Split the sitemap before publishing more than 50,000 URLs.');
for (const meta of entries) {
  // Flat .html files let Cloudflare serve extensionless URLs without forcing trailing slashes.
  const file = resolve(dist, meta.path === '/' ? 'index.html' : `${meta.path.slice(1)}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, template.replace(marker, () => `<!-- SEO:START -->${headMarkup(meta)}<!-- SEO:END -->`));
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(meta => {
  const lastmod = meta.lastmod && !Number.isNaN(Date.parse(meta.lastmod)) ? `<lastmod>${new Date(meta.lastmod).toISOString()}</lastmod>` : '';
  return `  <url><loc>${escapeHTML(site.origin + meta.path)}</loc>${lastmod}</url>`;
}).join('\n')}\n</urlset>\n`;
await writeFile(resolve(dist, 'sitemap.xml'), sitemap);
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.origin}/sitemap.xml\n`);
const notFound = { title: 'Page not found | Big Prop Projects', description: 'This page could not be found.', noindex: true };
await writeFile(resolve(dist, '404.html'), template.replace(marker, () => headMarkup(notFound)));
console.log(`Generated sitemap.xml, robots.txt and metadata for ${entries.length} routes (${projects.length} Sanity projects).`);
