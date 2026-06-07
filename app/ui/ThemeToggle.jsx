"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { useSoundEffects } from "./hooks/useSoundEffects";

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 2.25v2.5M12 19.25v2.5M21.75 12h-2.5M4.75 12h-2.5M18.9 5.1l-1.77 1.77M6.87 17.13L5.1 18.9M18.9 18.9l-1.77-1.77M6.87 6.87L5.1 5.1"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M20.5 13.4A8.25 8.25 0 0 1 10.6 3.5a8.25 8.25 0 1 0 9.9 9.9Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const subscribeMounted = (onStoreChange) => {
  const frame = window.requestAnimationFrame(onStoreChange);
  return () => window.cancelAnimationFrame(frame);
};
const getMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

/**
 * Light/dark mode pill switch for the navbar.
 *
 * Drives next-themes (data-theme on <html>); the whole site re-themes via the
 * --schemes-* token layer. Checked = dark. Uses resolvedTheme so that when the
 * user is on "system" the knob still reflects the actual rendered theme.
 *
 * A mounted guard prevents a hydration mismatch (the server can't know the
 * resolved theme) — we render a same-size, inert placeholder until mounted so
 * the nav row never shifts.
 */
export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { playButtonHover } = useSoundEffects();
  const shouldReduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getServerMountedSnapshot
  );

  const isDark = resolvedTheme === "dark";

  // Pre-mount placeholder: same footprint, no interactivity, no icon flash.
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`h-8 w-[52px] rounded-full bd ${className}`}
      />
    );
  }

  const activeTheme = isDark ? "dark" : "light";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      onMouseEnter={playButtonHover}
      className={`group relative flex h-8 w-[52px] shrink-0 cursor-pointer items-center rounded-full bd text-(--text-color-100) hover:bd-active hover:bd-text hover-surface ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-between px-[3px]">
        <AnimatedBackground
          defaultValue={activeTheme}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full bg-(--schemes-surface-container-highest) shadow-[0_0_4px_1px_rgba(155,144,122,0.4)]"
        >
          <span
            data-id="light"
            className="h-6 w-6 items-center justify-center rounded-full text-(--text-color-100) transition-opacity duration-150 motion-reduce:transition-none data-[checked=false]:opacity-40"
          >
            <SunIcon />
          </span>
          <span
            data-id="dark"
            className="h-6 w-6 items-center justify-center rounded-full text-(--text-color-100) transition-opacity duration-150 motion-reduce:transition-none data-[checked=false]:opacity-40"
          >
            <MoonIcon />
          </span>
        </AnimatedBackground>
      </span>
    </button>
  );
}
