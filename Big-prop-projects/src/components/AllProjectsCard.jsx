import { HiArrowLongRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import projectImg from '../assets/olive-hill.jpg';
import '../styles/Projects.css';

// Supply a real project route through `to` when project navigation is ready.
function AllProjectsCard({ title = 'Olive Hill', image = projectImg, imageAlt = 'Olive Hill building', to = '/project'}) {
  const content = (
    <>
      <img className="project-card-image" src={image} alt={imageAlt} loading="lazy" decoding="async" />
      <div className="card-text">
        <h2 className="project-title">{title}</h2>
        <HiArrowLongRight aria-hidden="true" />
      </div>
    </>
  );

  return to ? (
    <Link to={to} className="all-projects-card-div" aria-label={`View ${title}`}>{content}</Link>
  ) : (
    <article className="all-projects-card-div">{content}</article>
  );
}

export default AllProjectsCard;
