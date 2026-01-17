/**
 * Animation State Manager Singleton
 * Tracks animation completion state across component lifecycles
 *
 * This singleton pattern ensures animation state persists even when
 * components unmount/remount during navigation. Similar to audioManager,
 * it maintains global state for the entire application lifetime.
 *
 * Benefits:
 * - Animations only play once on initial page load
 * - State survives component unmount/remount cycles
 * - No dependencies on Context, localStorage, or sessionStorage
 * - Zero performance overhead
 */

class AnimationStateManager {
  constructor() {
    // Track which animations have completed
    this.completedAnimations = new Set();

    // Track if this is the initial page load
    this.isInitialLoad = true;

    // Listen for WebGL wave completion event (fired once)
    if (typeof window !== 'undefined') {
      window.addEventListener('wave-animation-complete', () => {
        this.markAnimationComplete('wave');
      });
    }
  }

  /**
   * Mark an animation as completed
   * @param {string} animationId - Unique identifier for the animation
   */
  markAnimationComplete(animationId) {
    this.completedAnimations.add(animationId);
  }

  /**
   * Check if an animation has already completed
   * @param {string} animationId - Unique identifier for the animation
   * @returns {boolean} - True if animation has completed
   */
  hasAnimationCompleted(animationId) {
    return this.completedAnimations.has(animationId);
  }

  /**
   * Check if this is the initial page load
   * @returns {boolean} - True if initial load
   */
  getIsInitialLoad() {
    return this.isInitialLoad;
  }

  /**
   * Mark initial load as complete
   * Should be called after first wave animation completes
   */
  setInitialLoadComplete() {
    this.isInitialLoad = false;
  }

  /**
   * Reset all animation states (useful for testing)
   */
  reset() {
    this.completedAnimations.clear();
    this.isInitialLoad = true;
  }
}

// Export singleton instance - shared across entire application
export const animationStateManager = new AnimationStateManager();
