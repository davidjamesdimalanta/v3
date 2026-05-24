"use client";

import Link from "next/link";
import { useSoundEffects } from "./hooks/useSoundEffects";

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.7407 0.740723L0.740723 10.7407M0.740723 0.740723L10.7407 10.7407" stroke="currentColor" strokeWidth="1.48148" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Button({
  text,
  icon,
  href,
  className = "",
  target,
  rel,
  soundEffect,
  variant = "glass",
  size = "md",
  ...props
}) {
  // Sound effects (opt-in via soundEffect prop)
  const { playButtonHover, playNavigateHome, playNavigateProject } = useSoundEffects();

  const isIconOnly = icon && !text;

  // Ghost / primary variants delegate sizing + styling to the Figma DS
  // btn-* utilities defined in globals.css, so the visual matches the
  // material-theme components 1:1 (states, padding, radius, type).
  const isDsVariant = variant === "ghost" || variant === "primary";

  let baseStyles;
  let variantStyles;

  if (isIconOnly) {
    baseStyles = "flex items-center justify-center w-8 h-8 rounded-full cursor-pointer";
    variantStyles = "bd text-button text-400 text-(--text-color-100) hover:bd-text hover:bd-active hover-surface";
  } else if (isDsVariant) {
    const sizeUtility = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md";
    const variantUtility = variant === "primary" ? "btn-primary" : "btn-ghost";
    baseStyles = `btn-base ${sizeUtility}`;
    variantStyles = `${variantUtility} hover-surface`;
  } else {
    baseStyles = "px-4 md:px-6 py-3 rounded-full cursor-pointer inline-block text-center uppercase";
    variantStyles = "bd text-button text-400 text-(--text-color-100) hover:bd-text hover:bd-active hover-surface";
  }

  const iconElement = icon === 'close' ? <CloseIcon /> : null;
  const content = isIconOnly ? iconElement : text;

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

  // If href is provided, determine whether to use Link or anchor tag
  if (href) {
    // Use regular anchor tag for external URLs, downloads, or when target="_blank"
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || target === '_blank';

    if (isExternal) {
      return (
        <a
          href={href}
          className={`${baseStyles} ${variantStyles} ${className}`}
          target={target}
          rel={rel}
          {...eventHandlers}
          {...props}
        >
          {content}
        </a>
      );
    }

    // Use Next.js Link for internal navigation
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...eventHandlers}
        {...props}
      >
        {content}
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
      {content}
    </button>
  );
}
