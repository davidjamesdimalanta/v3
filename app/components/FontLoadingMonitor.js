'use client';

import { useEffect } from 'react';

export default function FontLoadingMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        console.log('✓ Fonts loaded:', document.fonts.size);

        // Measure font load time
        if (window.performance) {
          const fontResources = performance.getEntriesByType('resource')
            .filter(entry => entry.name.includes('font'));

          fontResources.forEach(font => {
            console.log(`Font: ${font.name.split('/').pop()} - ${Math.round(font.duration)}ms`);
          });
        }
      });
    }
  }, []);

  return null;
}
