'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { initHls, attachTo, detachFrom } from './lib/hlsManager';
import { HoverCard, HoverCardTrigger, HoverCardVideoContent } from './hover-card';

function HlsVideo({ src, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (src.endsWith('.m3u8')) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari — native HLS
        video.src = src;
        video.load();
      } else {
        // Chrome / Firefox — attach pre-buffered hls.js instance
        attachTo(src, video);
      }
    } else {
      video.src = src;
    }

    return () => {
      if (src.endsWith('.m3u8') && !video.canPlayType('application/vnd.apple.mpegurl')) {
        detachFrom(src);
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={className}
    />
  );
}

export default function AppIconPopover({ name, icon, videoSrc, description }) {
  // Init HLS during idle time — lower priority than featured projects
  useEffect(() => {
    if (!videoSrc || !videoSrc.endsWith('.m3u8')) return;

    const schedule = typeof requestIdleCallback !== 'undefined'
      ? (fn) => requestIdleCallback(fn, { timeout: 2000 })
      : (fn) => setTimeout(fn, 300);

    const id = schedule(() => initHls(videoSrc));

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [videoSrc]);

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
        <div className="w-full aspect-video bg-[#D6CAC8] overflow-hidden">
          {videoSrc ? (
            <HlsVideo
              src={videoSrc}
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
            <span className="text-small text-pretty" style={{ color: 'var(--text-color-60, #9B907A)' }}>
              {description}
            </span>
          )}
        </div>
      </HoverCardVideoContent>
    </HoverCard>
  );
}
