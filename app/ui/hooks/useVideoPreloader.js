'use client';

import { useEffect } from 'react';

// Module-level map: url → detached <video> element (shared across instances)
const preloadedVideos = new Map();

/**
 * Preloads video URLs after the browser goes idle.
 * Uses requestIdleCallback (with setTimeout fallback for Safari).
 * The preloaded <video> elements live in the module-level map so
 * subsequent renders / multiple component instances share the same cache.
 */
export function useVideoPreloader(urls) {
  useEffect(() => {
    const validUrls = urls.filter(Boolean);
    if (validUrls.length === 0) return;

    const preload = () => {
      validUrls.forEach((url) => {
        if (preloadedVideos.has(url)) return;
        const video = document.createElement('video');
        video.muted = true;
        video.preload = 'auto';
        video.src = url;
        video.load();
        preloadedVideos.set(url, video);
      });
    };

    let id;
    if (typeof requestIdleCallback !== 'undefined') {
      id = requestIdleCallback(preload, { timeout: 3000 });
    } else {
      id = setTimeout(preload, 200);
    }

    return () => {
      if (typeof requestIdleCallback !== 'undefined') {
        cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
