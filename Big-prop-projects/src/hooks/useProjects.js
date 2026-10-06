import { useEffect, useState } from 'react';
import { fetchProjects } from '../sanity/projects';

export default function useProjects(kind = 'all', slug = '') {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  const key = JSON.stringify([kind, slug, attempt]);

  useEffect(() => {
    const controller = new AbortController();
    fetchProjects(kind, slug, controller.signal).then(
      data => {
        if (!controller.signal.aborted) setResult({ key, data, error: false });
      },
      () => {
        if (!controller.signal.aborted) setResult({ key, data: null, error: true });
      },
    );
    return () => controller.abort();
  }, [kind, slug, key]);

  // Never show the previous project's data while a new URL is loading.
  const current = result?.key === key ? result : null;
  return {
    data: current?.data,
    loading: !current,
    error: current?.error || false,
    retry: () => setAttempt(value => value + 1),
  };
}
