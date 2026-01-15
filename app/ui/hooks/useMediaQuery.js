'use client';

import { useEffect, useState } from 'react';

/**
 * Hook for responsive media queries and accessibility preferences
 *
 * Provides dynamic boolean state based on CSS media queries.
 * Commonly used for viewport size detection and accessibility preferences.
 *
 * @param {string} query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Update on change
    const handleChange = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
