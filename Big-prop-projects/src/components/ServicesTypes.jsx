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
import SectionReveal from './SectionReveal';
import ScrollRevealText from './ScrollRevealText';

function ServicesTypes() {
  return (
    <div className="service-types-page">
      <main>
      <div className="service-types-body">
        <div className="service-types-content">
          <SectionReveal className="back-to-services" onEnter delay={0.2}>
            <Link to="/#servicesH1">
              <IoIosArrowBack aria-hidden="true" />
              <p>BACK</p>
            </Link>
          </SectionReveal>

          <SectionReveal as="h1" onEnter delay={0.65}>Painting Services</SectionReveal>
        </div>
      </div>

      <div className="services-types-titles">
        <div className="services-types-heading">
          <ScrollRevealText as="h2" text={'Different spaces have different needs.\nWe provide the right painting solution for each one.'} />
        </div>

        <SectionReveal className="services-types-button" delay={0.3}>
          <p>Ready for a fresh coat?</p>
          <a href="#contact-us" state={{ smoothSection: true }} className="button-swap">Contact Us</a>
        </SectionReveal>
      </div>

      <div className="services-types-grid">
        <SectionReveal as="section" className="service-type">
          <h2>Interior Painting</h2>
          <p>Refresh and transform your interior spaces with quality finishes and careful attention to detail.</p>
          <img src={interiorImg} alt="Interior painting" loading="lazy" decoding="async"/>
        </SectionReveal>

        <SectionReveal as="section" className="service-type" delay={0.2}>
          <h2>Exterior Painting</h2>
          <p>Protect and improve the outside of your property with durable finishes made to look good and last.</p>
          <img src={exteriorImg} alt="Exterior painting" loading="lazy" decoding="async"/>
        </SectionReveal>

        <SectionReveal as="section" className="service-type" delay={0.4}>
          <h2>Office & Retail Painting</h2>
          <p>Create professional, welcoming spaces with painting solutions suited to offices, shops and other commercial environments.</p>
          <img src={retailImg} alt="Office and retail painting" loading="lazy" decoding="async"/>
        </SectionReveal>

        <SectionReveal as="section" className="service-type" delay={0.6}>
          <h2>Industrial Painting</h2>
          <p>Practical, durable painting for industrial environments where preparation, performance and lasting results matter.</p>
          <img src={industrialImg} alt="Industrial painting" loading="lazy" decoding="async"/>
        </SectionReveal>
      </div>
      </main>
      <Partners />
      <div id="contact-us"><ContactUs /></div>
      <Footer />
      
    </div>
  )
}

export default ServicesTypes
