'use client';

import { useSyncExternalStore } from 'react';
import { useSoundEffects } from './hooks/useSoundEffects';

const audioPermissionListeners = new Set();

function subscribeAudioPermission(listener) {
  audioPermissionListeners.add(listener);
  return () => {
    audioPermissionListeners.delete(listener);
  };
}

function notifyAudioPermissionListeners() {
  audioPermissionListeners.forEach((listener) => listener());
}

function shouldShowAudioButton() {
  // Server-side: don't show button
  if (typeof window === 'undefined') return false;

  // Check localStorage for permission
  try {
    const permission = localStorage.getItem('audioPermission');
    return permission !== 'allowed';
  } catch (error) {
    // localStorage unavailable - show button
    return true;
  }
}

export default function AudioPermissionButton() {
  const { primeAudio } = useSoundEffects();
  const showButton = useSyncExternalStore(
    subscribeAudioPermission,
    shouldShowAudioButton,
    () => false
  );

  const handleEnableSound = () => {
    try {
      localStorage.setItem('audioPermission', 'allowed');
      primeAudio();
    } catch (error) {
      // Keep the UI responsive even when storage is unavailable.
    }
    notifyAudioPermissionListeners();
  };

  if (!showButton) return null;

  return (
    <div className="fixed top-20 left-4 z-50">
      <button
        onClick={handleEnableSound}
        className="p-3 rounded-full bd text-400 hover:bd-text hover:bd-active transition-all duration-150 cursor-pointer shadow-lg"
        aria-label="Enable sound"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
