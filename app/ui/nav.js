"use client";

import React from "react";
import Link from "next/link";
import { useWaveCompleteAnimation } from "./hooks/useWaveCompleteAnimation";
import { useNavbarScrollFade } from "./hooks/useNavbarScrollFade";


export default function Nav() {
  // Phase 1: Initial fade-up after WebGL completes
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation();

  // Phase 2: Scroll-based fade
  const { navbarOpacity } = useNavbarScrollFade();

  return (
    <nav
      id="nav"
      className="fixed top-0 left-0 right-0 z-50 py-[20px] px-[12px] md:px-[20px] flex justify-between w-full"
      style={{ opacity: navbarOpacity, transition: 'none' }}
    >
        <Link
        className={`text-medium text-600 ${getAnimationClass('nav-logo-name')}`}
        style={getAnimationStyle('nav-logo-name')}
        href="/">
          <div className="flex gutter-xs hover:cursor-pointer items-center">
          <img
            src="/assets/icon/shiny-logo.png"
            alt="logo"
            width={30}
            height={24}
            style={{ objectFit: 'contain' }}
          />
          <span className="hidden md:block">David Dimalanta</span>
          </div>

        </Link>
    </nav>
  );
}

