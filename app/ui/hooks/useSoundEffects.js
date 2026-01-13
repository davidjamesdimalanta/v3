'use client';

import { useEffect } from 'react';
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

  // Delegate all audio playback to the singleton manager
  return {
    playHover: () => audioManager.playHover(),
    playButtonHover: () => audioManager.playButtonHover(),
    playNavigateHome: () => audioManager.playNavigateHome(),
    playNavigateProject: () => audioManager.playNavigateProject(),
  };
}
