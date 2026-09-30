import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function Letter({ children, index, count, progress }) {
  const opacity = useTransform(progress,
    [index / (count + 2), (index + 3) / (count + 2)], [0.22, 1]);
  return <motion.span className="about-story-letter" style={{ opacity }}>{children}</motion.span>;
}

// Each paragraph has its own scroll range so later text cannot finish offscreen.
export default function ScrollRevealText({ as: Element = 'p', text }) {
  const target = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start 0.85', 'end 0.45'],
  });
  const words = text.split(' ');
  const count = words.join('').length;

  return (
    <Element ref={target}>
      {reducedMotion ? text : (
        <>
          <span className="about-story-readable">{text}</span>
          <span aria-hidden="true">
            {words.map((word, wordIndex) => {
              const offset = words.slice(0, wordIndex).join('').length;
              return (
                <Fragment key={wordIndex}>
                  {wordIndex > 0 && ' '}
                  <span className="about-story-word">
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
