"use client";

import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { useWaveReady } from "../ui/hooks/useWaveReady";
import BentoGrid from "./BentoGrid";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function HeroHeading() {
  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-5 pt-40 pb-6">
      <h1 className="t-h2 text-on-surface text-balance">
        i design stuff. i build them too.
      </h1>
    </div>
  );
}

export default function HomepageHero({ projects = [] }) {
  const { isReady, prefersReducedMotion } = useWaveReady({ playOnlyOnInitialLoad: true });
  const animate = isReady ? "visible" : "hidden";

  if (prefersReducedMotion) {
    return (
      <>
        <HeroHeading />
        <BentoGrid projects={projects} animate="visible" prefersReducedMotion />
      </>
    );
  }

  return (
    <AnimatedGroup
      className="flex flex-col w-full"
      animate={animate}
      variants={{
        container: {
          visible: { transition: { staggerChildren: 0.1 } },
        },
        item: ITEM_VARIANTS,
      }}
    >
      <HeroHeading />
      <BentoGrid projects={projects} animate={animate} prefersReducedMotion={false} />
    </AnimatedGroup>
  );
}
