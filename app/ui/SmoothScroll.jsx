'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  const pathname = usePathname();

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12, // frame-rate-independent interpolation; higher = snappier/more native
      smoothWheel: true,
      syncTouch: false, // native touch scrolling
      wheelMultiplier: 1,
      infinite: false,
    });

    // Expose Lenis instance globally for other components
    window.lenis = lenis;

    // Use requestAnimationFrame to continuously update the scroll
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Pause RAF loop when tab is hidden, resume when visible
    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(raf);
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      delete window.lenis;
      lenis.destroy();
    };
  }, []);

  // Reset scroll to top on route change
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
