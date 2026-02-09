'use client';

import { useEffect, useState } from 'react';

export function useLenis() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Check immediately on mount
    if (typeof window !== 'undefined' && window.lenis) {
      setLenis(window.lenis);
      return;
    }

    // Poll for window.lenis every 100ms until found
    // This handles the race condition where SmoothScroll component
    // may initialize Lenis after this component mounts
    const checkInterval = setInterval(() => {
      if (typeof window !== 'undefined' && window.lenis) {
        setLenis(window.lenis);
        clearInterval(checkInterval);
      }
    }, 100);

    // Cleanup: stop polling after 5 seconds or when component unmounts
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 5000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  return lenis;
}
