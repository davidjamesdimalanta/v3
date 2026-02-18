/*********************************
 * WEBGPU WAVE RENDERER CLASS    *
 *********************************/

const WGSL_SHADER = /* wgsl */`

struct Uniforms {
  time: f32,
  _pad0: f32,
  resolution: vec2f,
  waveColor: vec3f,
  isMobile: f32,
  waveOpacity0: f32,
  waveOpacity1: f32,
  waveOpacity2: f32,
  waveOpacity3: f32,
  waveOpacity4: f32,
  waveOpacity5: f32,
  waveOpacity6: f32,
  _pad1: f32,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

// Vertex shader — full-screen quad from vertex index
struct VertexOutput {
  @builtin(position) position: vec4f,
};

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  // Triangle strip: 0=(-1,-1), 1=(1,-1), 2=(-1,1), 3=(1,1)
  let x = f32(i32(vertexIndex & 1u)) * 2.0 - 1.0;
  let y = f32(i32((vertexIndex >> 1u) & 1u)) * 2.0 - 1.0;

  var output: VertexOutput;
  output.position = vec4f(x, y, 0.0, 1.0);
  return output;
}

// Fragment shader — wave effect
const waveWidthFactor: f32 = 1.5;

fn calcSine(
  uv: vec2f,
  speed: f32,
  frequency: f32,
  amplitude: f32,
  phaseShift: f32,
  verticalOffset: f32,
  baseColor: vec3f,
  lineWidth: f32,
  sharpness: f32,
  invertFalloff: bool,
  opacity: f32
) -> vec3f {
  let angle = u.time * speed * frequency * -1.0 + (phaseShift + uv.x) * 2.0;
  let waveY = sin(angle) * amplitude + verticalOffset;
  let deltaY = waveY - uv.y;
  var distanceVal = distance(waveY, uv.y);

  if (invertFalloff) {
    if (deltaY > 0.0) {
      distanceVal = distanceVal * 4.0;
    }
  } else {
    if (deltaY < 0.0) {
      distanceVal = distanceVal * 4.0;
    }
  }

  let smoothVal = smoothstep(lineWidth * waveWidthFactor, 0.0, distanceVal);
  let scaleVal = pow(smoothVal, sharpness);

  return min(baseColor * scaleVal * opacity, baseColor * opacity);
}

@fragment
fn fragmentMain(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
  // Flip Y: WebGPU origin is top-left, but wave offsets assume bottom-left (like WebGL)
  let uv = vec2f(fragCoord.x / u.resolution.x, 1.0 - fragCoord.y / u.resolution.y);

  var accumulatedColor = vec3f(0.0);

  let offset1 = mix(0.9, 0.9, u.isMobile);
  let offset2 = mix(0.8, 0.85, u.isMobile);

  accumulatedColor += calcSine(uv, 0.2, 0.20, 0.2,  0.0, offset1, u.waveColor, 0.1,  15.0, false, u.waveOpacity0);
  accumulatedColor += calcSine(uv, 0.4, 0.40, 0.15, 0.0, offset1, u.waveColor, 0.1,  17.0, false, u.waveOpacity1);
  accumulatedColor += calcSine(uv, 0.3, 0.60, 0.15, 0.0, offset1, u.waveColor, 0.05, 23.0, false, u.waveOpacity2);
  accumulatedColor += calcSine(uv, 0.1, 0.26, 0.07, 0.0, offset2, u.waveColor, 0.1,  17.0, true,  u.waveOpacity3);
  accumulatedColor += calcSine(uv, 0.3, 0.36, 0.07, 0.0, offset2, u.waveColor, 0.1,  17.0, true,  u.waveOpacity4);
  accumulatedColor += calcSine(uv, 0.5, 0.46, 0.07, 0.0, offset2, u.waveColor, 0.05, 23.0, true,  u.waveOpacity5);
  accumulatedColor += calcSine(uv, 0.2, 0.58, 0.05, 0.0, offset2, u.waveColor, 0.2,  15.0, true,  u.waveOpacity6);

  var maxChannel = accumulatedColor.r;
  if (accumulatedColor.g > maxChannel) {
    maxChannel = accumulatedColor.g;
  }
  if (accumulatedColor.b > maxChannel) {
    maxChannel = accumulatedColor.b;
  }

  if (maxChannel <= 0.0) {
    discard;
  }

  return vec4f(accumulatedColor, maxChannel);
}
`;

// Uniform buffer size: 64 bytes (16-byte aligned)
const UNIFORM_BUFFER_SIZE = 64;

export class WaveRenderer {
  constructor(canvas, initialMode = 'design') {
    this.canvas = canvas;
    this.device = null;
    this.context = null;
    this.pipeline = null;
    this.uniformBuffer = null;
    this.bindGroup = null;
    this.canvasFormat = null;
    this.animationFrameId = null;
    this.initialized = false;
    this.destroyed = false;
    this.cancelled = false;
    this.currentMode = initialMode;

    // Animation state
    this.fadeInStartTime = null;
    this.fadeInDelay = 0;
    this.fadeInDuration = 0;
    this.waveStagger = 0;
    this.numWaves = 7;
    this.waveOpacities = new Array(this.numWaves).fill(1.0);
    this.completionEventFired = false;

    // Wave color modes
    this.figGreen = { r: 0.067, g: 0.682, b: 0.361 };
    this.figBlue = { r: 0.227, g: 0.172, b: 0.168 };

    // Uniform data (Float32Array matching the WGSL struct layout)
    this.uniformData = new Float32Array(UNIFORM_BUFFER_SIZE / 4);

    // Set initial color
    const color = initialMode === 'dev' ? this.figGreen : this.figBlue;
    this.uniformData[4] = color.r; // waveColor.r
    this.uniformData[5] = color.g; // waveColor.g
    this.uniformData[6] = color.b; // waveColor.b
  }

  cancel() {
    this.cancelled = true;
  }

  async init() {
    // 1. Adapter
    let adapter;
    try {
      adapter = await navigator.gpu.requestAdapter();
    } catch {
      adapter = null;
    }
    if (this.cancelled) return false;
    if (!adapter) return false;

    // 2. Device
    let device;
    try {
      device = await adapter.requestDevice();
    } catch {
      return false;
    }
    if (this.cancelled) { device.destroy(); return false; }

    // 3. Canvas context — returns null when Chrome's context provider is exhausted
    const ctx = this.canvas.getContext('webgpu');
    if (!ctx) {
      device.destroy();
      return false;
    }

    this.device = device;
    this.context = ctx;

    // Listen for device loss and attempt recovery
    this.device.lost.then((info) => {
      console.warn('WebGPU device lost:', info.message);
      if (!this.destroyed) {
        this.handleDeviceLost();
      }
    });

    this.canvasFormat = navigator.gpu.getPreferredCanvasFormat();

    this.context.configure({
      device: this.device,
      format: this.canvasFormat,
      alphaMode: 'premultiplied',
    });

    // Create shader module
    const shaderModule = this.device.createShaderModule({
      code: WGSL_SHADER,
    });

    // Create uniform buffer
    this.uniformBuffer = this.device.createBuffer({
      size: UNIFORM_BUFFER_SIZE,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    // Create bind group layout + bind group
    const bindGroupLayout = this.device.createBindGroupLayout({
      entries: [{
        binding: 0,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform' },
      }],
    });

    this.bindGroup = this.device.createBindGroup({
      layout: bindGroupLayout,
      entries: [{
        binding: 0,
        resource: { buffer: this.uniformBuffer },
      }],
    });

    // Create render pipeline
    this.pipeline = this.device.createRenderPipeline({
      layout: this.device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      }),
      vertex: {
        module: shaderModule,
        entryPoint: 'vertexMain',
      },
      fragment: {
        module: shaderModule,
        entryPoint: 'fragmentMain',
        targets: [{
          format: this.canvasFormat,
          blend: {
            color: {
              srcFactor: 'src-alpha',
              dstFactor: 'one-minus-src-alpha',
              operation: 'add',
            },
            alpha: {
              srcFactor: 'one',
              dstFactor: 'one-minus-src-alpha',
              operation: 'add',
            },
          },
        }],
      },
      primitive: {
        topology: 'triangle-strip',
      },
    });

    // Set mobile detection
    this.updateMobileDetection();

    // Resize canvas
    this.resize();

    this.initialized = true;
    return true;
  }

  handleDeviceLost() {
    // Stop the current animation loop
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Clear stale GPU state (device is already lost, no need to destroy it)
    this.device = null;
    this.uniformBuffer = null;
    this.bindGroup = null;
    this.pipeline = null;
    this.context = null;
    this.initialized = false;

    // Signal to the component that it needs to replace the canvas and re-init
    if (this._onNeedsRecovery) {
      this._onNeedsRecovery();
    }
  }

  setColorMode(mode) {
    this.currentMode = mode;
    const color = mode === 'dev' ? this.figGreen : this.figBlue;
    this.uniformData[4] = color.r;
    this.uniformData[5] = color.g;
    this.uniformData[6] = color.b;
  }

  updateMobileDetection() {
    const isMobile = window.innerWidth <= 768;
    this.uniformData[7] = isMobile ? 1.0 : 0.0;
  }

  resize() {
    if (!this.canvas || !this.context) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Update resolution in uniform data
    this.uniformData[2] = this.canvas.width;
    this.uniformData[3] = this.canvas.height;

    this.updateMobileDetection();
  }

  cubicBezier(t, p1x, p1y, p2x, p2y) {
    const cx = 3.0 * p1x;
    const bx = 3.0 * (p2x - p1x) - cx;

    const cy = 3.0 * p1y;
    const by = 3.0 * (p2y - p1y) - cy;
    const ay = 1.0 - cy - by;

    const t2 = t * t;
    const t3 = t2 * t;

    return ay * t3 + by * t2 + cy * t;
  }

  updateFadeIn(currentTime) {
    if (this.fadeInStartTime === null) {
      this.fadeInStartTime = currentTime;
    }

    const elapsed = currentTime - this.fadeInStartTime;
    let allComplete = true;

    for (let i = 0; i < this.numWaves; i++) {
      const waveDelay = this.fadeInDelay + (i * this.waveStagger);
      const waveStart = waveDelay;
      const waveEnd = waveDelay + this.fadeInDuration;

      if (elapsed < waveStart) {
        this.waveOpacities[i] = 0.0;
        allComplete = false;
      } else if (elapsed < waveEnd) {
        const progress = (elapsed - waveStart) / this.fadeInDuration;
        this.waveOpacities[i] = this.cubicBezier(progress, 0.44, 0.17, 0.76, 0.47);
        allComplete = false;
      } else {
        this.waveOpacities[i] = 1.0;
      }
    }

    if (allComplete && !this.completionEventFired) {
      this.completionEventFired = true;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wave-animation-complete', {
          detail: { completionTime: currentTime }
        }));
      }
    }
  }

  render(timeMs) {
    if (!this.initialized || !this.device || !this.context) return;

    const timeSec = timeMs * 0.001;

    // Update fade-in
    this.updateFadeIn(timeMs);

    // Write uniform data
    // offset 0: time
    this.uniformData[0] = timeSec;
    // offset 1: padding (already 0)
    // offset 2-3: resolution (set in resize)
    // offset 4-6: waveColor (set in setColorMode)
    // offset 7: isMobile (set in updateMobileDetection)
    // offset 8-14: wave opacities
    for (let i = 0; i < this.numWaves; i++) {
      this.uniformData[8 + i] = this.waveOpacities[i];
    }

    try {
      this.device.queue.writeBuffer(this.uniformBuffer, 0, this.uniformData);

      // Validate texture before creating render pass
      let texture;
      try {
        texture = this.context.getCurrentTexture();
      } catch {
        // Texture unavailable — skip this frame
        this.animationFrameId = requestAnimationFrame(this.render.bind(this));
        return;
      }

      if (!texture || texture.width === 0 || texture.height === 0) {
        // Invalid texture dimensions — skip this frame
        this.animationFrameId = requestAnimationFrame(this.render.bind(this));
        return;
      }

      const textureView = texture.createView();

      const commandEncoder = this.device.createCommandEncoder();
      const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
          view: textureView,
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: 'clear',
          storeOp: 'store',
        }],
      });

      renderPass.setPipeline(this.pipeline);
      renderPass.setBindGroup(0, this.bindGroup);
      renderPass.draw(4);
      renderPass.end();

      this.device.queue.submit([commandEncoder.finish()]);
    } catch {
      // Device lost or context invalid — trigger fallback to Canvas 2D
      this.animationFrameId = null;
      if (this._onNeedsRecovery) {
        this._onNeedsRecovery();
      }
      return;
    }

    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  start() {
    if (this.animationFrameId !== null) {
      return;
    }
    if (!this.initialized) return;

    // Pause rendering when tab is hidden to avoid texture invalidation errors
    this._boundVisibilityHandler = () => {
      if (document.hidden) {
        if (this.animationFrameId !== null) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      } else {
        // Resume after a short delay to let the GPU context stabilize
        if (this.animationFrameId === null && this.initialized && !this.destroyed) {
          setTimeout(() => {
            if (!this.destroyed && this.initialized && this.animationFrameId === null) {
              this.animationFrameId = requestAnimationFrame(this.render.bind(this));
            }
          }, 100);
        }
      }
    };
    document.addEventListener('visibilitychange', this._boundVisibilityHandler);

    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  destroy() {
    this.destroyed = true;
    this._onNeedsRecovery = null;

    if (this._boundVisibilityHandler) {
      document.removeEventListener('visibilitychange', this._boundVisibilityHandler);
      this._boundVisibilityHandler = null;
    }

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.context) {
      try { this.context.unconfigure(); } catch { /* ignore */ }
      this.context = null;
    }

    if (this.uniformBuffer) {
      this.uniformBuffer.destroy();
      this.uniformBuffer = null;
    }

    if (this.device) {
      this.device.destroy();
      this.device = null;
    }

    this.initialized = false;
  }
}
