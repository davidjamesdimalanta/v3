"use client"

import Link from "next/link";
import Button from "../ui/Button";
import { useWaveCompleteAnimation } from "../ui/hooks/useWaveCompleteAnimation";

export default function Closing() {
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation({
    playOnlyOnInitialLoad: true
  });
  return (
    <div id="closing" className="relative flex flex-col w-full h-hug justify-between md:pb-0">
        {/* Currently Up to and Contact*/}
        <div className="flex flex-col md:flex-row md:justify-between gutter-sm md:gutter-md">
            <div
              className={`w-hug flex-2 flex flex-col md:flex-row gutter-sm *:text-sm ${getAnimationClass('bottom-bar-currently')}`}
              style={getAnimationStyle('bottom-bar-currently')}
            >
                <div className="flex flex-col">
                    <span className=" text-[#799A92] uppercase tracking-wide">Currently: </span>
                    <div>
                        <Link href={"https://ischool.utoronto.ca/master-of-information/"} target="_blank" rel="noopener" className="hover:bd-text transition-all duration-150">
                            <span className="md:hidden text-p" style={{
                                // background: 'linear-gradient(to right, #3A1F1E, #9F807B)',
                                // WebkitBackgroundClip: 'text',
                                // backgroundClip: 'text',
                                // WebkitTextFillColor: 'transparent',
                                // color: 'transparent'
                            }}>MI @ UofT </span>
                            <span className="hidden md:inline text-p" style={{
                                // background: 'linear-gradient(to right, #3A1F1E, #9F807B)',
                                // WebkitBackgroundClip: 'text',
                                // backgroundClip: 'text',
                                // WebkitTextFillColor: 'transparent',
                                // color: 'transparent'
                            }}>MI Candidate @ UofT iSchool </span>
                        </Link>
                        <span className="text-p">& </span>
                        <Link href={"https://blogs.studentlife.utoronto.ca/innovationhub/"} target="_blank" rel="noopener" className="hover:bd-text transition-all duration-150">
                            <span className="md:hidden inline-block text-p" style={{
                                // background: 'linear-gradient(to right, #3A1F1E, #9F807B)',
                                // WebkitBackgroundClip: 'text',
                                // backgroundClip: 'text',
                                // WebkitTextFillColor: 'transparent',
                                // color: 'transparent',
                                // paddingBottom: '4px'
                            }}>UX/UI @ iHub</span>
                            <span className="hidden md:inline-block text-p" style={{
                                // background: 'linear-gradient(to right, #3A1F1E, #9F807B)',
                                // WebkitBackgroundClip: 'text',
                                // backgroundClip: 'text',
                                // WebkitTextFillColor: 'transparent',
                                // color: 'transparent',
                                // paddingBottom: '4px'
                            }}>UX/UI @ Innovation Hub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

