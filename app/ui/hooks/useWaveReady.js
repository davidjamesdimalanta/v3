'use client';

import { useEffect, useState } from 'react';
import { ANIMATION_CONFIG } from '../lib/animation-config';
import { animationStateManager } from '../lib/animationStateManager';

/**
 * Simplified hook that signals when the wave animation is complete.
 * Returns { isReady, prefersReducedMotion } for use with AnimatedGroup.
 *
 * Unlike useWaveCompleteAnimation, this hook doesn't manage CSS classes —
 * AnimatedGroup handles its own entrance variants.
 */
export function useWaveReady({ playOnlyOnInitialLoad = false } = {}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check if wave was already complete when this component mounted
  const [wasInitiallyComplete] = useState(() =>
    playOnlyOnInitialLoad && animationStateManager.hasAnimationCompleted('wave')
  );

  const [isReady, setIsReady] = useState(wasInitiallyComplete);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (wasInitiallyComplete || isReady) return;

    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    const handleWaveComplete = () => {
      setIsReady(true);
      if (playOnlyOnInitialLoad) {
        animationStateManager.setInitialLoadComplete();
      }
    };

    window.addEventListener('wave-animation-complete', handleWaveComplete);

    // Fallback timeout
    const fallbackTimeout = setTimeout(() => {
      setIsReady(true);
      if (playOnlyOnInitialLoad) {
        animationStateManager.setInitialLoadComplete();
      }
    }, ANIMATION_CONFIG.webgl.totalDuration + 100);

    return () => {
      window.removeEventListener('wave-animation-complete', handleWaveComplete);
      clearTimeout(fallbackTimeout);
    };
  }, [prefersReducedMotion, playOnlyOnInitialLoad, wasInitiallyComplete, isReady]);

  return { isReady, prefersReducedMotion };
}
