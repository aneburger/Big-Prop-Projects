import { site } from '../src/seo/site.js';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const productionHost = new URL(site.origin).hostname;
  // The mail API remains a separately deployed endpoint; never rewrite it to HTML.
  if (url.pathname.startsWith('/api/')) return context.next();
  const isProduction = [productionHost, productionHost.replace(/^www\./, '')].includes(url.hostname);
  let redirect = false;
  if (isProduction && (url.protocol !== 'https:' || url.hostname !== productionHost)) {
    url.protocol = 'https:'; url.hostname = productionHost; redirect = true;
  }
  const path = url.pathname.replace(/\/$/, '') || '/';
  if (path === '/project') {
    const slug = url.searchParams.get('project');
    url.pathname = slug ? `/projects/${encodeURIComponent(slug)}` : '/projects';
    url.searchParams.delete('project'); redirect = true;
  } else if (path === '/service') {
    const type = url.searchParams.get('type') || 'painting';
    url.pathname = `/services/${encodeURIComponent(type)}`;
    url.searchParams.delete('type'); redirect = true;
  } else if (url.pathname.endsWith('/') && url.pathname !== '/') {
    url.pathname = path; redirect = true;
  }
  if (redirect) return Response.redirect(url.href, 301);
  const result = await context.next();
  const response = new Response(result.body, result);
  if (!isProduction) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}
