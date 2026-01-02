'use client';

import { useScrollFade } from './useScrollFade';

/**
 * Custom hook to manage navbar opacity based on scroll position
 *
 * Gradually fades the navbar as the user scrolls down the page.
 * Uses the generalized useScrollFade hook with navbar-specific configuration.
 * Inspired by bengiannis.com navbar behavior.
 *
 * @returns {Object} - Scroll fade state
 *   - navbarOpacity: number (0-1) - Current navbar opacity based on scroll position
 */
export function useNavbarScrollFade() {
  const { opacity } = useScrollFade({
    fadeStart: 0,
    fadeEnd: 100,
    minOpacity: 0,
    maxOpacity: 1,
    onPageChange: (pathname) => {
      // Hide navbar completely on project pages
      return pathname?.startsWith('/project') ? 0 : null;
    }
  });

  return { navbarOpacity: opacity };
}
