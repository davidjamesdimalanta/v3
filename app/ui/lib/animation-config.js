/**
 * Centralized animation configuration
 * Single source of truth for all animation timings and easing
 */

export const ANIMATION_CONFIG = {
  // WebGL wave animation timing (reference)
  webgl: {
    delay: 500,
    duration: 1500,
    waveStagger: 250,
    numWaves: 7,
    totalDuration: 3500, // 500 + (6 * 250) + 1500
  },

  // Landing page element fade-up animations
  landing: {
    // Wait for WebGL to complete before starting
    startDelay: 3500,

    // Element-specific configuration
    elements: [
      {
        id: 'nav-logo-name',
        delay: 0,           // Navbar starts immediately after WebGL
        duration: 400,
      },
      {
        id: 'bottom-bar-currently',
        delay: 100,         // Bottom bar group starts 100ms after navbar
        duration: 400,
      },
      {
        id: 'bottom-bar-button',
        delay: 100,         // Same time as Currently
        duration: 400,
      },
    ],

    // Default animation properties
    defaultDuration: 400,
    defaultStagger: 100,
    defaultEasing: 'cubic-bezier(0.44, 0.17, 0.76, 0.47)',

    // Transform values
    initialTransform: 'translateY(1rem)', // 16px
    finalTransform: 'translateY(0)',
  },
};

/**
 * Get total delay for a specific element
 * @param {string} elementId - Element identifier
 * @param {number} baseDelay - Additional base delay (default: 0)
 * @returns {number} Total delay in milliseconds
 */
export const getElementDelay = (elementId, baseDelay = 0) => {
  const element = ANIMATION_CONFIG.landing.elements.find(el => el.id === elementId);
  if (!element) return baseDelay;

  return ANIMATION_CONFIG.landing.startDelay + element.delay + baseDelay;
};

/**
 * Get duration for a specific element
 * @param {string} elementId - Element identifier
 * @returns {number} Duration in milliseconds
 */
export const getElementDuration = (elementId) => {
  const element = ANIMATION_CONFIG.landing.elements.find(el => el.id === elementId);
  return element?.duration || ANIMATION_CONFIG.landing.defaultDuration;
};

/**
 * Calculate total animation time for landing page
 * @returns {number} Total time in milliseconds
 */
export const getTotalAnimationTime = () => {
  const landing = ANIMATION_CONFIG.landing;
  const lastElement = landing.elements[landing.elements.length - 1];
  return landing.startDelay + lastElement.delay + lastElement.duration;
};
