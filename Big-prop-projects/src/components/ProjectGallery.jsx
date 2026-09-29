import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { HiPause, HiPlay } from 'react-icons/hi2';
import { AnimatePresence, motion } from 'framer-motion';
import { createGalleryClock } from '../utils/galleryClock';

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(callback) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
function subscribeVisibility(callback) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}
const getMotion = () => window.matchMedia(motionQuery).matches;
const getVisible = () => !document.hidden;
const serverMotion = () => true;
const serverVisible = () => false;
const imageMotion = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%' }),
  visible: { x: '0%' },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%' }),
};

// Keep the images array stable in the parent. Duration is in milliseconds.
function ProjectGallery({ images, duration = 5000, label = 'Project photographs' }) {
  const [{ index: active, direction }, setSlide] = useState({ index: 0, direction: 1 });
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState({});
  const progressRef = useRef(null);
  const thumbnailRefs = useRef([]);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, serverMotion);
  const visible = useSyncExternalStore(subscribeVisibility, getVisible, serverVisible);
  const clock = useMemo(() => createGalleryClock(images.length, duration), [images.length, duration]);
  const playing = !paused && !reducedMotion && images.length > 1;
  const ready = Boolean(loaded[images[active].src]);

  useEffect(() => {
    // Warm the browser cache so the next frame is available before its transition.
    images.forEach(({ src }) => { const image = new Image(); image.src = src; });
  }, [images]);

  useEffect(() => {
    if (!playing || !visible || !ready) return undefined;
    let frame;
    let previous;
    function animate(time) {
      const delta = previous === undefined ? 0 : time - previous;
      previous = time;
      const next = clock.tick(delta);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${next.progress})`;
      if (next.index !== active) {
        setSlide({ index: next.index, direction: 1 });
        return; // The next effect waits for the newly active image to be ready.
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, clock, playing, visible, ready]);

  function select(index) {
    const next = clock.select(index);
    setSlide({ index: next, direction: next >= active ? 1 : -1 });
    if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
  }

  function navigateThumbnails(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % images.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + images.length) % images.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = images.length - 1;
    else return;
    event.preventDefault();
    select(next);
    thumbnailRefs.current[next]?.focus();
  }

  return (
    <section className="project-gallery" aria-label={label} aria-roledescription="carousel">
      <div className="project-gallery-stage">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img key={images[active].id} className="project-gallery-image"
            src={images[active].src} alt="" aria-hidden="true" decoding="async"
            custom={direction} variants={imageMotion} initial="enter" animate="visible" exit="exit"
            transition={{ duration: reducedMotion ? 0 : .65, ease: [.22, .61, .36, 1] }}
            onLoad={() => {
              const src = images[active].src;
              setLoaded((current) => current[src] ? current : { ...current, [src]: true });
            }} />
        </AnimatePresence>
        <div className="project-gallery-controls">
          {/* <span className="project-gallery-counter" aria-hidden="true">{active + 1} / {images.length}</span> */}
          {!reducedMotion && images.length > 1 && (
            <button type="button" className="project-gallery-toggle"
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              onClick={() => setPaused((current) => !current)}>
              {paused ? <HiPlay aria-hidden="true" /> : <HiPause aria-hidden="true" />}
            </button>
          )}
        </div>
        <div className="project-gallery-progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </div>
      <div className="project-gallery-thumbnails" role="group" aria-label="Choose a project photograph">
        {images.map((image, index) => (
          <button key={image.id} type="button" className="project-gallery-thumbnail"
            ref={(node) => { thumbnailRefs.current[index] = node; }}
            aria-label={`Show photograph ${index + 1} of ${images.length}`}
            aria-current={active === index ? 'true' : undefined}
            onClick={() => select(index)} onKeyDown={(event) => navigateThumbnails(event, index)}>
            <img src={image.src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      <p className="project-gallery-status" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        Photograph {active + 1} of {images.length}: {images[active].alt}
      </p>
    </section>
  );
}

export default ProjectGallery;
