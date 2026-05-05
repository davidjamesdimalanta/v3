"use client";

import Closing from "./closing";
import AudioPermissionButton from "../ui/AudioPermissionButton";
import AppIconPopover from "../ui/AppIconPopover";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { useWaveReady } from "../ui/hooks/useWaveReady";

const EXPLORING_APPS = [
  {
    name: 'Stitch',
    icon: 'https://cdn.sanity.io/images/iy4m4myd/production/897c378d3e28ae11a01402de604a2885fa420826-512x512.png',
    videoSrc: 'https://stream.mux.com/qJGxPsYlJkO0275dkd5zCAQ8kXfXLl73MAkLuhxvsTG8.m3u8?min_resolution=720p',
    thumbnail: 'https://image.mux.com/qJGxPsYlJkO0275dkd5zCAQ8kXfXLl73MAkLuhxvsTG8/thumbnail.png?width=214&height=121&time=5',
    description: 'Using Google\'s vibe-design app to get Nothing Phone\'s design style.',
  },
  {
    name: 'Paper',
    icon: 'https://cdn.sanity.io/images/iy4m4myd/production/d9c4a5eea109d6bf65f64fecf8be707a958616f0-512x512.png',
    videoSrc: 'https://stream.mux.com/01osz3h02MyrpkXmeDBvMlsqBANcvlRMlAMfRvg3Hk4vc.m3u8?min_resolution=720p',
    thumbnail: 'https://image.mux.com/01osz3h02MyrpkXmeDBvMlsqBANcvlRMlAMfRvg3Hk4vc/thumbnail.png?width=214&height=121&time=5',
    description: 'Trying the new \"Figma for Agents\" to explore different themes for my portfolio.',
  },
  {
    name: 'Figma Make',
    icon: 'https://cdn.sanity.io/images/iy4m4myd/production/a6786cced7c749dcac23d2ab60a6363783a0ec75-75x75.webp',
    videoSrc: 'https://stream.mux.com/wtOuzS01hOLuru1Zv48K19PjeXpRFwn9RqbpLif1Iswk.m3u8?min_resolution=720p',
    thumbnail: 'https://image.mux.com/wtOuzS01hOLuru1Zv48K19PjeXpRFwn9RqbpLif1Iswk/thumbnail.png?width=214&height=121&time=5',
    description: 'Using Figma Make to make a study buddy app and win a make-a-thon challenge.',
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
              i design stuff. i build them too.
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
              i design stuff. i build them too.
            </span>
            {bottomRow(isReady ? 'visible' : 'hidden')}
          </AnimatedGroup>
        )}
      </div>
    </div>
  );
}
