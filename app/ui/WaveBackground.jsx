'use client';

import { useEffect, useRef, useState } from 'react';
import { WaveRenderer } from './lib/webgpu-wave';
import { Canvas2DWaveRenderer } from './lib/canvas2d-wave';
import { useStartupAudio } from './hooks/useStartupAudio';
import { useScrollFade } from './hooks/useScrollFade';

export default function WaveBackground({ mode = 'design' }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  // 'pending' | 'webgpu' | 'canvas2d'
  const [backend, setBackend] = useState('pending');

  // Initialize startup audio
  useStartupAudio('/assets/psp/sounds/01 Startup.mp3');

  const { opacity: waveOpacity } = useScrollFade({
    fadeStart: 0,
    fadeEnd: 100,
    minOpacity: 0,
    maxOpacity: 0.3,
  });

  // Attempt WebGPU first. If it fails, switch to Canvas 2D fallback.
  // The key insight: once getContext('webgpu') is called on a canvas (even
  // returning null), that canvas is locked to webgpu and can never be used
  // for '2d'. So we use separate canvas elements via the backend state.
  useEffect(() => {
    if (backend !== 'pending') return;
    if (typeof navigator === 'undefined' || !navigator.gpu) {
      setBackend('canvas2d');
      return;
    }

    let cancelled = false;
    // Probe WebGPU availability with a throwaway canvas (not our render canvas)
    const probe = async () => {
      let adapter;
      try {
        adapter = await navigator.gpu.requestAdapter();
      } catch {
        adapter = null;
      }
      if (cancelled) return;

      if (!adapter) {
        setBackend('canvas2d');
        return;
      }

      let device;
      try {
        device = await adapter.requestDevice();
      } catch {
        setBackend('canvas2d');
        return;
      }
      if (cancelled) { device.destroy(); return; }

      // Test context creation on a throwaway canvas so we don't poison our real one
      const testCanvas = document.createElement('canvas');
      const ctx = testCanvas.getContext('webgpu');
      device.destroy();

      if (cancelled) return;

      if (ctx) {
        setBackend('webgpu');
      } else {
        setBackend('canvas2d');
      }
    };
    probe();

    return () => { cancelled = true; };
  }, [backend]);

  // Initialize the chosen renderer
  useEffect(() => {
    if (backend === 'pending') return;
    if (!canvasRef.current) return;

    let cancelled = false;

    const init = async () => {
      let renderer;

      if (backend === 'webgpu') {
        renderer = new WaveRenderer(canvasRef.current, mode);
        rendererRef.current = renderer;

        renderer._onNeedsRecovery = () => {
          if (!cancelled) {
            rendererRef.current = null;
            // WebGPU died at runtime — fall back to Canvas 2D.
            // Reset backend to 'pending' won't help (context is poisoned),
            // go directly to canvas2d which needs a fresh canvas element.
            setBackend('canvas2d');
          }
        };

        const ok = await renderer.init();
        if (cancelled) { renderer.destroy(); rendererRef.current = null; return; }

        if (ok) {
          renderer.start();
        } else {
          // WebGPU init failed despite probe — fall back
          renderer.destroy();
          rendererRef.current = null;
          setBackend('canvas2d');
        }
      } else {
        renderer = new Canvas2DWaveRenderer(canvasRef.current, mode);
        rendererRef.current = renderer;

        const ok = renderer.init();
        if (cancelled) { renderer.destroy(); rendererRef.current = null; return; }

        if (ok) {
          renderer.start();
        }
      }
    };
    init();

    return () => {
      cancelled = true;
      if (rendererRef.current) {
        rendererRef.current.cancel();
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, [backend]);

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

  // Don't render a canvas during the probe phase
  if (backend === 'pending') {
    return <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
  }

  // Key on backend so React creates a fresh canvas when switching from
  // webgpu to canvas2d (the old canvas is locked to webgpu context type)
  return (
    <canvas
      key={backend}
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: waveOpacity, transition: 'none' }}
    />
  );
}
