import "../styles/IndividualProject.css"
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Partners from "../components/Partners"
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import projectImg from "../assets/olive-hill-large.png";

function IndividualProject() {
  return (
    <div>
      <div className="individual-project-div">

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
              <button className="project-contact-btn">
                Contact Us
              </button>
              <a href="tel:+27810450505" className="project-nr-btn">+27 81 045 0505</a>
            </div>
          </section>

          <section className="project-images">
            <img src={projectImg} alt="olive hill building"/>
          </section>
        </div>


      </div>

        <Partners />
        <ContactUs />
        <Footer />

    </div>
  )
}

export default IndividualProject
