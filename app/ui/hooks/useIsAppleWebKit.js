'use client';

import { useSyncExternalStore } from 'react';

/**
 * Detects Apple's WebKit engine: desktop Safari plus every iOS browser
 * (Chrome/Firefox on iOS run WebKit under the hood and share Safari's
 * transition engine). Used to branch page transitions off the View
 * Transitions API, which janks and can drop the live WebGL context on Safari.
 *
 * `navigator.vendor` is "Apple Computer, Inc." on WebKit and empty or
 * "Google Inc." on Chromium, so this cleanly excludes Chrome/Edge/Firefox.
 *
 * Implemented with `useSyncExternalStore` so it returns `false` during SSR
 * (the server snapshot) and the real value on the client without a
 * hydration mismatch. Page transitions only fire on navigation — always
 * post-hydration — so the branch is settled before any transition runs.
 *
 * @returns {boolean} true when running in Apple WebKit
 */

// The result never changes for the life of the page, so subscribe is a no-op.
const subscribe = () => () => {};
const getSnapshot = () => (navigator.vendor || '').includes('Apple');
const getServerSnapshot = () => false;

export function useIsAppleWebKit() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
