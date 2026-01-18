'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to manage startup audio playback with permission checking
 * Plays audio once per browser session if user has granted permission via localStorage
 * Uses sessionStorage to track playback and prevent replay during same session
 *
 * Note: Respects browser autoplay policies. Audio may not play in fresh tabs
 * without user interaction. In such cases, audio will play after page refresh.
 *
 * @param {string} audioPath - Path to the audio file to play
 * @param {Object} options - Configuration options
 * @param {Function} options.onPlaySuccess - Callback when audio plays successfully
 * @param {Function} options.onPlayBlocked - Callback when audio is blocked by browser
 * @returns {Object} - { audioStatus, audioRef }
 */
export function useStartupAudio(audioPath, options = {}) {
  const {
    onPlaySuccess = null,
    onPlayBlocked = null,
  } = options;

  const audioRef = useRef(null);
  const strictModeGuardRef = useRef(false);
  const [audioStatus, setAudioStatus] = useState('idle'); // 'idle' | 'permission_required' | 'loading' | 'playing' | 'error'

  useEffect(() => {
    // Prevent double execution in React Strict Mode (same effect cycle only)
    // Session-based playback tracking is handled via sessionStorage below
    if (strictModeGuardRef.current) {
      return;
    }
    strictModeGuardRef.current = true;

    const getAudioPermission = () => {
      try {
        return localStorage.getItem('audioPermission');
      } catch (error) {
        return null;
      }
    };

    const playAudio = async (audio) => {
      try {
        await audio.play();
        setAudioStatus('playing');

        if (onPlaySuccess) {
          onPlaySuccess();
        }

        return true;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          return false; // Autoplay blocked
        } else {
          setAudioStatus('error');
          return false;
        }
      }
    };

    const attemptAudioPlayback = async () => {
      try {
        // Check permission first
        const permission = getAudioPermission();
        if (permission !== 'allowed') {
          setAudioStatus('permission_required');
          return; // Exit early - no audio setup
        }

        // Check if audio has already played this session
        try {
          const hasPlayedThisSession = sessionStorage.getItem('startupAudioPlayed');
          if (hasPlayedThisSession === 'true') {
            setAudioStatus('idle');
            return; // Exit - audio already played
          }
        } catch (error) {
          // Continue anyway - allow playback if sessionStorage is blocked
        }

        // Feature detection - check if Audio API is supported
        if (typeof Audio === 'undefined') {
          setAudioStatus('error');
          return;
        }

        // Create Audio element
        const audio = new Audio(audioPath);
        audioRef.current = audio;

        // Set audio properties
        audio.volume = 0.45; // 45% volume
        audio.preload = 'auto';

        setAudioStatus('loading');

        // Wait for audio to be ready to play
        await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Audio load timeout after 10 seconds'));
          }, 10000); // 10 second timeout

          audio.addEventListener('canplaythrough', () => {
            clearTimeout(timeoutId);
            resolve();
          }, { once: true });

          audio.addEventListener('error', (e) => {
            clearTimeout(timeoutId);
            reject(e);
          }, { once: true });
        });

        // Attempt to play immediately
        const playSuccess = await playAudio(audio);

        // Mark as played this session if successful
        if (playSuccess) {
          try {
            sessionStorage.setItem('startupAudioPlayed', 'true');
          } catch (error) {
            // Non-critical - continue
          }
        }

      } catch (error) {
        setAudioStatus('error');
      }
    };

    // Start audio playback attempt
    attemptAudioPlayback();

    // Cleanup function - runs on component unmount
    return () => {
      // Clean up audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []); // Empty deps - run once on mount

  return { audioStatus, audioRef };
}
