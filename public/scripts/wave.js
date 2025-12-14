
/*******************************
* XMB WAVE BACKGROUND BEHAVIOR *
*******************************/

const body = document.body;

// Get canvas element and WebGL context.
const canvas = document.getElementById("webgl-canvas");
const context = canvas.getContext("webgl", {
	alpha: true,
	premultipliedAlpha: false
});

if (!context) {
	console.error("WebGL not supported");
}

let shaderProgram;
let timeUniformLocation;
let resolutionUniformLocation;
let waveColorUniformLocation;
let waveOpacityUniformLocation;

// Wave color modes.
const figGreen = { r: 0.067, g: 0.682, b: 0.361 };
const figBlue = { r: 0.043, g: 0.600, b: 1.000 };

// Current mode: "dev" (green) or "design" (blue).
let currentMode = "design"; // Default to blue.

// Fade-in animation.
let fadeInStartTime = null;
const fadeInDelay = 500; // 500ms delay before starting first wave
const fadeInDuration = 1500; // 2000ms duration for each wave
const waveStagger = 250; // 150ms stagger delay between each wave (customizable)
const numWaves = 7;
let waveOpacities = new Array(numWaves).fill(0.0);

// Resize canvas to match window.
function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Vertex shader (passthrough).
const vertexShaderSource = `
attribute vec2 aVertexPosition;
void main() {
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
`;

// Fragment shader (wave effect).
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

// Compile shader and log errors.
function compileShader(source, type) {
	const shader = context.createShader(type);
	context.shaderSource(shader, source);
	context.compileShader(shader);

	if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
		console.error("Shader error:", context.getShaderInfoLog(shader));
		context.deleteShader(shader);

		return null;
	}

	return shader;
}

// Setup shaders, buffers, and start render loop.
function initializeWebGL() {
	const vs = compileShader(vertexShaderSource, context.VERTEX_SHADER);
	const fs = compileShader(fragmentShaderSource, context.FRAGMENT_SHADER);

	shaderProgram = context.createProgram();
	context.attachShader(shaderProgram, vs);
	context.attachShader(shaderProgram, fs);
	context.linkProgram(shaderProgram);

	if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
		console.error("Link error:", context.getProgramInfoLog(shaderProgram));
	}

	context.useProgram(shaderProgram);

	// Get attribute/uniform locations.
	const posLoc = context.getAttribLocation(shaderProgram, "aVertexPosition");

	timeUniformLocation = context.getUniformLocation(shaderProgram, "uTime");
	resolutionUniformLocation = context.getUniformLocation(shaderProgram, "uResolution");
	waveColorUniformLocation = context.getUniformLocation(shaderProgram, "uWaveColor");

	// Get uniform locations for each wave's opacity.
	waveOpacityUniformLocation = [
		context.getUniformLocation(shaderProgram, "uWaveOpacity0"),
		context.getUniformLocation(shaderProgram, "uWaveOpacity1"),
		context.getUniformLocation(shaderProgram, "uWaveOpacity2"),
		context.getUniformLocation(shaderProgram, "uWaveOpacity3"),
		context.getUniformLocation(shaderProgram, "uWaveOpacity4"),
		context.getUniformLocation(shaderProgram, "uWaveOpacity5"),
		context.getUniformLocation(shaderProgram, "uWaveOpacity6")
	];

	// Full-screen quad buffer.
	const buffer = context.createBuffer();
	context.bindBuffer(context.ARRAY_BUFFER, buffer);

	const verts = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]);

	context.bufferData(context.ARRAY_BUFFER, verts, context.STATIC_DRAW);
	context.enableVertexAttribArray(posLoc);
	context.vertexAttribPointer(posLoc, 2, context.FLOAT, false, 0, 0);

	// Enable alpha blending for wave opacity.
	context.enable(context.BLEND);
	context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);

	// Set dark mode background color.
	setDarkModeBackground();

	// Set initial wave color mode.
	setWaveColorMode(currentMode);

	requestAnimationFrame(renderFrame);
}

initializeWebGL();

// Convert sRGB to linear RGB for WebGL color space.
function sRGBToLinear(value) {
	if (value <= 0.04045) {
		return value / 12.92;
	}
	return Math.pow((value + 0.055) / 1.055, 2.4);
}

// Set dark mode background color.
function setDarkModeBackground() {
	// CSS: rgb(18, 19, 18) -> normalized sRGB -> linear RGB
	const darkR = sRGBToLinear(18 / 255);
	const darkG = sRGBToLinear(19 / 255);
	const darkB = sRGBToLinear(18 / 255);
	context.clearColor(darkR, darkG, darkB, 1.0);
}

// Set wave color based on mode.
function setWaveColorMode(mode) {
	currentMode = mode;
	const color = mode === "dev" ? figGreen : figBlue;
	context.uniform3f(waveColorUniformLocation, color.r, color.g, color.b);
}

// Cubic bezier easing function.
function cubicBezier(t, p1x, p1y, p2x, p2y) {
	// Simplified cubic bezier for ease curve (0.58, 0.19, 0.62, 0.99)
	// Using approximation for smoother animation
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

// Update wave opacities for staggered fade-in animation.
function updateFadeIn(currentTime) {
	if (fadeInStartTime === null) {
		fadeInStartTime = currentTime;
	}

	const elapsed = currentTime - fadeInStartTime;

	// Calculate opacity for each wave with stagger.
	for (let i = 0; i < numWaves; i++) {
		const waveDelay = fadeInDelay + (i * waveStagger);
		const waveStart = waveDelay;
		const waveEnd = waveDelay + fadeInDuration;

		if (elapsed < waveStart) {
			waveOpacities[i] = 0.0;
		} else if (elapsed < waveEnd) {
			const progress = (elapsed - waveStart) / fadeInDuration;
			waveOpacities[i] = cubicBezier(progress, 0.44, 0.17, 0.76, 0.47);
		} else {
			waveOpacities[i] = 1.0;
		}
	}
}

// Draw each animation frame.
function renderFrame(timeMs) {
	context.clear(context.COLOR_BUFFER_BIT);

	const timeSec = timeMs * 0.001;

	// Update fade-in animation.
	updateFadeIn(timeMs);

	context.uniform1f(timeUniformLocation, timeSec);
	context.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

	// Set individual wave opacities.
	for (let i = 0; i < numWaves; i++) {
		context.uniform1f(waveOpacityUniformLocation[i], waveOpacities[i]);
	}

	context.drawArrays(context.TRIANGLE_STRIP, 0, 4);

	requestAnimationFrame(renderFrame);
}
