import "../styles/LandingPage.css"
import { Link } from 'react-router-dom';
import '../styles/ButtonEffects.css';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function LandingPage() {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // The layer has 20% overscan above/below, so 14% travel cannot expose its edges.
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  return (
    <div>
        <div className="landing-body" ref={heroRef}>
            <motion.div className="landing-parallax-background" aria-hidden="true"
                style={{ y: reducedMotion ? 0 : backgroundY }} />
            <section className="landing-body-titles">
                <h2 className="landing-body-h1">Protect what you have.</h2>
                <h2 className="landing-body-h2">Build on what's possible.</h2>
                

                <div className="landing-body-text-div">
                    <h3 className="landing-body-h3">Big project or small fix, we're here to help.</h3>
                    {/* <p className="landing-body-p"> We keep your property at its best today and help you shape what it could become tomorrow. 
                            Whether we're maintaining or transforming your space, 
                            we believe in work that lasts and relationships that do too.</p> */}

                    <div className="landing-buttons-div">
                        <Link className="landing-quote-btn button-swap" to="/#contact-us" state={{ smoothSection: true }}>Get a Quote</Link>
                        <Link className="landing-services-btn button-swap" to="/#servicesH1" state={{ smoothSection: true }}>Services</Link>
                    </div>
                </div>

            </section>
        </div>
           
    </div>
  )
}

export default LandingPage
