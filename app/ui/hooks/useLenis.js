'use client';

import { useEffect, useState } from 'react';

export function useLenis() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lenis) {
      setLenis(window.lenis);
    }
  }, []);

  return lenis;
}
