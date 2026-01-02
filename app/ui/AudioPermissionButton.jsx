'use client';

import { useSyncExternalStore } from 'react';
import Button from './Button';

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
      <Button
        text="Enable Sound"
        onClick={handleEnableSound}
        className="shadow-lg"
      />
    </div>
  );
}
