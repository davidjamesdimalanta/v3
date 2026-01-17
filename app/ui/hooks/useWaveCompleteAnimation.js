'use client';

import { useEffect, useState, useCallback } from 'react';
import { ANIMATION_CONFIG, getElementDelay, getElementDuration } from '../lib/animation-config';
import { animationStateManager } from '../lib/animationStateManager';

/**
 * Custom hook to manage fade-up animations triggered after WebGL wave completion
 *
 * Listens for the 'wave-animation-complete' event from the WebGL renderer
 * and provides animation timing coordination for landing page elements.
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.playOnlyOnInitialLoad - If true, animation only plays on first page load (default: false)
 * @returns {Object} - Animation state and helper functions
 *   - isReady: boolean - Whether WebGL animation has completed
 *   - getAnimationClass: function - Returns CSS classes for element animation
 *   - getAnimationStyle: function - Returns inline styles for element animation
 *   - shouldAnimate: boolean - Whether to apply animations (respects prefers-reduced-motion)
 */
export function useWaveCompleteAnimation({ playOnlyOnInitialLoad = false } = {}) {
  const [isReady, setIsReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Capture wave completion status at mount time to prevent race conditions
  const [wasInitiallyComplete] = useState(() =>
    playOnlyOnInitialLoad && animationStateManager.hasAnimationCompleted('wave')
  );

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
    // If wave animation was already complete when component mounted,
    // skip animation and show immediately
    if (wasInitiallyComplete) {
      setIsReady(true);
      return;
    }

    if (!shouldAnimate) {
      // Skip animations if reduced motion is preferred
      setIsReady(true);
      return;
    }

    const handleWaveComplete = () => {
      setIsReady(true);

      // Mark initial load as complete when wave finishes
      if (playOnlyOnInitialLoad) {
        animationStateManager.setInitialLoadComplete();
      }
    };

    // Listen for custom event from WebGL renderer
    window.addEventListener('wave-animation-complete', handleWaveComplete);

    // Fallback timeout in case event doesn't fire
    // Add 100ms buffer to total WebGL duration
    const fallbackTimeout = setTimeout(() => {
      setIsReady(true);

      if (playOnlyOnInitialLoad) {
        animationStateManager.setInitialLoadComplete();
      }
    }, ANIMATION_CONFIG.webgl.totalDuration + 100);

    // Cleanup
    return () => {
      window.removeEventListener('wave-animation-complete', handleWaveComplete);
      clearTimeout(fallbackTimeout);
    };
  }, [shouldAnimate, playOnlyOnInitialLoad]);

  /**
   * Get animation CSS classes for an element
   * @param {string} elementId - Element identifier from animation-config.js
   * @returns {string} - CSS class names
   */
  const getAnimationClass = useCallback((elementId) => {
    if (!shouldAnimate) {
      return 'fade-up-visible'; // Show immediately if animations disabled
    }

    // If animation was complete when component mounted, show immediately
    if (wasInitiallyComplete) {
      return 'fade-up-visible';
    }

    return isReady ? 'fade-up-visible' : 'fade-up-hidden';
  }, [isReady, shouldAnimate, wasInitiallyComplete]);

  /**
   * Get inline styles for an element (delay + duration)
   * @param {string} elementId - Element identifier from animation-config.js
   * @returns {Object} - React style object
   */
  const getAnimationStyle = useCallback((elementId) => {
    if (!shouldAnimate) {
      return { opacity: 1, transform: 'translateY(0)' };
    }

    // If animation was complete when component mounted, show immediately
    if (wasInitiallyComplete) {
      return { opacity: 1, transform: 'translateY(0)' };
    }

    const delay = getElementDelay(elementId) - ANIMATION_CONFIG.landing.startDelay;
    const duration = getElementDuration(elementId);

    return {
      transitionDelay: `${delay}ms`,
      transitionDuration: `${duration}ms`,
    };
  }, [shouldAnimate, wasInitiallyComplete]);

  return {
    isReady,
    shouldAnimate,
    getAnimationClass,
    getAnimationStyle,
  };
}
