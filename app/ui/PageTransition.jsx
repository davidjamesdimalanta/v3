'use client';

import { ViewTransition } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ANIMATION_CONFIG } from './lib/animation-config';
import { useIsAppleWebKit } from './hooks/useIsAppleWebKit';
import FrozenRouter from './FrozenRouter';

/**
 * Browser-aware page enter/exit transitions.
 *
 *   • Chromium/Firefox (any environment)   → React's <ViewTransition> (default)
 *   • Apple WebKit (Safari + iOS)          → Framer Motion fallback
 *
 * The Framer Motion path exists because Safari's View Transitions are janky
 * and can drop the live WebGL <WaveBackground> context when it gets recaptured
 * during the root crossfade. On the FM path the background is never snapshotted.
 *
 * ⚠️ TWO PATHS, ONE LOOK: the VT keyframes (.page-transition in app/globals.css)
 * and the Framer Motion `pageVariants` below MUST stay visually in sync — both
 * read their timings from ANIMATION_CONFIG.transitions. See ANIMATIONS.md before
 * touching either.
 */

// Validated on preview, now enabled in all environments. Apple WebKit always
// takes the Framer Motion path; Chromium/Firefox always take View Transitions.
// Flip to `false` to fully revert to View Transitions everywhere.
const HYBRID_ENABLED = true;

const T = ANIMATION_CONFIG.transitions;
// Mirrors the cubic-bezier used by the .page-transition keyframes.
const EASE = [0.25, 0.1, 0.25, 1];

// Framer Motion variants that mirror the .page-transition keyframes so Safari
// looks identical to the Chromium View Transitions path.
const pageVariants = {
  hidden: { opacity: 0, y: T.enterTranslateY, filter: `blur(${T.blur}px)` },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: T.enterDuration / 1000, ease: EASE },
    // Drop the filter once settled so we don't keep a compositing layer alive.
    transitionEnd: { filter: 'none' },
  },
  exit: {
    opacity: 0,
    y: T.exitTranslateY,
    filter: `blur(${T.blur}px)`,
    transition: { duration: T.exitDuration / 1000, ease: EASE },
  },
};

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const isAppleWebKit = useIsAppleWebKit();
  const prefersReducedMotion = useReducedMotion();

  // Chromium/Firefox (any environment) → View Transitions.
  if (!HYBRID_ENABLED || !isAppleWebKit) {
    return (
      <ViewTransition
        key={pathname}
        default="page-transition"
        enter="page-transition"
        exit="page-transition"
      >
        {children}
      </ViewTransition>
    );
  }

  // Apple WebKit (Safari + iOS) → Framer Motion enter + exit.
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? false : 'hidden'}
        animate="visible"
        exit={prefersReducedMotion ? undefined : 'exit'}
        variants={pageVariants}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
