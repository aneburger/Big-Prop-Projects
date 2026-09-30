import '../styles/LandingPage.css';
import '../styles/ButtonEffects.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const heroReveal = {
  hidden: { opacity: 0, y: 22 },
  visible: (order) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: 0.25 + order * 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

function LandingPage() {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  // Overscan keeps the image edges outside the hero during parallax travel.
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const reveal = (order) => ({
    className: 'landing-reveal',
    custom: order,
    variants: heroReveal,
    initial: reducedMotion ? false : 'hidden',
    animate: reducedMotion ? { opacity: 1, y: 0, transition: { duration: 0 } } : 'visible',
  });

  return (
    <div>
      <div className="landing-body" ref={heroRef}>
        <motion.div className="landing-parallax-background" aria-hidden="true"
          style={{ y: reducedMotion ? 0 : backgroundY }} />
        <section className="landing-body-titles">
          <motion.h2 {...reveal(0)} className="landing-body-h1 landing-reveal">Protect what you have.</motion.h2>
          <motion.h2 {...reveal(1)} className="landing-body-h2 landing-reveal">Build on what's possible.</motion.h2>
          <div className="landing-body-text-div">
            <motion.h3 {...reveal(2)} className="landing-body-h3 landing-reveal">Big project or small fix, we're here to help.</motion.h3>
            <motion.div {...reveal(3)} className="landing-buttons-div landing-reveal">
              <Link className="landing-quote-btn button-swap" to="/#contact-us" state={{ smoothSection: true }}>Get a Quote</Link>
              <Link className="landing-services-btn button-swap" to="/#servicesH1" state={{ smoothSection: true }}>Services</Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
