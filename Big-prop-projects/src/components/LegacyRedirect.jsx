import { Navigate, useLocation } from 'react-router-dom';
import { projectPath } from '../seo/site';

export default function LegacyRedirect({ kind }) {
  const { search, hash } = useLocation();
  const params = new URLSearchParams(search);
  const value = params.get(kind === 'project' ? 'project' : 'type');
  const target = kind === 'project'
    ? value ? projectPath(value) : '/projects'
    : `/services/${encodeURIComponent(value || 'painting')}`;
  return <Navigate to={target + hash} replace />;
}
