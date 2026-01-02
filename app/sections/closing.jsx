"use client"

import Link from "next/link";
import Button from "../ui/Button";
import { useWaveCompleteAnimation } from "../ui/hooks/useWaveCompleteAnimation";

export default function Closing() {
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation();
  return (
    <div id="closing" className="relative flex flex-col w-full h-hug justify-between p-4">
        {/* Currently Up to and Contact*/}
        <div className="flex flex-row md:justify-between items-end gutter-md">
            <div
              className={`w-hug flex-2 flex flex-col md:flex-row gutter-sm *:text-small ${getAnimationClass('bottom-bar-currently')}`}
              style={getAnimationStyle('bottom-bar-currently')}
            >
                <div className="flex flex-col gap-[4px]">
                    <span>Currently: </span>
                    <div>
                        <Link href={"https://ischool.utoronto.ca/master-of-information/"} target="_blank" rel="noopener">
                            <span className="text-[#0B99FF]">MI Candidate @ UofT iSchool </span>
                        </Link>
                        <span>&& </span>
                        <Link href={"https://blogs.studentlife.utoronto.ca/innovationhub/"} target="_blank" rel="noopener">
                            <span className="text-[#13AE5C]">Web Designer @ Innovation Hub</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div
              className={`w-fill flex-1 flex flex-col md:flex-row justify-end gap-2 lg:gap-4 ${getAnimationClass('bottom-bar-button')}`}
              style={getAnimationStyle('bottom-bar-button')}
            >
                <Button
                    text={"Get in Touch"}
                    href="mailto:david.dimalanta@mail.utoronto.ca"
                />
                <Button
                    text={"CV"}
                    href="/cv/David_Dimalanta_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                />
            </div>
        </div>
    </div>
  );
}

