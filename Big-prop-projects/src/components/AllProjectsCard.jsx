import { HiArrowLongRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';

function AllProjectsCard({ title, image, imageAlt, to }) {
  const content = (
    <>
      {image ? <img className="project-card-image" src={image} alt={imageAlt} loading="lazy" decoding="async" />
        : <span className="cms-project-image-placeholder">Image coming soon</span>}
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
