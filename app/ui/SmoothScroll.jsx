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
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 5), // easeOutQuint
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose Lenis instance globally for other components
    window.lenis = lenis;

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Optional: Log scroll events for debugging
    lenis.on('scroll', (e) => {
      // console.log(e);
    });

    // Cleanup on unmount
    return () => {
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
