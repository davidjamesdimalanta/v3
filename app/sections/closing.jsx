"use client"

import Link from "next/link";
import Button from "../ui/Button";
import { useWaveCompleteAnimation } from "../ui/hooks/useWaveCompleteAnimation";

export default function Closing() {
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation({
    playOnlyOnInitialLoad: true
  });
  return (
    <div id="closing" className="relative flex flex-col w-full h-hug justify-between py-4 md:pt-4 md:pb-0">
        {/* Currently Up to and Contact*/}
        <div className="flex flex-col md:flex-row md:justify-between gutter-sm md:gutter-md">
            <div
              className={`w-hug flex-2 flex flex-col md:flex-row gutter-sm *:text-small ${getAnimationClass('bottom-bar-currently')}`}
              style={getAnimationStyle('bottom-bar-currently')}
            >
                <div className="flex flex-col gap-[4px]">
                    <span>Currently: </span>
                    <div>
                        <Link href={"https://ischool.utoronto.ca/master-of-information/"} target="_blank" rel="noopener" className="hover:bd-text transition-all duration-150">
                            <span style={{
                                background: 'linear-gradient(to right, #0B99FF, #6CC2FF)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent'
                            }}>MI Candidate @ UofT iSchool </span>
                        </Link>
                        <span>&& </span>
                        <Link href={"https://blogs.studentlife.utoronto.ca/innovationhub/"} target="_blank" rel="noopener" className="hover:bd-text transition-all duration-150">
                            <span style={{
                                background: 'linear-gradient(to right, #39FF14, #71CF88)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent',
                                paddingBottom: '4px',
                                display: 'inline-block'
                            }}>Web Design @ Innovation Hub</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div
              className={`md:hidden w-fill flex-1 flex flex-row justify-end gap-4 lg:gap-4 ${getAnimationClass('bottom-bar-button')}`}
              style={getAnimationStyle('bottom-bar-button')}
            >
                <Button
                    text={"Get in Touch"}
                    href="mailto:david.dimalanta@mail.utoronto.ca"
                    soundEffect="hover"
                />
                <Button
                    text={"CV"}
                    href="/cv/David_Dimalanta_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    soundEffect="hover"
                />
            </div>
        </div>
    </div>
  );
}

