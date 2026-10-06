import { IoIosArrowForward } from 'react-icons/io';
import { HiArrowLongRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import RecentProjectCard from './RecentProjectCard';
import SectionReveal from './SectionReveal';
import useProjects from '../hooks/useProjects';
import ProjectsStatus from './ProjectsStatus';
import '../styles/RecentProjects.css';

export default function RecentProjects() {
  const { data: recentProjects = [], ...status } = useProjects('recent');
  return (
    <section className="projects-div" aria-label="Recent projects" id="recent-projects">
      <SectionReveal className="recent-projects">
        <IoIosArrowForward aria-hidden="true" />
        <p>RECENT PROJECTS</p>
      </SectionReveal>
      <div className="recent-project-sections">
        {(status.loading || status.error || !recentProjects?.length) && <ProjectsStatus {...status} />}
        {recentProjects?.map((project, index) => (
          <SectionReveal key={project.id} className="recent-project-reveal" delay={index * 0.18} amount={0.25}>
            <RecentProjectCard project={project} />
          </SectionReveal>
        ))}
      </div>
      <div className="view-all-projects">
        <Link to="/projects" className="button-swap view-all-projects-button">View all projects <HiArrowLongRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
