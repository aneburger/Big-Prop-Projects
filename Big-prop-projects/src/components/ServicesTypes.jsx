import '../styles/Services.css';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Partners from './Partners';
import SectionReveal from './SectionReveal';
import ScrollRevealText from './ScrollRevealText';
import { servicePages } from '../data/servicePages';

export default function ServicesTypes() {
  const { type } = useParams();
  const service = Object.hasOwn(servicePages, type) ? servicePages[type] : null;
  if (!service) return <NotFound />;

  return (
    <div className="service-types-page" key={type}>
      <main>
        <div className="service-types-body" style={{ backgroundImage: `linear-gradient(90deg, #02174555, #02174530), url("${service.hero}")` }}>
          <div className="service-types-content">
            <SectionReveal className="back-to-services" onEnter delay={0.2}>
              <Link to="/#servicesH1">
                <IoIosArrowBack aria-hidden="true" />
                <p>BACK</p>
              </Link>
            </SectionReveal>
            <SectionReveal as="h1" onEnter delay={0.65}>{service.title}</SectionReveal>
          </div>
        </div>

        <div className="services-types-titles">
          <div className="services-types-heading">
            <ScrollRevealText as="h2" text={service.introduction} />
          </div>
          <SectionReveal className="services-types-button" delay={0.3}>
            <p>{service.contactPrompt}</p>
            <Link to={`/services/${type}#contact-us`} state={{ smoothSection: true }} className="button-swap">Contact Us</Link>
          </SectionReveal>
        </div>

        <div className="services-types-grid" style={{ '--service-columns': service.types.length }}>
          {service.types.map((item, index) => (
            <SectionReveal as="section" key={item.title} className="service-type" delay={index * 0.2}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            </SectionReveal>
          ))}
        </div>
      </main>
      <Partners />
      <div id="contact-us"><ContactUs /></div>
      <Footer />
    </div>
  );
}
