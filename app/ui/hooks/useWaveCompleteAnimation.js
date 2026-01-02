'use client';

import { useEffect, useState, useCallback } from 'react';
import { ANIMATION_CONFIG, getElementDelay, getElementDuration } from '../lib/animation-config';

/**
 * Custom hook to manage fade-up animations triggered after WebGL wave completion
 *
 * Listens for the 'wave-animation-complete' event from the WebGL renderer
 * and provides animation timing coordination for landing page elements.
 *
 * @returns {Object} - Animation state and helper functions
 *   - isReady: boolean - Whether WebGL animation has completed
 *   - getAnimationClass: function - Returns CSS classes for element animation
 *   - getAnimationStyle: function - Returns inline styles for element animation
 *   - shouldAnimate: boolean - Whether to apply animations (respects prefers-reduced-motion)
 */
export function useWaveCompleteAnimation() {
  const [isReady, setIsReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setShouldAnimate(!mediaQuery.matches);

      // Listen for changes to motion preference
      const handleChange = (e) => setShouldAnimate(!e.matches);
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    if (!shouldAnimate) {
      // Skip animations if reduced motion is preferred
      setIsReady(true);
      return;
    }

    const handleWaveComplete = () => {
      setIsReady(true);
    };

    // Listen for custom event from WebGL renderer
    window.addEventListener('wave-animation-complete', handleWaveComplete);

    // Fallback timeout in case event doesn't fire
    // Add 100ms buffer to total WebGL duration
    const fallbackTimeout = setTimeout(() => {
      setIsReady(true);
    }, ANIMATION_CONFIG.webgl.totalDuration + 100);

    // Cleanup
    return () => {
      window.removeEventListener('wave-animation-complete', handleWaveComplete);
      clearTimeout(fallbackTimeout);
    };
  }, [shouldAnimate]);

  /**
   * Get animation CSS classes for an element
   * @param {string} elementId - Element identifier from animation-config.js
   * @returns {string} - CSS class names
   */
  const getAnimationClass = useCallback((elementId) => {
    if (!shouldAnimate) {
      return 'fade-up-visible'; // Show immediately if animations disabled
    }

    return isReady ? 'fade-up-visible' : 'fade-up-hidden';
  }, [isReady, shouldAnimate]);

  /**
   * Get inline styles for an element (delay + duration)
   * @param {string} elementId - Element identifier from animation-config.js
   * @returns {Object} - React style object
   */
  const getAnimationStyle = useCallback((elementId) => {
    if (!shouldAnimate) {
      return { opacity: 1, transform: 'translateY(0)' };
    }

    const delay = getElementDelay(elementId) - ANIMATION_CONFIG.landing.startDelay;
    const duration = getElementDuration(elementId);

    return {
      transitionDelay: `${delay}ms`,
      transitionDuration: `${duration}ms`,
    };
  }, [shouldAnimate]);

  return {
    isReady,
    shouldAnimate,
    getAnimationClass,
    getAnimationStyle,
  };
}
