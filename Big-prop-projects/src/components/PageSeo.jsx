import { useEffect } from 'react';
import { headMarkup } from '../seo/site';

// Also generated into each route's initial HTML at build time.
export default function PageSeo({ title, description, path, image, noindex = false }) {
  useEffect(() => {
    document.head.querySelectorAll('title, [data-seo]').forEach(element => element.remove());
    const template = document.createElement('template');
    template.innerHTML = headMarkup({ title, description, path, image, noindex });
    document.head.append(template.content);
  }, [title, description, path, image, noindex]);
  return null;
}
