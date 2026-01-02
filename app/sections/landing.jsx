"use client";

import Link from "next/link";
import Button from "../ui/Button";
import Intro from "./organisms/intro";
import AudioPermissionButton from "../ui/AudioPermissionButton";
import { useWaveCompleteAnimation } from "../ui/hooks/useWaveCompleteAnimation";

export default function Landing() {
  const { getAnimationClass, getAnimationStyle } = useWaveCompleteAnimation();

  return (
    <div id="landing" className="relative flex flex-col-reverse justify-between w-full h-svh padding-page">
      {/* Audio Permission Button */}
      <AudioPermissionButton />

      <Intro />
    </div>
  );
}

