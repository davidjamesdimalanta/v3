'use client';

import Hls from 'hls.js';

// src → { hls }
const registry = new Map();

// --- Featured-projects seal ------------------------------------------------
// Tracks how many srcs have been registered via registerFeaturedSrc.
// featuredProjectsReady resolves once every registered src has its HLS
// instance initialised (or immediately when Hls.isSupported() is false,
// i.e. Safari, where we don't manage HLS instances at all).

let _featuredCount = 0;
let _featuredInitialised = 0;
let _sealResolve = null;

export const featuredProjectsReady = new Promise((resolve) => {
  _sealResolve = resolve;
});

// Called by each FeaturedProject on mount, before initHls.
// Must be called synchronously (in a useEffect that runs before AppIconPopover
// mounts) so the count is accurate before any resolve check runs.
export function registerFeaturedSrc(src) {
  if (!src || !src.includes('.m3u8')) return;

  // On Safari, Hls.isSupported() is false — we never manage HLS instances,
  // so there is nothing to wait for. Resolve immediately on first call if
  // we haven't already resolved.
  if (typeof window !== 'undefined' && !Hls.isSupported()) {
    _sealResolve();
    return;
  }

  _featuredCount += 1;
}

// Checks whether all registered featured srcs are ready and resolves the
// promise when they are.
function _checkSeal() {
  if (_featuredCount > 0 && _featuredInitialised >= _featuredCount) {
    _sealResolve();
  }
}

// --------------------------------------------------------------------------

export function initHls(src) {
  if (!src || !src.includes('.m3u8')) return;
  if (typeof window === 'undefined' || !Hls.isSupported()) return;
  if (registry.has(src)) return;

  const hls = new Hls({
    autoStartLoad: true,
    maxBufferLength: 12,
    maxMaxBufferLength: 12,
    startLevel: -1,
    enableWorker: true,
  });
  registry.set(src, { hls });
  hls.loadSource(src);

  // Once the manifest has been parsed the instance is considered initialised.
  hls.once(Hls.Events.MANIFEST_PARSED, () => {
    _featuredInitialised += 1;
    _checkSeal();
  });

  // If the source errors out we still increment so the seal is not stuck.
  hls.once(Hls.Events.ERROR, (_, data) => {
    if (data.fatal) {
      _featuredInitialised += 1;
      _checkSeal();
    }
  });
}

export function attachTo(src, videoElement) {
  if (!src || !videoElement) return;
  const entry = registry.get(src);
  if (!entry) return;

  const { hls } = entry;

  // Already attached to this exact element — just play
  if (hls.media === videoElement) {
    videoElement.play().catch(() => {});
    return;
  }

  // Detach from previous element (if any) before attaching to new one
  if (hls.media) {
    hls.detachMedia();
  }

  hls.attachMedia(videoElement);

  // Wait for canplay before attempting playback — attachMedia is async
  const onCanPlay = () => {
    videoElement.play().catch(() => {});
    videoElement.removeEventListener('canplay', onCanPlay);
  };
  videoElement.addEventListener('canplay', onCanPlay);
}

export function detachFrom(src) {
  const entry = registry.get(src);
  if (!entry || !entry.hls.media) return;
  // Detach cleanly — HLS instance stays in registry and keeps buffering
  entry.hls.detachMedia();
}
