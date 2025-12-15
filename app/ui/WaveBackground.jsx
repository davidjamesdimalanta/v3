'use client';

import { useEffect, useRef } from 'react';
import { WaveRenderer } from './lib/webgl-wave';

export default function WaveBackground({ mode = 'design' }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  // Initialize WebGL once, persist across navigation
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create renderer instance (singleton pattern within ref)
    if (!rendererRef.current) {
      rendererRef.current = new WaveRenderer(canvasRef.current, mode);
      rendererRef.current.start();
    }

    // Cleanup only on unmount (which never happens in root layout)
    return () => {
      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, []); // Empty deps - run once on mount

  // Handle mode changes without recreating renderer
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setColorMode(mode);
    }
  }, [mode]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  );
}
