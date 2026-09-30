import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom"
import "../styles/WhatWeDo.css"
import '../styles/ButtonEffects.css';
import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

function WhatWeDo() {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, amount: .15 });
  const reducedMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const visible = inView || reducedMotion || focused;
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : .8, ease: 'easeOut' } },
  };
  const group = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : .15 } },
  };
  return (
    <div className="what-we-do-div">
        <motion.div className="what-we-do-content" ref={contentRef}
            initial={reducedMotion ? false : 'hidden'} animate={visible ? 'visible' : 'hidden'}
            variants={group} onFocusCapture={() => setFocused(true)}>
            <motion.div className="what-we-do" variants={item}>
                <IoIosArrowForward />
                <p>WHAT WE DO</p>
            </motion.div>
            
            <motion.h1 variants={item}>WE TAKE CARE OF WHAT MATTERS</motion.h1>

            <motion.h3 variants={item}>Professional property maintenance and renovation solutions for homeowners, businesses, and commercial properties.</motion.h3>

            <motion.div className="what-we-do-action" variants={item}>
              <Link to="/about" className="about-us-btn button-swap">
                    <p>About Us</p>
                    <IoIosArrowRoundForward />
              </Link>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default WhatWeDo
