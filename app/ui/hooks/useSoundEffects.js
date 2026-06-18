'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { audioManager } from '../lib/audioManager';

/**
 * Custom hook to manage interactive sound effects
 * Delegates to global audioManager singleton for consistent audio across navigation
 *
 * Features:
 * - Shared audio pool across all components (singleton pattern)
 * - Permission checking via localStorage
 * - Prefers-reduced-motion support
 * - Prevents audio overlap on rapid hover transitions
 * - No cleanup on unmount (audio persists for app lifetime)
 *
 * @returns {Object} - { playHover, playNavigateHome, playNavigateProject }
 */
export function useSoundEffects() {
  useEffect(() => {
    // Initialize audio manager on first mount
    // Safe to call multiple times - only initializes once
    audioManager.initialize();
  }, []);

  const playHover = useCallback(() => audioManager.playHover(), []);
  const playButtonHover = useCallback(() => audioManager.playButtonHover(), []);
  const playNavigateHome = useCallback(() => audioManager.playNavigateHome(), []);
  const playNavigateProject = useCallback(() => audioManager.playNavigateProject(), []);
  const primeAudio = useCallback(() => audioManager.prime(), []);

  // Delegate all audio playback to the singleton manager
  return useMemo(() => ({
    playHover,
    playButtonHover,
    playNavigateHome,
    playNavigateProject,
    primeAudio,
  }), [
    playHover,
    playButtonHover,
    playNavigateHome,
    playNavigateProject,
    primeAudio,
  ]);
}
