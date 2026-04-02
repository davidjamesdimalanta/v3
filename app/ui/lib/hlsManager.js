'use client';

import Hls from 'hls.js';

// src → { hls, transferData }
const registry = new Map();

export function initHls(src) {
  if (!src || !src.endsWith('.m3u8')) return;
  if (typeof window === 'undefined' || !Hls.isSupported()) return;
  if (registry.has(src)) return;

  const hls = new Hls({
    autoStartLoad: true,
    maxBufferLength: 12,
    maxMaxBufferLength: 12,
    startLevel: -1,
    enableWorker: true,
  });
  registry.set(src, { hls, transferData: null });
  hls.loadSource(src);
}

export function attachTo(src, videoElement) {
  if (!src || !videoElement) return;
  const entry = registry.get(src);
  if (!entry) return;

  const { hls, transferData } = entry;

  // Already attached to this exact element — just play
  if (hls.media === videoElement) {
    videoElement.play().catch(() => {});
    return;
  }

  if (transferData) {
    hls.attachMedia({ media: videoElement, ...transferData });
    entry.transferData = null;
  } else {
    hls.attachMedia(videoElement);
  }

  videoElement.play().catch(() => {});
}

export function detachFrom(src) {
  const entry = registry.get(src);
  if (!entry || !entry.hls.media) return;
  entry.transferData = entry.hls.transferMedia();
}
