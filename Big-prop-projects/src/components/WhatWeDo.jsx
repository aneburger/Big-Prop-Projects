import { IoIosArrowForward, IoIosArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import '../styles/WhatWeDo.css';
import '../styles/ButtonEffects.css';

const contentReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (order) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: order * 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

function WhatWeDo() {
  const reducedMotion = useReducedMotion();
  const reveal = (order) => ({
    custom: order,
    variants: contentReveal,
    initial: reducedMotion ? false : 'hidden',
    // Observe each actual element, never the surrounding section padding.
    // The lower 48px are excluded so a reveal starts inside the visible area.
    whileInView: reducedMotion ? undefined : 'visible',
    animate: reducedMotion ? { opacity: 1, y: 0, transition: { duration: 0 } } : undefined,
    viewport: { once: true, amount: 0.35, margin: '0px 0px -48px 0px' },
  });

  return (
    <div className="what-we-do-div">
      <div className="what-we-do-content">
        <motion.div className="what-we-do" {...reveal(0)}>
          <IoIosArrowForward />
          <p>WHAT WE DO</p>
        </motion.div>
        <motion.h1 {...reveal(1)}>WE TAKE CARE OF WHAT MATTERS</motion.h1>
        <motion.h3 {...reveal(2)}>Professional property maintenance and renovation solutions for homeowners, businesses, and commercial properties.</motion.h3>
        <motion.div className="what-we-do-action" {...reveal(3)}>
          <Link to="/about" className="about-us-btn button-swap">
            <p>About Us</p>
            <IoIosArrowRoundForward />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default WhatWeDo;
