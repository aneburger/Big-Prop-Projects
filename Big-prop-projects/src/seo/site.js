export const site = {
  origin: 'https://www.bigpropprojects.co.za',
  name: 'Big Prop Projects',
  phone: '+27810450505',
  email: 'roelof@bigpropprojects.co.za',
  street: '505 Serene Street',
  locality: 'Garsfontein, Pretoria',
  region: 'Gauteng',
};

export const serviceKeys = ['painting', 'waterproofing', 'roofing', 'renovations'];
export const staticPages = {
  '/': { title: 'Property Maintenance & Renovations in Pretoria | Big Prop Projects', description: 'Painting, waterproofing, roofing and renovations in Pretoria and across Gauteng. Contact Big Prop Projects for your residential or commercial project.' },
  '/about': { title: 'About Big Prop Projects | Pretoria, Gauteng', description: 'Meet Big Prop Projects, a Pretoria-based team providing property maintenance and residential and commercial renovations across Gauteng.' },
  '/projects': { title: 'Our Property Projects | Big Prop Projects', description: 'Explore Big Prop Projects’ painting, waterproofing, roofing and renovation work. View project photographs, locations and details.' },
  '/services/painting': { title: 'Painting Services in Pretoria & Gauteng | Big Prop Projects', description: 'Interior, exterior, office, retail and industrial painting in Pretoria and Gauteng. Discuss your property with Big Prop Projects.' },
  '/services/waterproofing': { title: 'Waterproofing in Pretoria & Gauteng | Big Prop Projects', description: 'Roof, balcony, bathroom and foundation waterproofing in Pretoria and Gauteng. Protect your property with Big Prop Projects.' },
  '/services/roofing': { title: 'Roof Repairs & Installation in Pretoria | Big Prop Projects', description: 'Roof repairs, preventative maintenance and complete roof installations in Pretoria and Gauteng. Contact Big Prop Projects to discuss your roof.' },
  '/services/renovations': { title: 'Home & Commercial Renovations in Pretoria | Big Prop Projects', description: 'Residential, office, kitchen and bathroom renovations, alterations and property upgrades in Pretoria and Gauteng.' },
};

export const projectPath = slug => `/projects/${encodeURIComponent(slug)}`;
export function projectMeta(project) {
  return {
    path: projectPath(project.slug),
    title: `${project.title}${project.location ? ` | ${project.location}` : ''} | Big Prop Projects`,
    description: (project.description || `View ${project.title}, a Big Prop Projects property project.`).replace(/\s+/g, ' ').slice(0, 160),
    image: project.cardImage || undefined,
  };
}

export function businessSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.origin}/#business`, name: site.name, url: `${site.origin}/`,
    logo: `${site.origin}/logo.svg`, telephone: site.phone, email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: site.street, addressLocality: site.locality, addressRegion: site.region, addressCountry: 'ZA' },
    areaServed: [{ '@type': 'City', name: 'Pretoria' }, { '@type': 'AdministrativeArea', name: 'Gauteng' }],
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' }],
  };
}

export const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
export const safeJSON = value => JSON.stringify(value).replace(/</g, '\\u003c');

export function headMarkup(meta) {
  const canonical = new URL(meta.path || '/', site.origin).href;
  return `<title>${escapeHTML(meta.title)}</title>
<meta name="description" content="${escapeHTML(meta.description)}" data-seo />
<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" data-seo />
${meta.noindex ? '' : `<link rel="canonical" href="${escapeHTML(canonical)}" data-seo />`}
<meta property="og:type" content="website" data-seo />
<meta property="og:site_name" content="${site.name}" data-seo />
<meta property="og:locale" content="en_ZA" data-seo />
<meta property="og:title" content="${escapeHTML(meta.title)}" data-seo />
<meta property="og:description" content="${escapeHTML(meta.description)}" data-seo />
<meta property="og:url" content="${escapeHTML(canonical)}" data-seo />
${meta.image ? `<meta property="og:image" content="${escapeHTML(meta.image)}" data-seo />` : ''}
<script type="application/ld+json" data-seo>${safeJSON(businessSchema())}</script>`;
}
