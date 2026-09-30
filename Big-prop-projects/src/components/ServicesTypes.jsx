import "../styles/Services.css"
import { IoIosArrowBack } from "react-icons/io";
import interiorImg from "../assets/interior.jpeg";
import exteriorImg from "../assets/exterior.jpeg";
import retailImg from "../assets/retail.jpeg";
import industrialImg from "../assets/industrial.jpeg";
import { Link } from "react-router-dom";
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Partners from "../components/Partners"

function ServicesTypes() {
  return (
    <div className="service-types-page">
      <main>
      <div className="service-types-body">
        <div className="service-types-content">
          <div className="back-to-services">
            <Link to="/#servicesH1">
              <IoIosArrowBack aria-hidden="true" />
              <p>BACK</p>
            </Link>
          </div>

          <h1>Painting Services</h1>
        </div>
      </div>

      <div className="services-types-titles">
        <div className="services-types-heading">
          <h2>Different spaces have different needs. <br/>
            We provide the right painting solution for each one.</h2>
        </div>

        <div className="services-types-button">
          <p>Ready for a fresh coat?</p>
          <a href="#service-contact">Contact Us</a>
        </div>
      </div>

      <div className="services-types-grid">
        <section className="service-type">
          <h2>Interior Painting</h2>
          <p>Refresh and transform your interior spaces with quality finishes and careful attention to detail.</p>
          <img src={interiorImg} alt="Interior painting" loading="lazy" decoding="async"/>
        </section>

        <section className="service-type">
          <h2>Exterior Painting</h2>
          <p>Protect and improve the outside of your property with durable finishes made to look good and last.</p>
          <img src={exteriorImg} alt="Exterior painting" loading="lazy" decoding="async"/>
        </section>

        <section className="service-type">
          <h2>Office & Retail Painting</h2>
          <p>Create professional, welcoming spaces with painting solutions suited to offices, shops and other commercial environments.</p>
          <img src={retailImg} alt="Office and retail painting" loading="lazy" decoding="async"/>
        </section>

        <section className="service-type">
          <h2>Industrial Painting</h2>
          <p>Practical, durable painting for industrial environments where preparation, performance and lasting results matter.</p>
          <img src={industrialImg} alt="Industrial painting" loading="lazy" decoding="async"/>
        </section>
      </div>
      </main>
      <Partners />
      <div id="service-contact"><ContactUs /></div>
      <Footer />
      
    </div>
  )
}

export default ServicesTypes
