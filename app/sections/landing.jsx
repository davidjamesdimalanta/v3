"use client";

import Link from "next/link";
import Button from "../ui/Button";
import Intro from "./organisms/intro";
import AudioPermissionButton from "../ui/AudioPermissionButton";
import { useWaveCompleteAnimation } from "../ui/hooks/useWaveCompleteAnimation";

export default function Landing() {
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation({
    playOnlyOnInitialLoad: true
  });

  return (
    <div id="landing" className="relative flex flex-col justify-between w-full p-6 md:p-8 mt-72 mb-16 lg:mb-32">
      {/* Audio Permission Button */}
      <AudioPermissionButton />
      <Intro />
    </div>
  );
}

