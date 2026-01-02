'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Generalized hook for scroll-based opacity fade effects
 *
 * Provides smooth opacity transitions based on scroll position with
 * configurable fade range and opacity values.
 *
 * @param {Object} config - Fade configuration
 * @param {number} config.fadeStart - Scroll position (px) where fade begins (default: 0)
 * @param {number} config.fadeEnd - Scroll position (px) where fade completes (default: 100)
 * @param {number} config.minOpacity - Final opacity value (default: 0)
 * @param {number} config.maxOpacity - Starting opacity value (default: 1)
 * @param {Function} config.onPageChange - Optional callback (pathname) => opacity | null for page-specific overrides
 * @returns {Object} - Scroll fade state
 *   - opacity: number (0-1) - Current opacity based on scroll position
 *   - shouldAnimate: boolean - Whether animations are enabled
 */
export function useScrollFade({
  fadeStart = 0,
  fadeEnd = 100,
  minOpacity = 0,
  maxOpacity = 1,
  onPageChange = null
} = {}) {
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(maxOpacity);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setShouldAnimate(!mediaQuery.matches);

      const handleChange = (e) => setShouldAnimate(!e.matches);
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Handle scroll events and page-based opacity
  useEffect(() => {
    // Check for page-specific opacity override
    if (onPageChange && pathname) {
      const pageOpacity = onPageChange(pathname);
      if (pageOpacity !== null && pageOpacity !== undefined) {
        setOpacity(pageOpacity);
        return;
      }
    }

    if (!shouldAnimate) {
      setOpacity(maxOpacity); // Always at max opacity if reduced motion
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY <= fadeStart) {
        // Before fade starts: max opacity
        setOpacity(maxOpacity);
      } else if (scrollY >= fadeEnd) {
        // After fade ends: min opacity
        setOpacity(minOpacity);
      } else {
        // During fade: calculate proportional opacity using linear interpolation
        // scrollY ranges from fadeStart to fadeEnd
        // opacity ranges from maxOpacity to minOpacity
        const fadeRange = fadeEnd - fadeStart;
        const scrollProgress = scrollY - fadeStart;
        const opacityValue = maxOpacity - (scrollProgress / fadeRange) * (maxOpacity - minOpacity);
        setOpacity(opacityValue);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldAnimate, pathname, fadeStart, fadeEnd, minOpacity, maxOpacity, onPageChange]);

  return { opacity, shouldAnimate };
}
