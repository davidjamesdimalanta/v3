"use client";

import Image from "next/image";
import VinylSection from "./organisms/vinyl-section";
import AudioPermissionButton from "../ui/AudioPermissionButton";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Cursor } from "@/components/motion-primitives/cursor";
import { useWaveReady } from "../ui/hooks/useWaveReady";
import { useMediaQuery } from "../ui/hooks/useMediaQuery";

export default function AboutLanding() {
  const { isReady, prefersReducedMotion } = useWaveReady({
    playOnlyOnInitialLoad: true,
  });
  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
  const showCursor = !isTouchDevice && !prefersReducedMotion;

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
            className="grid grid-cols-4 grid-rows-auto *:col-span-full *:md:col-span-2 gutter-md md:gutter-2xl"
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
            <span className="text-p pt-4">
            The persistent & pragmatic problem solver? The crazy ideas guy? I&apos;m still crafting my narrative, but for now, here&apos;s who I am.
            </span>
            <span className="text-p">
            David is a product designer with background in web development. Experienced in
            wireframes, prototyping, & cross-functional collaboration experience. Am currently
            exploring motion design, accessibility design, and human-AI interaction.
            </span>
            </div>
              <div className="relative">
                <div className="bd hover:bd-active transition-all duration-150 overflow-hidden w-full">
                  <div className="relative aspect-square">
                    <Image
                      src="https://cdn.sanity.io/images/iy4m4myd/production/c665d5aeb13dc5abfb23e9eb13273922ed63bee3-835x1114.png"
                      alt="Me on Mount Benson"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                {showCursor && (
                  <Cursor
                    attachToParent
                    springConfig={{ bounce: 0.001 }}
                    variants={{
                      initial: { scale: 0.3, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      exit: { scale: 0.3, opacity: 0 },
                    }}
                    transition={{ ease: "easeInOut", duration: 0.15 }}
                  >
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-(--bg-color) shadow-[0_0_4px_2px_rgba(155,144,122,0.3)] text-button text-400 uppercase whitespace-nowrap">
                      mount benson, i miss you.
                    </div>
                  </Cursor>
                )}
              </div>

              <div className="relative">
                <div className="bd hover:bd-active transition-all duration-150 overflow-hidden w-full">
                  <div className="relative aspect-square">
                    <Image
                      src="https://cdn.sanity.io/images/iy4m4myd/production/833b460461ccfa99600e9b3c5d0a74aa3983f38a-1158x1158.png"
                      alt="My cat, Tori"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                {showCursor && (
                  <Cursor
                    attachToParent
                    springConfig={{ bounce: 0.001 }}
                    variants={{
                      initial: { scale: 0.3, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      exit: { scale: 0.3, opacity: 0 },
                    }}
                    transition={{ ease: "easeInOut", duration: 0.15 }}
                  >
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-(--bg-color) shadow-[0_0_4px_2px_rgba(155,144,122,0.3)] text-button text-400 uppercase whitespace-nowrap">
                      Tori, short for Yakitori.
                    </div>
                  </Cursor>
                )}
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
