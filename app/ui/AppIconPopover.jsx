'use client';

import Image from 'next/image';
import { HoverCard, HoverCardTrigger, HoverCardVideoContent } from './hover-card';

export default function AppIconPopover({ name, icon, videoSrc, description }) {
  return (
    <HoverCard openDelay={80} closeDelay={120}>
      <HoverCardTrigger asChild>
        <button
          className="w-12 h-12 rounded-xl bd overflow-hidden flex items-center justify-center cursor-default focus:outline-none hover:scale-105 transition-transform duration-150"
          tabIndex={-1}
          aria-label={name}
        >
          {icon ? (
            <Image
              src={icon}
              alt={name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="w-full h-full bg-[#D6CAC8] block" />
          )}
        </button>
      </HoverCardTrigger>

      <HoverCardVideoContent
        className="w-90"
        side="bottom"
        align="start"
        sideOffset={8}
      >
        {/* Video — src set directly; idle preloader has already fetched it into
            browser cache so playback begins immediately on first hover */}
        <div className="w-full aspect-video bg-[#D6CAC8] overflow-hidden">
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#D6CAC8]" />
          )}
        </div>

        {/* Info */}
        <div className="p-2 flex flex-col gutter-xs">
          <span className="text-small text-600">{name}</span>
          {description && (
            <span className="text-small" style={{ color: 'var(--text-color-60, #9B907A)' }}>
              {description}
            </span>
          )}
        </div>
      </HoverCardVideoContent>
    </HoverCard>
  );
}
