"use client"

import Link from "next/link";
import { useSoundEffects } from "../ui/hooks/useSoundEffects";

export default function Closing() {
  const { playButtonHover } = useSoundEffects();

  return (
    <div id="closing" className="relative flex flex-col w-full h-hug justify-between md:pb-0">
        {/* Currently Up to and Contact*/}
        <div className="flex flex-col md:flex-row md:justify-between gutter-sm md:gutter-md">
            <div
              className="w-hug flex-2 flex flex-col md:flex-row gutter-sm *:text-sm"
            >
                <div className="flex flex-col">
                    <span className="text-[var(--text-color-60)] uppercase tracking-wide">Currently: </span>
                    <div>
                        <Link href={"https://ischool.utoronto.ca/master-of-information/"} target="_blank" rel="noopener" className="hover:bd-text transition-all duration-150" onMouseEnter={playButtonHover}>
                            <span className="md:hidden text-p">MI @ UofT </span>
                            <span className="hidden md:inline text-p">MI Candidate @ UofT iSchool </span>
                        </Link>
                        <span className="text-p">, </span>
                        <Link href={"https://blogs.studentlife.utoronto.ca/innovationhub/"} target="_blank" rel="noopener" className="hover:bd-text transition-all duration-150" onMouseEnter={playButtonHover}>
                            <span className="md:hidden inline-block text-p">UX/UI @ iHub</span>
                            <span className="hidden md:inline-block text-p">UX/UI @ Innovation Hub</span>
                        </Link>
                        <span className="text-p">, &</span>
                        <span className="text-p text-600"> looking for a 2026 summer co-op!</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
