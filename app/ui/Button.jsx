"use client";

import Link from "next/link";
import { useSoundEffects } from "./hooks/useSoundEffects";

export default function Button({ text, href, className = "", target, rel, soundEffect, ...props }) {
  // Sound effects (opt-in via soundEffect prop)
  const { playButtonHover, playNavigateHome, playNavigateProject } = useSoundEffects();
  const baseStyles = "px-4 md:px-6 py-3 rounded-full cursor-pointer inline-block text-center";
  const variantStyles = "bd text-small text-400 hover:bd-text hover:bd-active transition-all duration-150";

  // Conditional event handlers based on soundEffect prop
  const eventHandlers = {};

  if (soundEffect) {
    // Buttons use the Cancel sound (03 SFX Cancel.mp3)
    eventHandlers.onMouseEnter = playButtonHover;

    if (soundEffect === 'navigateHome') {
      eventHandlers.onClick = playNavigateHome;
    } else if (soundEffect === 'navigateProject') {
      eventHandlers.onClick = playNavigateProject;
    }
  }

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        target={target}
        rel={rel}
        {...eventHandlers}
        {...props}
      >
        {text}
      </Link>
    );
  }

  // Otherwise, render as a button
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...eventHandlers}
      {...props}
    >
      {text}
    </button>
  );
}
