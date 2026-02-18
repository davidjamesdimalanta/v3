"use client";

import VinylSection from "./organisms/vinyl-section";
import AudioPermissionButton from "../ui/AudioPermissionButton";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { useWaveReady } from "../ui/hooks/useWaveReady";

export default function AboutLanding() {
  const { isReady, prefersReducedMotion } = useWaveReady({
    playOnlyOnInitialLoad: true,
  });

  return (
    <div
      id="about-landing"
      className="relative flex flex-col justify-between w-full p-6 md:p-8 mt-40 pb-4"
    >
      <AudioPermissionButton />
      <div className="w-full gutter-md">
        {prefersReducedMotion ? (
          <>
            <span className="col-span-2 text-h2 text-500 md:text-h2 lg:text-h1">
              A bit about me.
            </span>
            <div className="col-span-2">
              <VinylSection />
            </div>
          </>
        ) : isReady ? (
          <AnimatedGroup
            preset="fade"
            className="grid grid-cols-4 grid-rows-auto *:col-span-full *:md:col-span-2 gutter-2xl"
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
            <div className="flex flex-col gutter-xs">
            <span className="text-h2 text-500 md:text-h2 lg:text-h1">
              A bit about me.
            </span>
            <span className="text-p">
            Product designer with background in web development. Experienced in
            prototyping & cross-functional collaboration experience, and am currently
            exploring interaction design, accessibility design, and human-AI interaction.
            </span>
            <span className="text-p pt-4">  
            I&apos;m still crafting my narrative, but for now, here&apos;s who I am.
            </span>
            </div>

            <div className="pr-2">
              <VinylSection />
            </div>


          </AnimatedGroup>
        ) : null}
      </div>
    </div>
  );
}
