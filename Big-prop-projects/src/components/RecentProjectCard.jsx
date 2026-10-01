import { Link } from 'react-router-dom';
import { HiArrowLongUp } from 'react-icons/hi2';
import { recentProjects } from '../data/recentProjects';
import '../styles/RecentProjects.css';

export default function RecentProjectCard({ project = recentProjects[0] }) {
  return (
    <Link className="recent-project-div" to={`/project?project=${project.id}`} aria-label={`View ${project.title}`}>
      <img className="recent-project-image" src={project.image} alt="" loading="lazy" decoding="async" />
      <time className="recent-project-date" dateTime={project.dateTime}>{project.date}</time>
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
