import "../styles/Services.css"
import { Link } from "react-router-dom"
import { IoIosArrowRoundForward } from "react-icons/io";
import '../styles/ButtonEffects.css';
import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const titleLead = 'The right workmanship and the right people';
const titleRest = 'to maintain, protect and transform your property.';
const letterCount = (titleLead + titleRest).replace(/\s/g, '').length;

function RevealLetter({ letter, index, progress }) {
  // Adjacent letters overlap slightly to avoid a harsh on/off appearance.
  const start = index / (letterCount + 2);
  const end = (index + 3) / (letterCount + 2);
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  return <motion.span className="services-reveal-letter" style={{ opacity }}>{letter}</motion.span>;
}

function RevealWords({ text, startIndex = 0, progress }) {
  const words = text.split(' ');
  return words.map((word, wordIndex) => {
    const offset = startIndex + words.slice(0, wordIndex).join('').length;
    return (
      <Fragment key={wordIndex}>
        {wordIndex > 0 && ' '}
        <span className="services-reveal-word">
          {Array.from(word).map((letter, index) => (
            <RevealLetter key={index} letter={letter} index={offset + index} progress={progress} />
          ))}
        </span>
      </Fragment>
    );
  });
}

function ServicesTitle() {
  const titleRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: titleRef,
    // Begin when the title enters the lower viewport; finish while still visible.
    offset: ['start 0.85', 'end 0.45'],
  });
  return (
    <h1 className="services-title" ref={titleRef} aria-label={`${titleLead} ${titleRest}`}>
      <span aria-hidden="true">
        <span className="blue-title">
          {reducedMotion ? titleLead : <RevealWords text={titleLead} progress={scrollYProgress} />}
        </span>
        <br />
        {reducedMotion ? titleRest : (
          <RevealWords text={titleRest} startIndex={titleLead.replace(/\s/g, '').length} progress={scrollYProgress} />
        )}
      </span>
    </h1>
  );
}

function Services() {
  return (
    <div className="services-div" id="servicesH1">
      <div className="services-content">
        <div className="services-left-section">
          <ServicesTitle />

          <div className="services-buttons">
            <Link className="services-contact-btn button-swap" to="/#contact-us" state={{ smoothSection: true }}>
              Contact Us
            </Link>
            <a href="tel:+27810450505" className="services-nr-btn button-swap">+27 81 045 0505</a>
          </div>
        </div>

        <div className="services-right-section">
          <Link to="/service" className="service-section-link">
            <section className="paint-section">
              <h3>PAINTING SERVICES <IoIosArrowRoundForward /></h3>
              <p>Comprehensive painting services to enhance your property.</p>
            </section>
          </Link>
          <Link to="/service" className="service-section-link">
            <section className="waterproof-section">
              <h3>WATERPROOFING SERVICES <IoIosArrowRoundForward /></h3>
              <p>Comprehensive waterproofing services to protect your property.</p>
            </section>
          </Link>
          <Link to="/service" className="service-section-link">
            <section className="roof-section">
              <h3>ROOF INSTALLATION AND MAINTENANCE <IoIosArrowRoundForward /></h3>
              <p>Expert roofing solutions including repairs, maintenance, and complete roof installations.</p>
            </section>
          </Link>
          <Link to="/service" className="service-section-link">
            <section className="reno-section">
              <h3>RESIDENTIAL & COMMERCIAL RENOVATIONS <IoIosArrowRoundForward /></h3>
              <p>Transform existing spaces with expert renovation and alteration services tailored to your vision.</p>
            </section>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Services
