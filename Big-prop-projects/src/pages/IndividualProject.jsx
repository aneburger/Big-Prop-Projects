import "../styles/IndividualProject.css"
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Partners from "../components/Partners"
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import projectImg from "../assets/olive-hill-large.png";
import ProjectGallery from "../components/ProjectGallery";

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

        <div className="back-to-projects">
          <Link to="/projects">
            <IoIosArrowBack />
            <p>BACK</p>
          </Link>
        </div>

        <div className="individual-project-grid">
          <section className="project-info">
            <h1>Olive Hill</h1>
            <p className="project-description">Modern residential development with premium finishes.</p>
            <p className="project-location"><IoLocationOutline />Brentwood Park, Benoni</p>
          </section>

          <section className="project-button-section">
            <p>Now, let's talk about your project.</p>
            <div className="project-buttons">
              <a className="project-contact-btn button-swap" href="#project-contact">
                Contact Us
              </a>
              <a href="tel:+27810450505" className="project-nr-btn button-swap">+27 81 045 0505</a>
            </div>
          </section>

          <div className="project-images">
            <ProjectGallery images={projectImages} duration={5000} label="Olive Hill photographs" />
          </div>
        </div>


      </main>

      <Partners />
      <div id="project-contact"><ContactUs /></div>
      <Footer />

    </div>
  )
}

export default IndividualProject
