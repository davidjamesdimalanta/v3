"use client";

import Link from "next/link";
import { useSoundEffects } from "./ui/hooks/useSoundEffects";
import Button from "./ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/project/goable", label: "Goable" },
  { href: "/project/ihub", label: "iHub" },
  { href: "/project/socratic", label: "Socratic" },
];

export default function NotFound() {
  const { playHover, playNavigateHome } = useSoundEffects();

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden">
      {/* Darkroom background */}
      <div className="absolute inset-0 bg-(--figma-brown)/80 backdrop-blur-xl -z-10" />

      {/* Menu band — full-width strip like PS3 XMB */}
      <div className="w-full border-y border-[#A0A0A0]/30 bd py-12 px-[20px] md:px-[40px] flex flex-col items-start gutter-lg">

        {/* Label */}
        <span className="text-sm text-400 text-(--text-lightcolor-60) uppercase tracking-widest">
          404 — Page not found
        </span>

        {/* Links row */}
        <nav className="flex flex-col gutter-base">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-h4 text-300 text-(--text-lightcolor-80) opacity-60 hover:opacity-100 hover:bd-text transition-opacity duration-150"
              onMouseEnter={playHover}
              onClick={href === "/" ? playNavigateHome : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
