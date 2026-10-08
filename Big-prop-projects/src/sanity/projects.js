import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { defineQuery } from 'groq';

export const sanityConfig = {
  projectId: import.meta.env?.VITE_SANITY_PROJECT_ID || 'df6rlsmo',
  dataset: import.meta.env?.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-02-19',
  perspective: 'published',
  useCdn: true,
};
export const sanityClient = createClient(sanityConfig);
const builder = createImageUrlBuilder(sanityConfig);

export const projectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(date desc, title asc, _id asc) {
    _id, title, projectType, "slug": slug.current, description, location, date,
    "cover": images[0] { _key, alt, asset, crop, hotspot }
  }
`);
export const recentProjectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(date desc, title asc, _id asc)[0...4] {
    _id, title, projectType, "slug": slug.current, description, location, date,
    "cover": images[0] { _key, alt, asset, crop, hotspot }
  }
`);
export const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, projectType, "slug": slug.current, description, location, date,
    "cover": images[0] { _key, alt, asset, crop, hotspot },
    images[] { _key, alt, asset, crop, hotspot }
  }
`);

export function imageUrl(image, width, height) {
  if (!image?.asset?._ref) return '';
  try {
    let url = builder.image(image).width(width).auto('format').quality(85);
    if (height) url = url.height(height).fit('crop');
    return url.url();
  } catch {
    // An incomplete image should not break the rest of a project page.
    return '';
  }
}

export function formatProjectDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('en-ZA', {
    month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

export function mapProject(document) {
  if (!document) return null;
  return {
    id: document._id,
    slug: document.slug,
    to: `/project?project=${encodeURIComponent(document.slug)}`,
    title: document.title || 'Untitled project',
    projectType: document.projectType || '',
    description: document.description || '',
    location: document.location || '',
    dateTime: document.date || '',
    date: formatProjectDate(document.date),
    image: imageUrl(document.cover, 1000, 1200),
    cardImage: imageUrl(document.cover, 960, 720),
    imageAlt: document.cover?.alt || document.title || 'Project photograph',
    images: (document.images || []).map((image, index) => ({
      id: image._key || `${document._id}-${index}`,
      src: imageUrl(image, 1600, 1000),
      thumbnail: imageUrl(image, 320, 320),
      alt: image.alt || `${document.title} — photograph ${index + 1}`,
    })).filter(image => image.src),
  };
}

export async function fetchProjects(kind, slug, signal) {
  if (kind === 'detail' && !slug) return null;
  const query = kind === 'detail' ? projectQuery : kind === 'recent' ? recentProjectsQuery : projectsQuery;
  const result = await sanityClient.fetch(query, kind === 'detail' ? { slug } : {}, {
    signal, timeout: 15000,
  });
  return kind === 'detail' ? mapProject(result) : result.map(mapProject);
}
