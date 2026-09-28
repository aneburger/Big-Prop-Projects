import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { startSmoothWheel } from '../utils/smoothWheel';

function ScrollManager() {
  const { key, pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    function resetPosition() {
      let targetId = hash.slice(1);
      try { targetId = decodeURIComponent(targetId); } catch { /* Keep malformed hashes literal. */ }
      const anchor = targetId ? document.getElementById(targetId) : null;
      if (anchor) {
        anchor.scrollIntoView({ block: 'start', behavior: 'instant' });
      } else {
        // Must be instant: don't animate from the old page's footer to the new page's top.
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }

    resetPosition();
    // Reapply after navigation-triggered effects (including drawer scroll-lock cleanup).
    const resetFrame = window.requestAnimationFrame(resetPosition);
    const stopSmoothing = startSmoothWheel(window, document);

    return () => {
      window.cancelAnimationFrame(resetFrame);
      stopSmoothing();
    };
  }, [key, pathname, search, hash]);

  return null;
}

export default ScrollManager;
