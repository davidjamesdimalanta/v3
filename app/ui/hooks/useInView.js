'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver hook for scroll-triggered animations.
 * Returns { ref, isInView } and respects prefers-reduced-motion.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (default: 0.1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @param {boolean} options.once - If true, stays in view after first intersection (default: true)
 */
export function useInView({ threshold = 0.1, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If user prefers reduced motion, show content immediately
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
