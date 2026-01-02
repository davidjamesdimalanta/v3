/*******************************
* WEBGL WAVE RENDERER CLASS *
*******************************/

export class WaveRenderer {
  constructor(canvas, initialMode = 'design') {
    this.canvas = canvas;
    this.context = null;
    this.animationFrameId = null;
    this.currentMode = initialMode;

    // Animation state
    this.fadeInStartTime = null;
    this.fadeInDelay = 500;
    this.fadeInDuration = 1500;
    this.waveStagger = 250;
    this.numWaves = 7;
    this.waveOpacities = new Array(this.numWaves).fill(0.0);
    this.completionEventFired = false;

    // WebGL resources
    this.shaderProgram = null;
    this.timeUniformLocation = null;
    this.resolutionUniformLocation = null;
    this.waveColorUniformLocation = null;
    this.waveOpacityUniformLocation = null;

    // Wave color modes
    this.figGreen = { r: 0.067, g: 0.682, b: 0.361 };
    this.figBlue = { r: 0.043, g: 0.600, b: 1.000 };

    // Initialize WebGL
    this.initWebGL();
  }

  initWebGL() {
    // Get WebGL context
    this.context = this.canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false
    });

    if (!this.context) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader (passthrough)
    const vertexShaderSource = `
attribute vec2 aVertexPosition;
void main() {
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
`;

    // Fragment shader (wave effect)
    const fragmentShaderSource = `
precision highp float;

// Elapsed time in seconds.
uniform float uTime;
// Viewport resolution.
uniform vec2  uResolution;
// Wave color.
uniform vec3  uWaveColor;
// Wave opacities for each wave.
uniform float uWaveOpacity0;
uniform float uWaveOpacity1;
uniform float uWaveOpacity2;
uniform float uWaveOpacity3;
uniform float uWaveOpacity4;
uniform float uWaveOpacity5;
uniform float uWaveOpacity6;

const float waveWidthFactor = 1.5;

vec3 calcSine(
	vec2 uv,
	float speed,
	float frequency,
	float amplitude,
	float phaseShift,
	float verticalOffset,
	vec3 baseColor,
	float lineWidth,
	float sharpness,
	bool invertFalloff,
	float opacity
) {

	// Compute wave position.
	float angle = uTime * speed * frequency * -1.0 + (phaseShift + uv.x) * 2.0;
	float waveY = sin(angle) * amplitude + verticalOffset;
	float deltaY = waveY - uv.y;
	float distanceVal  = distance(waveY , uv.y);

	// Amplify falloff on one side.
	if (invertFalloff) {
		if (deltaY > 0.0) {
			distanceVal = distanceVal * 4.0;
		}
	} else {
		if (deltaY < 0.0) {
			distanceVal = distanceVal * 4.0;
		}
	}

	float smoothVal = smoothstep(lineWidth * waveWidthFactor, 0.0, distanceVal);
	float scaleVal  = pow(smoothVal, sharpness);

	return min(baseColor * scaleVal * opacity, baseColor * opacity);
}

void main() {
	// Normalize fragment coords.
	vec2 uv = gl_FragCoord.xy / uResolution;

	// Accumulate wave colors with individual opacities.
	vec3 accumulatedColor = vec3(0.0);
	accumulatedColor += calcSine(uv, 0.2, 0.20, 0.2, 0.0, 0.5, uWaveColor, 0.1, 15.0, false, uWaveOpacity0);
	accumulatedColor += calcSine(uv, 0.4, 0.40, 0.15, 0.0, 0.5, uWaveColor, 0.1, 17.0, false, uWaveOpacity1);
	accumulatedColor += calcSine(uv, 0.3, 0.60, 0.15, 0.0, 0.5, uWaveColor, 0.05, 23.0, false, uWaveOpacity2);
	accumulatedColor += calcSine(uv, 0.1, 0.26, 0.07, 0.0, 0.3, uWaveColor, 0.1, 17.0, true, uWaveOpacity3);
	accumulatedColor += calcSine(uv, 0.3, 0.36, 0.07, 0.0, 0.3, uWaveColor, 0.1, 17.0, true, uWaveOpacity4);
	accumulatedColor += calcSine(uv, 0.5, 0.46, 0.07, 0.0, 0.3, uWaveColor, 0.05, 23.0, true, uWaveOpacity5);
	accumulatedColor += calcSine(uv, 0.2, 0.58, 0.05, 0.0, 0.3, uWaveColor, 0.2, 15.0, true, uWaveOpacity6);

	// Determine mask from max channel.
	float maxChannel = accumulatedColor.r;

	if (accumulatedColor.g > maxChannel) {
		maxChannel = accumulatedColor.g;
	}

	if (accumulatedColor.b > maxChannel) {
		maxChannel = accumulatedColor.b;
	}

	// Discard if no wave.
	if (maxChannel <= 0.0) {
		discard;
	}

	// Output final color.
	gl_FragColor = vec4(accumulatedColor, 1.0);
}
`;

    // Compile shaders
    const vs = this.compileShader(vertexShaderSource, this.context.VERTEX_SHADER);
    const fs = this.compileShader(fragmentShaderSource, this.context.FRAGMENT_SHADER);

    if (!vs || !fs) {
      return;
    }

    // Create and link program
    this.shaderProgram = this.context.createProgram();
    this.context.attachShader(this.shaderProgram, vs);
    this.context.attachShader(this.shaderProgram, fs);
    this.context.linkProgram(this.shaderProgram);

    if (!this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS)) {
      console.error('Link error:', this.context.getProgramInfoLog(this.shaderProgram));
      return;
    }

    this.context.useProgram(this.shaderProgram);

    // Get attribute/uniform locations
    const posLoc = this.context.getAttribLocation(this.shaderProgram, 'aVertexPosition');

    this.timeUniformLocation = this.context.getUniformLocation(this.shaderProgram, 'uTime');
    this.resolutionUniformLocation = this.context.getUniformLocation(this.shaderProgram, 'uResolution');
    this.waveColorUniformLocation = this.context.getUniformLocation(this.shaderProgram, 'uWaveColor');

    // Get uniform locations for each wave's opacity
    this.waveOpacityUniformLocation = [
      this.context.getUniformLocation(this.shaderProgram, 'uWaveOpacity0'),
      this.context.getUniformLocation(this.shaderProgram, 'uWaveOpacity1'),
      this.context.getUniformLocation(this.shaderProgram, 'uWaveOpacity2'),
      this.context.getUniformLocation(this.shaderProgram, 'uWaveOpacity3'),
      this.context.getUniformLocation(this.shaderProgram, 'uWaveOpacity4'),
      this.context.getUniformLocation(this.shaderProgram, 'uWaveOpacity5'),
      this.context.getUniformLocation(this.shaderProgram, 'uWaveOpacity6')
    ];

    // Full-screen quad buffer
    const buffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);

    const verts = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]);

    this.context.bufferData(this.context.ARRAY_BUFFER, verts, this.context.STATIC_DRAW);
    this.context.enableVertexAttribArray(posLoc);
    this.context.vertexAttribPointer(posLoc, 2, this.context.FLOAT, false, 0, 0);

    // Enable alpha blending for wave opacity
    this.context.enable(this.context.BLEND);
    this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE_MINUS_SRC_ALPHA);

    // Set dark mode background color
    this.setDarkModeBackground();

    // Set initial wave color mode
    this.setColorMode(this.currentMode);

    // Resize canvas to match window
    this.resize();
  }

  compileShader(source, type) {
    const shader = this.context.createShader(type);
    this.context.shaderSource(shader, source);
    this.context.compileShader(shader);

    if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
      console.error('Shader error:', this.context.getShaderInfoLog(shader));
      this.context.deleteShader(shader);
      return null;
    }

    return shader;
  }

  sRGBToLinear(value) {
    if (value <= 0.04045) {
      return value / 12.92;
    }
    return Math.pow((value + 0.055) / 1.055, 2.4);
  }

  setDarkModeBackground() {
    // CSS: rgb(0, 0, 0) -> normalized sRGB -> linear RGB
    const darkR = this.sRGBToLinear(0 / 255);
    const darkG = this.sRGBToLinear(0 / 255);
    const darkB = this.sRGBToLinear(0 / 255);
    this.context.clearColor(darkR, darkG, darkB, 0.0);
  }

  setColorMode(mode) {
    this.currentMode = mode;
    const color = mode === 'dev' ? this.figGreen : this.figBlue;
    this.context.uniform3f(this.waveColorUniformLocation, color.r, color.g, color.b);
  }

  cubicBezier(t, p1x, p1y, p2x, p2y) {
    // Simplified cubic bezier for ease curve (0.58, 0.19, 0.62, 0.99)
    const cx = 3.0 * p1x;
    const bx = 3.0 * (p2x - p1x) - cx;
    const ax = 1.0 - cx - bx;

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

    // Calculate opacity for each wave with stagger
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

    // Dispatch completion event when all waves are fully visible
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
    if (!this.context) return;

    this.context.clear(this.context.COLOR_BUFFER_BIT);

    const timeSec = timeMs * 0.001;

    // Update fade-in animation
    this.updateFadeIn(timeMs);

    this.context.uniform1f(this.timeUniformLocation, timeSec);
    this.context.uniform2f(this.resolutionUniformLocation, this.canvas.width, this.canvas.height);

    // Set individual wave opacities
    for (let i = 0; i < this.numWaves; i++) {
      this.context.uniform1f(this.waveOpacityUniformLocation[i], this.waveOpacities[i]);
    }

    this.context.drawArrays(this.context.TRIANGLE_STRIP, 0, 4);

    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  resize() {
    if (!this.canvas || !this.context) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  start() {
    if (this.animationFrameId !== null) {
      return; // Already running
    }
    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  destroy() {
    // Cancel animation frame
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Delete WebGL resources
    if (this.context && this.shaderProgram) {
      this.context.deleteProgram(this.shaderProgram);
      this.shaderProgram = null;
    }

    // Lose context
    if (this.context) {
      const loseContext = this.context.getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }
      this.context = null;
    }
  }
}
