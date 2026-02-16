'use client';

import { useSyncExternalStore } from 'react';

function shouldShowAudioButton() {
  // Server-side: don't show button
  if (typeof window === 'undefined') return false;

  // Detect Safari browser - hide button in Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) return false;

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
  // Use useSyncExternalStore for reading from browser APIs
  const showButton = useSyncExternalStore(
    () => () => {}, // No subscription needed (value doesn't change)
    shouldShowAudioButton, // Client-side value
    () => false // Server-side value
  );

  const handleEnableSound = () => {
    try {
      localStorage.setItem('audioPermission', 'allowed');
      window.location.reload();
    } catch (error) {
      // Even if localStorage fails, still reload
      window.location.reload();
    }
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
