'use client';

import { useEffect } from 'react';

export default function FontLoadingMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Track when fonts start loading
      const startTime = performance.now();

      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          const loadTime = Math.round(performance.now() - startTime);

          console.group('🔤 Font Loading Performance');
          console.log('✓ All fonts loaded:', document.fonts.size, 'fonts');
          console.log('⏱️  Total load time:', loadTime + 'ms');

          // Log individual font faces
          document.fonts.forEach((font) => {
            console.log(`  - ${font.family} ${font.weight} ${font.style}`);
          });

          // Measure font file downloads from Next.js
          if (window.performance) {
            const fontResources = performance.getEntriesByType('resource')
              .filter(entry =>
                entry.name.includes('_next/static/media') ||
                entry.name.includes('.woff2') ||
                entry.name.includes('.woff') ||
                entry.name.includes('/fonts/')
              );

            if (fontResources.length > 0) {
              console.log('\n📦 Font File Downloads:');
              fontResources.forEach(font => {
                const fileName = font.name.split('/').pop();
                const size = font.transferSize ? `${Math.round(font.transferSize / 1024)}KB` : 'cached';
                console.log(`  - ${fileName}: ${Math.round(font.duration)}ms (${size})`);
              });
            } else {
              console.log('\n📦 Font files: Optimized by Next.js (likely inlined or preloaded)');
            }

            // Overall timing
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            if (navigationTiming) {
              console.log('\n⚡ Page Performance:');
              console.log(`  - DOM Content Loaded: ${Math.round(navigationTiming.domContentLoadedEventEnd)}ms`);
              console.log(`  - Page Load Complete: ${Math.round(navigationTiming.loadEventEnd)}ms`);
            }
          }

          console.groupEnd();
        });
      }
    }
  }, []);

  return null;
}
