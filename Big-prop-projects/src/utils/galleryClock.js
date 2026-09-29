// One clock drives both slide changes and the progress bar, so they cannot drift.
export function createGalleryClock(count, duration) {
  if (!Number.isInteger(count) || count < 1 || !Number.isFinite(duration) || duration <= 0) {
    throw new Error('The gallery needs at least one image and a positive duration.');
  }
  let index = 0;
  let elapsed = 0;
  return {
    select(next) {
      index = ((next % count) + count) % count;
      elapsed = 0;
      return index;
    },
    tick(delta) {
      elapsed += Math.max(0, delta);
      const steps = Math.floor(elapsed / duration);
      if (steps) { index = (index + steps) % count; elapsed %= duration; }
      return { index, progress: elapsed / duration };
    },
  };
}
