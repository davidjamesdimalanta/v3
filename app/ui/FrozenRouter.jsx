'use client';

import { useContext, useState } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Holds the *outgoing* route's layout-router context frozen for one render so
 * its DOM survives long enough to play an AnimatePresence `exit` animation.
 * Without this, the App Router swaps the route subtree immediately and exit
 * (dismount) animations never get a chance to run.
 *
 * Each AnimatePresence child (keyed by pathname) gets its own FrozenRouter
 * instance, which captures the router context at first render via `useRef`.
 * The exiting instance keeps rendering the old route while the entering one
 * renders the new route.
 *
 * Resilience: this depends on a Next.js internal (LayoutRouterContext). If the
 * context value is ever missing (e.g. rendered outside the App Router tree),
 * we render children unchanged, degrading to enter-only rather than crashing.
 * A change to the internal import path would surface as a build error on the
 * PREVIEW deploy — before it could ever reach production — which is exactly
 * why this path is preview-gated.
 *
 * Scope: only mounted on the Apple-WebKit + preview branch of PageTransition.
 */
export default function FrozenRouter({ children }) {
  const context = useContext(LayoutRouterContext);
  // Freeze the context captured at this instance's first render. The exiting
  // AnimatePresence child keeps the old route; the entering one gets the new.
  const [frozen] = useState(context);

  if (!frozen) return children;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
