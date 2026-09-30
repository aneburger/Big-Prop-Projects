import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import '../styles/ScrollRevealText.css';

function Letter({ children, index, count, progress }) {
  const opacity = useTransform(progress,
    [index / (count + 2), (index + 3) / (count + 2)], [0.22, 1]);
  return <motion.span className="scroll-reveal-letter" style={{ opacity }}>{children}</motion.span>;
}

// Each paragraph has its own scroll range so later text cannot finish offscreen.
export default function ScrollRevealText({ as: Element = 'p', text }) {
  const target = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start 0.85', 'end 0.45'],
  });
  const words = text.split(/(\s+)/);
  const count = text.replace(/\s/g, '').length;

  return (
    <Element ref={target} className="scroll-reveal-text">
      {reducedMotion ? text : (
        <>
          <span className="scroll-reveal-readable">{text.replace(/\s+/g, ' ')}</span>
          <span aria-hidden="true">
            {words.map((word, wordIndex) => {
              if (/^\s+$/.test(word)) {
                return word.includes('\n') ? <br key={wordIndex} /> : word;
              }
              const offset = words.slice(0, wordIndex).join('').replace(/\s/g, '').length;
              return (
                <Fragment key={wordIndex}>
                  <span className="scroll-reveal-word">
                    {Array.from(word).map((letter, index) => (
                      <Letter key={index} index={offset + index} count={count} progress={scrollYProgress}>{letter}</Letter>
                    ))}
                  </span>
                </Fragment>
              );
            })}
          </span>
        </>
      )}
    </Element>
  );
}
