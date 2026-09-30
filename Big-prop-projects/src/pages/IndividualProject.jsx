import "../styles/IndividualProject.css"
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Partners from "../components/Partners"
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import projectImg from "../assets/olive-hill-large.png";
import ProjectGallery from "../components/ProjectGallery";
import SectionReveal from '../components/SectionReveal';

// Replace these src values with separate photos when they are available.
const projectImages = Array.from({ length: 5 }, (_, index) => ({
  id: `olive-hill-${index + 1}`,
  src: projectImg,
  alt: 'Olive Hill residential development',
}));

function IndividualProject() {
  return (
    <div className="individual-project-page">
      <main className="individual-project-div">

        <SectionReveal className="back-to-projects" onEnter delay={0.2}>
          <Link to="/projects">
            <IoIosArrowBack />
            <p>BACK</p>
          </Link>
        </SectionReveal>

        <div className="individual-project-grid">
          <section className="project-info">
            <SectionReveal as="h1" delay={0.35}>Olive Hill</SectionReveal>
            <SectionReveal as="p" className="project-description" delay={0.6}>Modern residential development with premium finishes.</SectionReveal>
            <SectionReveal as="p" className="project-location" delay={0.85}><IoLocationOutline />Brentwood Park, Benoni</SectionReveal>
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
            <ProjectGallery images={projectImages} duration={5000} label="Olive Hill photographs" />
          </SectionReveal>
        </div>


      </main>

      <Partners />
      <div id="project-contact"><ContactUs /></div>
      <Footer />

    </div>
  )
}

export default IndividualProject
