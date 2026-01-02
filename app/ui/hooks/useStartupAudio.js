'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to manage startup audio playback with permission checking
 * Only attempts to play audio if user has granted permission via localStorage
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
  const hasAttemptedPlayRef = useRef(false);
  const [audioStatus, setAudioStatus] = useState('idle'); // 'idle' | 'permission_required' | 'loading' | 'playing' | 'error'

  useEffect(() => {
    // Only run once on mount - prevents double execution in React Strict Mode
    if (hasAttemptedPlayRef.current) return;
    hasAttemptedPlayRef.current = true;

    const getAudioPermission = () => {
      try {
        return localStorage.getItem('audioPermission');
      } catch (error) {
        console.warn('localStorage unavailable:', error);
        return null;
      }
    };

    const playAudio = async (audio) => {
      try {
        await audio.play();
        setAudioStatus('playing');
        console.log('Startup audio playing at 45% volume');

        if (onPlaySuccess) {
          onPlaySuccess();
        }

        return true;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          return false; // Autoplay blocked
        } else {
          console.error('Audio playback error:', error);
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
          console.log('Audio permission not granted. User must enable sound.');
          return; // Exit early - no audio setup
        }

        // Feature detection - check if Audio API is supported
        if (typeof Audio === 'undefined') {
          console.warn('Audio API not supported in this browser');
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
        await playAudio(audio);

      } catch (error) {
        if (error.name === 'NotSupportedError') {
          console.error('Audio file format not supported:', error);
          setAudioStatus('error');
        } else if (error.message && error.message.includes('timeout')) {
          console.error('Audio loading timeout:', error);
          setAudioStatus('error');
        } else {
          console.error('Audio setup error:', error);
          setAudioStatus('error');
        }
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
