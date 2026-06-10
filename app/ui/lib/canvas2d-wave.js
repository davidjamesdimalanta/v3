/*********************************
 * CANVAS 2D WAVE FALLBACK       *
 * Mirrors the WebGPU wave effect *
 *********************************/

import { readCssColor255 } from './cssColor.js';

export class Canvas2DWaveRenderer {
  constructor(canvas, initialMode = 'design') {
    this.canvas = canvas;
    this.ctx = null;
    this.animationFrameId = null;
    this.destroyed = false;
    this.currentMode = initialMode;

    // Animation state
    this.fadeInStartTime = null;
    this.fadeInDelay = 0;
    this.fadeInDuration = 0;
    this.waveStagger = 0;
    this.numWaves = 7;
    this.waveOpacities = new Array(this.numWaves).fill(1.0);
    this.completionEventFired = false;

    // Wave color modes — design mode pulls from MT --schemes-primary so the
    // wave inherits theme/contrast changes from globals.css automatically.
    // Fallback matches the resolved oklch() value of the light scheme primary.
    this.figGreen = { r: 80, g: 81, b: 80 };
    this.figBlue = readCssColor255('--schemes-primary') ?? { r: 50, g: 51, b: 50 };

    this.color = initialMode === 'dev' ? this.figGreen : this.figBlue;

    // Wave configs matching the WGSL shader parameters
    this.waves = [
      { speed: 0.2, freq: 0.20, amp: 0.2,  offset: 0.48, lineWidth: 0.1,  sharpness: 15, invert: false },
      { speed: 0.4, freq: 0.40, amp: 0.15, offset: 0.48, lineWidth: 0.1,  sharpness: 17, invert: false },
      { speed: 0.3, freq: 0.60, amp: 0.15, offset: 0.48, lineWidth: 0.05, sharpness: 23, invert: false },
      { speed: 0.1, freq: 0.26, amp: 0.07, offset: 0.28, lineWidth: 0.1,  sharpness: 17, invert: true  },
      { speed: 0.3, freq: 0.36, amp: 0.07, offset: 0.28, lineWidth: 0.1,  sharpness: 17, invert: true  },
      { speed: 0.5, freq: 0.46, amp: 0.07, offset: 0.28, lineWidth: 0.05, sharpness: 23, invert: true  },
      { speed: 0.2, freq: 0.58, amp: 0.05, offset: 0.28, lineWidth: 0.2,  sharpness: 15, invert: true  },
    ];
  }

  init() {
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return false;
    this.resize();
    return true;
  }

  setColorMode(mode) {
    this.currentMode = mode;
    // Re-read MT primary on every mode switch so theme changes (light/dark/HC)
    // propagate without recreating the renderer.
    this.figBlue = readCssColor255('--schemes-primary') ?? this.figBlue;
    this.color = mode === 'dev' ? this.figGreen : this.figBlue;
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  cubicBezier(t, p1y, p2y) {
    const cy = 3.0 * p1y;
    const by = 3.0 * (p2y - p1y) - cy;
    const ay = 1.0 - cy - by;
    const t2 = t * t;
    return ay * t2 * t + by * t2 + cy * t;
  }

  updateFadeIn(currentTime) {
    if (this.fadeInStartTime === null) {
      this.fadeInStartTime = currentTime;
    }

    const elapsed = currentTime - this.fadeInStartTime;
    let allComplete = true;

    for (let i = 0; i < this.numWaves; i++) {
      const waveDelay = this.fadeInDelay + (i * this.waveStagger);
      const waveEnd = waveDelay + this.fadeInDuration;

      if (elapsed < waveDelay) {
        this.waveOpacities[i] = 0.0;
        allComplete = false;
      } else if (elapsed < waveEnd) {
        const progress = (elapsed - waveDelay) / this.fadeInDuration;
        this.waveOpacities[i] = this.cubicBezier(progress, 0.17, 0.47);
        allComplete = false;
      } else {
        this.waveOpacities[i] = 1.0;
      }
    }

    if (allComplete && !this.completionEventFired) {
      this.completionEventFired = true;
      window.dispatchEvent(new CustomEvent('wave-animation-complete', {
        detail: { completionTime: currentTime }
      }));
    }
  }

  render(timeMs) {
    if (this.destroyed || !this.ctx) return;

    const timeSec = timeMs * 0.001;
    const { width, height } = this.canvas;

    this.updateFadeIn(timeMs);

    this.ctx.clearRect(0, 0, width, height);

    const { r, g, b } = this.color;
    const waveWidthFactor = 1.5;

    // Sample each column and accumulate wave contributions
    // Use a step size for performance (every 2px)
    const step = 2;
    for (let px = 0; px < width; px += step) {
      const uvx = px / width;

      for (let wi = 0; wi < this.waves.length; wi++) {
        const w = this.waves[wi];
        const opacity = this.waveOpacities[wi];
        if (opacity <= 0) continue;

        const angle = timeSec * w.speed * w.freq * -1.0 + uvx * 2.0;
        const waveY = Math.sin(angle) * w.amp + w.offset;

        // Draw a vertical gradient band around the wave center
        const bandHalf = w.lineWidth * waveWidthFactor;
        const yCenter = (1.0 - waveY) * height;
        const yTop = yCenter - bandHalf * height;
        const yBot = yCenter + bandHalf * height;

        // Create a gradient for this wave slice
        const grad = this.ctx.createLinearGradient(0, yTop, 0, yBot);

        if (w.invert) {
          // Falloff is sharper above
          grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
          grad.addColorStop(0.25, `rgba(${r},${g},${b},0)`);
          grad.addColorStop(0.5, `rgba(${r},${g},${b},${opacity * 0.8})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        } else {
          // Falloff is sharper below
          grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
          grad.addColorStop(0.5, `rgba(${r},${g},${b},${opacity * 0.8})`);
          grad.addColorStop(0.75, `rgba(${r},${g},${b},0)`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        }

        this.ctx.fillStyle = grad;
        this.ctx.fillRect(px, yTop, step, yBot - yTop);
      }
    }

    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  start() {
    if (this.animationFrameId !== null) return;
    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  cancel() {
    this.destroyed = true;
  }

  destroy() {
    this.destroyed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.ctx = null;
  }
}
