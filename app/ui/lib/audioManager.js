/**
 * Audio Manager Singleton
 * Global audio pool manager that persists across component lifecycles
 *
 * This singleton pattern fixes navigation bugs by ensuring audio instances
 * are never destroyed during component unmounting. Instead, they persist
 * for the entire application lifetime.
 *
 * Benefits:
 * - Eliminates race conditions during navigation
 * - Reduces memory footprint (3 instances instead of N*3 per component)
 * - Faster navigation (no audio re-initialization)
 * - No cleanup bugs
 */

import { SOUND_PATHS, SOUND_VOLUMES } from './sound-config';

class AudioManager {
  constructor() {
    // Audio instance references
    this.hoverAudio = null;
    this.buttonHoverAudio = null;
    this.navigateHomeAudio = null;
    this.navigateProjectAudio = null;

    // Track currently playing hover sound to prevent overlap
    this.currentHoverAudio = null;

    // Track initialization state
    this.initialized = false;
  }

  /**
   * Initialize the audio pool
   * Safe to call multiple times - only initializes once
   * @returns {boolean} - True if initialized successfully or already initialized
   */
  initialize() {
    // Already initialized - return early
    if (this.initialized) {
      return true;
    }

    try {
      // Check permission first
      const permission = this.getAudioPermission();
      if (permission !== 'allowed') {
        return false;
      }

      // Check prefers-reduced-motion
      if (typeof window !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          return false;
        }
      }

      // Feature detection - check if Audio API is supported
      if (typeof Audio === 'undefined') {
        return false;
      }

      // Create audio instances for each sound effect
      this.hoverAudio = new Audio(SOUND_PATHS.HOVER);
      this.hoverAudio.volume = SOUND_VOLUMES.HOVER;
      this.hoverAudio.preload = 'auto';

      this.buttonHoverAudio = new Audio(SOUND_PATHS.BUTTON_HOVER);
      this.buttonHoverAudio.volume = SOUND_VOLUMES.BUTTON_HOVER;
      this.buttonHoverAudio.preload = 'auto';

      this.navigateHomeAudio = new Audio(SOUND_PATHS.NAVIGATE_HOME);
      this.navigateHomeAudio.volume = SOUND_VOLUMES.NAVIGATE_HOME;
      this.navigateHomeAudio.preload = 'auto';

      this.navigateProjectAudio = new Audio(SOUND_PATHS.NAVIGATE_PROJECT);
      this.navigateProjectAudio.volume = SOUND_VOLUMES.NAVIGATE_PROJECT;
      this.navigateProjectAudio.preload = 'auto';

      this.initialized = true;
      return true;

    } catch (error) {
      return false;
    }
  }

  /**
   * Get audio permission from localStorage
   * @returns {string|null} - Permission status or null
   */
  getAudioPermission() {
    if (typeof window === 'undefined') return null;

    try {
      return localStorage.getItem('audioPermission');
    } catch (error) {
      return null;
    }
  }

  /**
   * Play hover sound effect (for links)
   * Stops previous hover sound if still playing to prevent overlap
   */
  playHover() {
    if (!this.hoverAudio) return;

    try {
      // Stop previous hover sound if playing
      if (this.currentHoverAudio) {
        this.currentHoverAudio.pause();
        this.currentHoverAudio.currentTime = 0;
      }

      // Play new hover sound
      this.hoverAudio.currentTime = 0;
      this.hoverAudio.play().catch(() => {
        // Silently handle playback errors (e.g., user hasn't interacted yet)
      });

      // Track this as the currently playing hover sound
      this.currentHoverAudio = this.hoverAudio;

    } catch (error) {
      // Silently handle errors
    }
  }

  /**
   * Play button hover sound effect (Cancel sound)
   * Stops previous hover sound if still playing to prevent overlap
   */
  playButtonHover() {
    if (!this.buttonHoverAudio) return;

    try {
      // Stop previous hover sound if playing
      if (this.currentHoverAudio) {
        this.currentHoverAudio.pause();
        this.currentHoverAudio.currentTime = 0;
      }

      // Play button hover sound
      this.buttonHoverAudio.currentTime = 0;
      this.buttonHoverAudio.play().catch(() => {
        // Silently handle playback errors (e.g., user hasn't interacted yet)
      });

      // Track this as the currently playing hover sound
      this.currentHoverAudio = this.buttonHoverAudio;

    } catch (error) {
      // Silently handle errors
    }
  }

  /**
   * Play navigation to home sound effect
   */
  playNavigateHome() {
    if (!this.navigateHomeAudio) return;

    try {
      this.navigateHomeAudio.currentTime = 0;
      this.navigateHomeAudio.play().catch(() => {
        // Silently handle playback errors
      });
    } catch (error) {
      // Silently handle errors
    }
  }

  /**
   * Play navigation to project sound effect
   */
  playNavigateProject() {
    if (!this.navigateProjectAudio) return;

    try {
      this.navigateProjectAudio.currentTime = 0;
      this.navigateProjectAudio.play().catch(() => {
        // Silently handle playback errors
      });
    } catch (error) {
      // Silently handle errors
    }
  }
}

// Export singleton instance - shared across entire application
export const audioManager = new AudioManager();
