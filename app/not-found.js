"use client";

import Link from "next/link";
import { useSoundEffects } from "./ui/hooks/useSoundEffects";

export default function NotFound() {
  const { playHover, playNavigateHome } = useSoundEffects();

  return (
    <div className="ps3-404-container">
      {/* Background with 80% opacity overlay - covers entire viewport */}
      <div className="ps3-background" />
      {/* Main menu container with border */}
      <div className="ps3-menu">
        <div className="menu-items">
          <div className="text-h6 text-600">404: Page Not Found</div>
          <Link
            href="/"
            className="opacity-60 hover:opacity-100 transition-opacity duration-150 hover:bd-text"
            onMouseEnter={playHover}
          >
            <span className="text-p">Home</span>
          </Link>
          <Link
            href="/project/goable"
            className="opacity-60 hover:opacity-100 transition-opacity duration-150 hover:bd-text"
            onMouseEnter={playHover}
          >
            <span className="text-p text-[#bebebe]">Goable</span>
          </Link>
          <Link
            href="/project/ihub"
            className="opacity-60 hover:opacity-100 transition-opacity duration-150 hover:bd-text"
            onMouseEnter={playHover}
          >
            <span className="text-p text-[#bebebe]">iHub</span>
          </Link>
          <Link
            href="/project/socratic"
            className="opacity-60 hover:opacity-100 transition-opacity duration-150 hover:bd-text"
            onMouseEnter={playHover}
          >
            <span className="text-p text-[#bebebe]">Socratic</span>
          </Link>
        </div>
        
      </div>

      {/* Close link centered below menu */}
      <div className="p-2 flex justify-center">
        <Link
          href="/"
          className="text-p opacity-60 hover:opacity-100 transition-opacity duration-150 hover:bd-text"
          onMouseEnter={playHover}
          onClick={playNavigateHome}
        >
          × Close
        </Link>
      </div>
    </div>
  );
}
