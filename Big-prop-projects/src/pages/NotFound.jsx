import { Link } from 'react-router-dom';
import PageSeo from '../components/PageSeo';

export default function NotFound() {
  return <main style={{ padding: 'calc(var(--header-height, 5rem) + 3rem) var(--page-inset, 2rem)', minHeight: '70vh' }}>
    <PageSeo title="Page not found | Big Prop Projects" description="This page could not be found." noindex />
    <h1>Page not found</h1>
    <p>This page may have moved or is no longer available.</p>
    <Link to="/">Return to Home</Link>
  </main>;
}
