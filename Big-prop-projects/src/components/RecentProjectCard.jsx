import { Link } from 'react-router-dom';
import { HiArrowLongUp } from 'react-icons/hi2';
import '../styles/RecentProjects.css';

export default function RecentProjectCard({ project }) {
  return (
    <Link className="recent-project-div" to={project.to} aria-label={`View ${project.title}`}>
      {project.image ? <img className="recent-project-image" src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
        : <span className="cms-project-image-placeholder">Image coming soon</span>}
      {project.date && <time className="recent-project-date" dateTime={project.dateTime}>{project.date}</time>}
      <div className="recent-project-text">
        <h2>{project.title}</h2>
        <p className="recent-project-location">{project.location}</p>
        <div className="recent-project-summary">
          <p className="recent-project-description">{project.description}</p>
          <span className="recent-project-arrow" aria-hidden="true"><HiArrowLongUp /></span>
        </div>
      </div>
    </Link>
  );
}
