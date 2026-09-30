import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../styles/SectionReveal.css';

const elements = { div: motion.div, h1: motion.h1, h2: motion.h2, p: motion.p };

// Uses the existing element rather than an extra wrapper, preserving grid areas.
export default function SectionReveal({
  as = 'div', delay = 0, margin = '0px 0px -48px 0px', amount = 0.2,
  className = '', onEnter = false, children, ...props
}) {
  const Element = elements[as];
  const reducedMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const immediate = reducedMotion || focused;
  const visible = { opacity: 1, y: 0 };

  return (
    <Element
      {...props}
      className={`section-reveal ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={immediate || onEnter ? visible : undefined}
      whileInView={immediate || onEnter ? undefined : visible}
      viewport={{ once: true, amount, margin }}
      transition={{ duration: immediate ? 0 : 1, delay: immediate ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setFocused(true)}
    >
      {children}
    </Element>
  );
}
