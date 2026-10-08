import { useLocation } from 'react-router-dom';
import PageSeo from './PageSeo';
import { staticPages } from '../seo/site';

export default function RouteSeo() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '') || '/';
  const meta = staticPages[path];
  return meta ? <PageSeo {...meta} path={path} /> : null;
}
