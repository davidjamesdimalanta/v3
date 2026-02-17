"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useWaveCompleteAnimation } from "./hooks/useWaveCompleteAnimation";
import { useNavbarScrollFade } from "./hooks/useNavbarScrollFade";
import { useSoundEffects } from "./hooks/useSoundEffects";


export default function Nav() {
  // Phase 1: Initial fade-up after WebGL completes
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation();

  // Phase 2: Scroll-based fade
  const { navbarOpacity } = useNavbarScrollFade();

  // Sound effects
  const { playHover, playNavigateHome } = useSoundEffects();

  return (
    <nav
      id="nav"
      className="fixed top-0 left-0 right-0 z-50 py-[20px] px-4 md:px-8 flex justify-between items-center w-full"
      style={{
        opacity: navbarOpacity,
        transition: 'none',
        pointerEvents: navbarOpacity === 0 ? 'none' : 'auto'
      }}
    >
        <Link
        className={`text-h5 text-500 ${getAnimationClass('nav-logo-name')}`}
        style={{
          ...getAnimationStyle('nav-logo-name'),
          fontFamily: 'var(--aspekta), sans-serif'
        }}
        href="/"
        onMouseEnter={playHover}
        onClick={playNavigateHome}>
          <div className="flex gutter-sm items-center">
          <Image
            src="/assets/icon/New_Logo.png"
            alt="logo"
            width={30}
            height={24}
            style={{ objectFit: 'contain' }}
          />
          <span className="hidden md:block">David Dimalanta</span>
          </div>

        </Link>
        <div
          className={`flex flex-row gap-4 items-center ${getAnimationClass('nav-logo-name')}`}
          style={getAnimationStyle('nav-logo-name')}
        >
          <Button
            text={"Contact"}
            href="mailto:david.dimalanta@mail.utoronto.ca"
            soundEffect="hover"
          />
          <Button
            text={"CV"}
            href="https://drive.google.com/file/d/1LcdDAdHLevMjm8qTPHausg9N1TRkvDBZ/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            soundEffect="hover"
          />
        </div>
    </nav>
  );
}

