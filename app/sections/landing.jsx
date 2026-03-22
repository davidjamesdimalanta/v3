"use client";

import Closing from "./closing";
import AudioPermissionButton from "../ui/AudioPermissionButton";
import AppIconPopover from "../ui/AppIconPopover";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { useWaveReady } from "../ui/hooks/useWaveReady";
import { useVideoPreloader } from "../ui/hooks/useVideoPreloader";

const EXPLORING_APPS = [
  {
    name: 'Stitch',
    icon: '/assets/icon/homepage/stitch.png',
    videoSrc: '/assets/videos/homepage/stich-tryout.mp4',
    description: 'Using Google\'s vibe-design app to get Nothing Phone\'s design style.',
  },
  {
    name: 'Paper',
    icon: '/assets/icon/homepage/Paper App Icon.png',
    videoSrc: '/assets/videos/homepage/paper-tryout-2.mp4',
    description: 'Trying the new \"Figma for Agents\" to explore different themes for my portfolio.',
  },
  // {
  //   name: 'Pencil',
  //   icon: '/assets/icon/homepage/pencil-app-icon.webp',
  //   videoSrc: '',
  //   description: 'Sketching and drawing, simplified.',
  // },
];

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Landing() {
  const { isReady, prefersReducedMotion } = useWaveReady({
    playOnlyOnInitialLoad: true,
  });

  useVideoPreloader(EXPLORING_APPS.map((a) => a.videoSrc));

  // Icons stagger individually — separate inner AnimatedGroup so each icon
  // gets its own motion child, not the whole row as one block
  const exploringRow = (animate) => (
    <div className="flex flex-col gutter-xs">
      <span className="text-sm text-400" style={{ color: 'var(--text-color-60, #9B907A)' }}>
        PLAYING AROUND WITH:
      </span>
      {prefersReducedMotion ? (
        <div className="flex flex-row gutter-sm flex-wrap">
          {EXPLORING_APPS.map((app) => (
            <AppIconPopover key={app.name} {...app} />
          ))}
        </div>
      ) : (
        <AnimatedGroup
          as="div"
          asChild="div"
          className="flex flex-row gutter-sm flex-wrap"
          animate={animate}
          variants={{
            container: {
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0 } },
            },
            item: ITEM_VARIANTS,
          }}
        >
          {EXPLORING_APPS.map((app) => (
            <AppIconPopover key={app.name} {...app} />
          ))}
        </AnimatedGroup>
      )}
    </div>
  );

  const bottomRow = (animate) => (
    <div className="flex flex-col gutter-sm md:gutter-base">
      <Closing />
      {exploringRow(animate)}
    </div>
  );

  return (
    <div id="landing" className="relative flex flex-col justify-between w-full p-6 md:p-8 mt-40 pb-4">
      <AudioPermissionButton />
      <div className="w-full flex flex-col gutter-md">
        {prefersReducedMotion ? (
          <>
            <span className="text-h2 text-500 md:text-h2 lg:text-h1">
              I design products. I build them too.
            </span>
            {bottomRow('visible')}
          </>
        ) : (
          <AnimatedGroup
            className="flex flex-col gutter-sm md:gutter-base"
            animate={isReady ? 'visible' : 'hidden'}
            variants={{
              container: {
                visible: { transition: { staggerChildren: 0.1 } },
              },
              item: ITEM_VARIANTS,
            }}
          >
            <span className="text-h2 text-500 md:text-h2 lg:text-h1">
              I design products. I build them too.
            </span>
            {bottomRow(isReady ? 'visible' : 'hidden')}
          </AnimatedGroup>
        )}
      </div>
    </div>
  );
}
