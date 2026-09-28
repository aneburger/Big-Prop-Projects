export function startSmoothWheel(win, doc) {
  const reducedMotion = win.matchMedia('(prefers-reduced-motion: reduce)');
  const root = doc.documentElement;
  let frame = null;
  let target = win.scrollY;
  let expectedPosition = win.scrollY;
  let lastTime = 0;

  const maximum = () => Math.max(0, (doc.scrollingElement || root).scrollHeight - win.innerHeight);
  const clamp = (value) => Math.min(maximum(), Math.max(0, value));

  function cancel() {
    if (frame !== null) win.cancelAnimationFrame(frame);
    frame = null;
    lastTime = 0;
    target = win.scrollY;
    expectedPosition = win.scrollY;
  }

  function nativeRegion(event) {
    if (['hidden', 'clip'].includes(win.getComputedStyle(root).overflowY)
      || ['hidden', 'clip'].includes(win.getComputedStyle(doc.body).overflowY)
      || win.getComputedStyle(doc.body).position === 'fixed') return true;

    // composedPath also works when a control is inside a shadow root.
    for (const node of event.composedPath()) {
      if (node === doc.body || node === root) break;
      if (!node || node.nodeType !== 1) continue;
      if (node.matches('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="listbox"], [role="menu"], [role="dialog"], [data-native-scroll]')) return true;
      const style = win.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(style.overflowY)
        && node.scrollHeight > node.clientHeight + 1) return true;
    }
    return false;
  }

  function step(time) {
    frame = null;
    // Yield to scrollbar drags, keyboard scrolling and external programmatic scrolls.
    if (Math.abs(win.scrollY - expectedPosition) > 2) { cancel(); return; }
    target = clamp(target);
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16.67;
    lastTime = time;
    const distance = target - win.scrollY;
    // Time-based easing behaves consistently at different monitor refresh rates.
    const next = Math.abs(distance) < 1 ? target
      : win.scrollY + distance * (1 - Math.exp(-elapsed / 95));
    win.scrollTo({ top: next, left: win.scrollX, behavior: 'instant' });
    expectedPosition = win.scrollY;
    if (Math.abs(target - expectedPosition) >= 1) frame = win.requestAnimationFrame(step);
    else cancel();
  }

  function wheel(event) {
    if (event.defaultPrevented || !event.cancelable || reducedMotion.matches
      || event.ctrlKey || event.metaKey || event.shiftKey
      || Math.abs(event.deltaX) >= Math.abs(event.deltaY) || nativeRegion(event)) {
      cancel();
      return;
    }
    // Respect pixel-, line-, and page-based mouse wheel settings.
    const lineHeight = Number.parseFloat(win.getComputedStyle(root).lineHeight) || 16;
    const unit = event.deltaMode === 1 ? lineHeight : event.deltaMode === 2 ? win.innerHeight : 1;
    const delta = event.deltaY * unit;
    if (!Number.isFinite(delta) || delta === 0) return;
    if (frame === null || Math.abs(win.scrollY - expectedPosition) > 2) cancel();
    // Reverse promptly instead of fighting queued momentum in the opposite direction.
    if (Math.sign(delta) !== Math.sign(target - win.scrollY)) target = win.scrollY;
    const nextTarget = clamp(target + delta);
    if (nextTarget === win.scrollY && frame === null) return;
    event.preventDefault();
    target = nextTarget;
    if (frame === null) frame = win.requestAnimationFrame(step);
  }

  win.addEventListener('wheel', wheel, { passive: false });
  win.addEventListener('pointerdown', cancel, { passive: true });
  win.addEventListener('touchstart', cancel, { passive: true });
  win.addEventListener('keydown', cancel);
  win.addEventListener('resize', cancel);
  reducedMotion.addEventListener('change', cancel);

  return () => {
    cancel();
    win.removeEventListener('wheel', wheel);
    win.removeEventListener('pointerdown', cancel);
    win.removeEventListener('touchstart', cancel);
    win.removeEventListener('keydown', cancel);
    win.removeEventListener('resize', cancel);
    reducedMotion.removeEventListener('change', cancel);
  };
}
