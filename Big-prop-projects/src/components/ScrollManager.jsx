import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { startSmoothWheel } from '../utils/smoothWheel';

export default function ScrollManager() {
  const { key, pathname, search, hash, state } = useLocation();
  const previousPath = useRef(pathname);
  const smoothSection = Boolean(state?.smoothSection);

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    const changedPage = previousPath.current !== pathname;
    previousPath.current = pathname;
    let id = hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* Use malformed hashes literally. */ }
    const target = id ? document.getElementById(id) : null;
    const animate = smoothSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (!target || changedPage) top();
    if (target && !animate) target.scrollIntoView({ block: 'start', behavior: 'instant' });

    // Start after the new route commits. Drawer navigation is deferred until its lock is released.
    const frame = requestAnimationFrame(() => {
      if (target) target.scrollIntoView({ block: 'start', behavior: animate ? 'smooth' : 'instant' });
      else top();
    });
    const stopSmoothing = startSmoothWheel(window, document);
    return () => { cancelAnimationFrame(frame); stopSmoothing(); };
  }, [key, pathname, search, hash, smoothSection]);

  return null;
}
