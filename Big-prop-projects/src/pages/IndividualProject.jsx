import "../styles/IndividualProject.css"
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Partners from "../components/Partners"
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import useProjects from '../hooks/useProjects';
import ProjectsStatus from '../components/ProjectsStatus';
import ProjectGallery from "../components/ProjectGallery";
import SectionReveal from '../components/SectionReveal';

function IndividualProject() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('project') || '';
  const { data: project, ...status } = useProjects('detail', slug);
  if (!slug) return <Navigate to="/projects" replace />;
  return (
    <div className="individual-project-page">
      <main className="individual-project-div">

        <SectionReveal className="back-to-projects" onEnter delay={0.2}>
          <Link to="/projects">
            <IoIosArrowBack />
            <p>BACK</p>
          </Link>
        </SectionReveal>

        {(status.loading || status.error || !project) ? (
          <ProjectsStatus {...status} empty="This project is no longer available. Use Back to view all projects." />
        ) : <div className="individual-project-grid" key={project.id}>
          <section className="project-info">
            <SectionReveal as="h1" delay={0.35}>{project.title}</SectionReveal>
            <SectionReveal as="p" className="project-description" delay={0.6}>{project.description}</SectionReveal>
            <SectionReveal as="p" className="project-location" delay={0.85}><IoLocationOutline />{project.location}</SectionReveal>
          </section>

          <section className="project-button-section">
            <SectionReveal as="p" delay={0.3}>Now, let's talk about your project.</SectionReveal>
            <SectionReveal className="project-buttons" delay={0.6}>
              <a className="project-contact-btn button-swap" href="#project-contact">
                Contact Us
              </a>
              <a href="tel:+27810450505" className="project-nr-btn button-swap">+27 81 045 0505</a>
            </SectionReveal>
          </section>

          <SectionReveal className="project-images" delay={0.45} amount={0.1}>
            {project.images.length ? <ProjectGallery key={project.id} images={project.images} duration={5000} label={`${project.title} photographs`} />
              : <ProjectsStatus empty="Photographs will be added soon." />}
          </SectionReveal>
        </div>}


      </main>

      <Partners />
      <div id="project-contact"><ContactUs /></div>
      <Footer />

    </div>
  )
}

export default IndividualProject
