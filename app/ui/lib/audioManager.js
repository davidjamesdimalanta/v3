/**
 * Audio Manager Singleton
 * Global audio pool manager that persists across component lifecycles.
 *
 * Short UI sounds use Web Audio when available. Safari is noticeably slower
 * when restarting tiny MP3 files through HTMLAudioElement.currentTime + play().
 * Decoded AudioBuffers avoid that seek/play path after the first unlock.
 */

import { SOUND_PATHS, SOUND_VOLUMES } from './sound-config';

const HOVER_REPLAY_INTERVAL_MS = 45;

const SOUND_ENTRIES = {
  hover: {
    path: SOUND_PATHS.HOVER,
    volume: SOUND_VOLUMES.HOVER,
  },
  buttonHover: {
    path: SOUND_PATHS.BUTTON_HOVER,
    volume: SOUND_VOLUMES.BUTTON_HOVER,
  },
  navigateHome: {
    path: SOUND_PATHS.NAVIGATE_HOME,
    volume: SOUND_VOLUMES.NAVIGATE_HOME,
  },
  navigateProject: {
    path: SOUND_PATHS.NAVIGATE_PROJECT,
    volume: SOUND_VOLUMES.NAVIGATE_PROJECT,
  },
};

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.buffers = new Map();
    this.bufferPromises = new Map();
    this.fallbackAudios = new Map();
    this.currentHoverSource = null;
    this.currentHoverAudio = null;
    this.lastHoverPlayAt = 0;
    this.initialized = false;
    this.unlockListenersBound = false;
  }

  initialize() {
    if (this.initialized) return true;

    try {
      if (this.getAudioPermission() !== 'allowed') return false;
      if (this.prefersReducedMotion()) return false;

      const context = this.createAudioContext();
      this.bindUnlockListeners();

      if (context) {
        this.preloadBuffers();
      } else {
        this.createFallbackAudios();
      }

      this.initialized = true;
      return true;
    } catch (error) {
      return false;
    }
  }

  getAudioPermission() {
    if (typeof window === 'undefined') return null;

    try {
      return localStorage.getItem('audioPermission');
    } catch (error) {
      return null;
    }
  }

  prefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  createAudioContext() {
    if (this.audioContext || typeof window === 'undefined') return this.audioContext;

    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return null;

    this.audioContext = new AudioContextConstructor();
    return this.audioContext;
  }

  createFallbackAudios() {
    if (typeof Audio === 'undefined' || this.fallbackAudios.size > 0) return;

    Object.entries(SOUND_ENTRIES).forEach(([key, sound]) => {
      this.createFallbackAudio(key, sound);
    });
  }

  createFallbackAudio(key, sound = SOUND_ENTRIES[key]) {
    if (typeof Audio === 'undefined' || !sound) return null;
    if (this.fallbackAudios.has(key)) return this.fallbackAudios.get(key);

    const audio = new Audio(sound.path);
    audio.volume = sound.volume;
    audio.preload = 'auto';
    audio.load();
    this.fallbackAudios.set(key, audio);
    return audio;
  }

  bindUnlockListeners() {
    if (this.unlockListenersBound || typeof window === 'undefined') return;

    const unlock = () => {
      this.prime();
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('touchstart', unlock, true);
      window.removeEventListener('keydown', unlock, true);
    };

    window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
    window.addEventListener('touchstart', unlock, { capture: true, passive: true });
    window.addEventListener('keydown', unlock, true);
    this.unlockListenersBound = true;
  }

  preloadBuffers() {
    Object.keys(SOUND_ENTRIES).forEach((key) => {
      this.loadBuffer(key);
    });
  }

  loadBuffer(key) {
    const context = this.createAudioContext();
    const sound = SOUND_ENTRIES[key];
    if (!context || !sound) return null;
    if (this.buffers.has(key)) return Promise.resolve(this.buffers.get(key));
    if (this.bufferPromises.has(key)) return this.bufferPromises.get(key);

    const bufferPromise = fetch(sound.path)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load sound: ${sound.path}`);
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => this.decodeAudioData(arrayBuffer))
      .then((buffer) => {
        this.buffers.set(key, buffer);
        return buffer;
      })
      .catch(() => null);

    this.bufferPromises.set(key, bufferPromise);
    return bufferPromise;
  }

  decodeAudioData(arrayBuffer) {
    const context = this.audioContext;
    if (!context) return Promise.resolve(null);

    return new Promise((resolve, reject) => {
      const decodePromise = context.decodeAudioData(
        arrayBuffer.slice(0),
        resolve,
        reject
      );

      if (decodePromise?.then) {
        decodePromise.then(resolve).catch(reject);
      }
    });
  }

  resumeContext() {
    const context = this.createAudioContext();
    if (!context || context.state !== 'suspended') return Promise.resolve();
    return context.resume().catch(() => {});
  }

  prime() {
    if (!this.initialized && !this.initialize()) return;

    this.resumeContext();
    this.preloadBuffers();
  }

  playBuffer(key, { isHover = false } = {}) {
    const context = this.audioContext;
    const buffer = this.buffers.get(key);
    const sound = SOUND_ENTRIES[key];
    if (!context || !buffer || !sound || context.state !== 'running') return false;

    try {
      if (isHover && this.currentHoverSource) {
        this.currentHoverSource.stop();
        this.currentHoverSource = null;
      }

      const source = context.createBufferSource();
      const gain = context.createGain();

      source.buffer = buffer;
      gain.gain.value = sound.volume;
      source.connect(gain);
      gain.connect(context.destination);
      source.start(0);

      if (isHover) {
        this.currentHoverSource = source;
        source.onended = () => {
          if (this.currentHoverSource === source) {
            this.currentHoverSource = null;
          }
        };
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  playFallback(key, { isHover = false } = {}) {
    const audio = this.createFallbackAudio(key);
    if (!audio) return false;

    try {
      if (isHover && this.currentHoverAudio) {
        this.currentHoverAudio.pause();
        this.currentHoverAudio.currentTime = 0;
      }

      audio.currentTime = 0;
      const playAttempt = audio.play();
      if (playAttempt?.catch) {
        playAttempt.catch(() => {});
      }

      if (isHover) {
        this.currentHoverAudio = audio;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  playEffect(key, { isHover = false } = {}) {
    if (!this.initialized && !this.initialize()) return;

    if (isHover) {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      if (now - this.lastHoverPlayAt < HOVER_REPLAY_INTERVAL_MS) return;
      this.lastHoverPlayAt = now;
    }

    this.resumeContext();

    if (this.playBuffer(key, { isHover })) return;

    this.loadBuffer(key);
    this.playFallback(key, { isHover });
  }

  playHover() {
    this.playEffect('hover', { isHover: true });
  }

  playButtonHover() {
    this.playEffect('buttonHover', { isHover: true });
  }

  playNavigateHome() {
    this.playEffect('navigateHome');
  }

  playNavigateProject() {
    this.playEffect('navigateProject');
  }
}

export const audioManager = new AudioManager();
