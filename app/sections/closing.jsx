"use client"

import Link from "next/link";
import Button from "../ui/Button";
import { useWaveCompleteAnimation } from "../ui/hooks/useWaveCompleteAnimation";

export default function Closing() {
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation({
    playOnlyOnInitialLoad: true
  });
  return (
    <div id="closing" className="relative flex flex-col w-full h-hug justify-between pt-4 md:pb-0">
        {/* Currently Up to and Contact*/}
        <div className="flex flex-col md:flex-row md:justify-between gutter-sm md:gutter-md">
            <div
              className={`w-hug flex-2 flex flex-col md:flex-row gutter-sm *:text-sm ${getAnimationClass('bottom-bar-currently')}`}
              style={getAnimationStyle('bottom-bar-currently')}
            >
                <div className="flex flex-col">
                    <span className="text-button text-[#cdcdcd] uppercase tracking-wide">Currently: </span>
                    <div>
                        <Link href={"https://ischool.utoronto.ca/master-of-information/"} target="_blank" rel="noopener" className="hover:bd-text transition-all duration-150">
                            <span className="md:hidden" style={{
                                background: 'linear-gradient(to right, #0B99FF, #6CC2FF)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent'
                            }}>MI @ UofT </span>
                            <span className="hidden md:inline" style={{
                                background: 'linear-gradient(to right, #0B99FF, #6CC2FF)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent'
                            }}>MI Candidate @ UofT iSchool </span>
                        </Link>
                        <span>& </span>
                        <Link href={"https://blogs.studentlife.utoronto.ca/innovationhub/"} target="_blank" rel="noopener" className="hover:bd-text transition-all duration-150">
                            <span className="hidden md:inline" style={{
                                background: 'linear-gradient(to right, #39FF14, #71CF88)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent',
                                paddingBottom: '4px',
                                display: 'inline-block'
                            }}>UX/UI @ Innovation Hub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

