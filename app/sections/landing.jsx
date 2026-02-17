"use client";

import Closing from "./closing";
import AudioPermissionButton from "../ui/AudioPermissionButton";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { useWaveReady } from "../ui/hooks/useWaveReady";

export default function Landing() {
  const { isReady, prefersReducedMotion } = useWaveReady({
    playOnlyOnInitialLoad: true,
  });

  return (
    <div id="landing" className="relative flex flex-col justify-between w-full p-6 md:p-8 mt-40 pb-4">
      <AudioPermissionButton />
      <div className="w-full flex flex-col gutter-md">
        {prefersReducedMotion ? (
          <>
            <span className="text-h2 text-500 md:text-h2 lg:text-h1">
              I design products. I ship them too.
            </span>
            <div className="md:w-1/2">
              <Closing />
            </div>
          </>
        ) : isReady ? (
          <AnimatedGroup
            preset="fade"
            className="flex flex-col gutter-sm md:gutter-base"
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    duration: 0.05,
                  },
                },
              },
            }}
          >
            <span className="text-h2 text-500 md:text-h2 lg:text-h1">
              I design products. I ship them too.
            </span>
            <div className="md:w-1/2">
              <Closing />
            </div>
          </AnimatedGroup>
        ) : null}
      </div>
    </div>
  );
}
