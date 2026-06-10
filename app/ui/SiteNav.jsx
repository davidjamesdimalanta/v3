"use client";

import React from "react";

import Link from "next/link";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import { useWaveCompleteAnimation } from "./hooks/useWaveCompleteAnimation";
import { useNavbarScrollFade } from "./hooks/useNavbarScrollFade";
import { useSoundEffects } from "./hooks/useSoundEffects";

export default function SiteNav() {
  // Phase 1: Initial fade-up after WebGL completes
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation();

  // Phase 2: Scroll-based fade
  const { navbarOpacity } = useNavbarScrollFade();

  // Sound effects
  const { playHover, playNavigateHome } = useSoundEffects();

  return (
    <nav
      id="nav"
      className="fixed top-0 left-0 right-0 z-50 py-[20px] px-4 md:px-5"
      style={{
        opacity: navbarOpacity,
        // transition: 'none' is intentional — the wave-driven entrance animation
        // handles initial nav reveal separately via useWaveCompleteAnimation.
        // A CSS transition here would conflict with the scroll-based opacity.
        transition: "none",
        pointerEvents: navbarOpacity === 0 ? "none" : "auto",
      }}
    >
      <div className="max-w-[1200px] w-full mx-auto flex justify-between items-center">
        <Link
          className={`text-h5 text-500 text-on-surface-variant ${getAnimationClass("nav-logo-name")}`}
          style={{
            ...getAnimationStyle("nav-logo-name"),
            fontFamily: "var(--aspekta), sans-serif",
          }}
          href="/"
          onMouseEnter={playHover}
          onClick={playNavigateHome}
        >
          <div
            className="flex gutter-sm items-center"
            style={{ color: "var(--schemes-on-surface)" }}
          >
            <svg
              width="30"
              height="24"
              viewBox="0 0 155 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="logo"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M0 0H17.1667V17.0265H0V0ZM17.1667 0H34.3333V17.0265H17.1667V0ZM34.3333 0H51.5V17.0265H34.3333V0ZM51.5 0H68.6667V17.0265H51.5V0ZM68.6667 0H85.8333V17.0265H68.6667V0ZM85.8333 0H103V17.0265H85.8333V0ZM0 17.0265H17.1667V34.0531H0V17.0265ZM85.8333 17.0265H103V34.0531H85.8333V17.0265ZM0 34.0531H17.1667V51.0796H0V34.0531ZM85.8333 34.0531H103V51.0796H85.8333V34.0531ZM103 34.0531H120.167V51.0796H103V34.0531ZM120.167 34.0531H137.333V51.0796H120.167V34.0531ZM137.333 34.0531H154.5V51.0796H137.333V51.0796ZM0 51.0796H17.1667V68.1061H0V51.0796ZM137.333 51.0796H154.5V68.1061H137.333V51.0796ZM0 68.1061H17.1667V85.1327H0V68.1061ZM137.333 68.1061H154.5V85.1327H137.333V68.1061ZM0 85.1327H17.1667L17.1667 102.159H0V85.1327ZM137.333 85.1327H154.5V102.159H137.333L137.333 85.1327ZM0 102.159H17.1667L17.1667 119.186H0V102.159ZM17.1667 102.159H34.3333L34.3333 119.186H17.1667L17.1667 102.159ZM34.3333 102.159H51.5L51.5 119.186H34.3333L34.3333 102.159ZM51.5 102.159H68.6667L68.6667 119.186H51.5L51.5 102.159ZM68.6667 102.159H85.8334L85.8333 119.186H68.6667L68.6667 102.159ZM85.8334 102.159H103L103 119.186H85.8333L85.8334 102.159ZM103 102.159H120.167L120.167 119.186H103L103 102.159ZM120.167 102.159H137.333L137.333 119.186H120.167L120.167 102.159ZM137.333 102.159H154.5V119.186H137.333L137.333 102.159Z"
                fill="currentColor"
              />
            </svg>
            <span className="hidden md:inline-flex text-h5 text-500 leading-none">
              David Dimalanta
            </span>
          </div>
        </Link>
        <div
          className={`flex flex-row gutter-xs md:gutter-sm items-center ${getAnimationClass("nav-logo-name")}`}
          style={getAnimationStyle("nav-logo-name")}
        >
          <Button
            text="About"
            href="/about"
            variant="ghost"
            soundEffect="navigateProject"
          />
          <Button
            text="CV"
            href="https://drive.google.com/file/d/1LcdDAdHLevMjm8qTPHausg9N1TRkvDBZ/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            soundEffect="hover"
          />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
