import '../styles/ProjectsStatus.css';

export default function ProjectsStatus({ loading, error, retry, empty = 'No projects have been published yet.' }) {
  return (
    <div className="cms-projects-status" role="status" aria-live="polite">
      <p>{loading ? 'Loading projects…' : error ? 'Projects could not be loaded. Please try again.' : empty}</p>
      {error && <button type="button" onClick={retry}>Try again</button>}
    </div>
  );
}
