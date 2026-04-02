'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { initHls, attachTo, detachFrom, featuredProjectsReady } from './lib/hlsManager';
import { HoverCard, HoverCardTrigger, HoverCardVideoContent } from './hover-card';

function HlsVideo({ src, thumbnail }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let cleanedUp = false;

    if (src.includes('.m3u8')) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari / native HLS — set src and wait for canplay before playing
        video.src = src;
        video.load();
        const onCanPlay = () => {
          if (!cleanedUp) {
            setVideoReady(true);
            video.play().catch(() => {});
          }
          video.removeEventListener('canplay', onCanPlay);
        };
        video.addEventListener('canplay', onCanPlay);
      } else {
        // Chrome / Firefox — attach pre-buffered hls.js instance.
        // attachTo already schedules play() on canplay internally; we only
        // need to set videoReady here for the thumbnail fade.
        const onCanPlay = () => {
          if (!cleanedUp) setVideoReady(true);
          video.removeEventListener('canplay', onCanPlay);
        };
        video.addEventListener('canplay', onCanPlay);
        attachTo(src, video);
      }
    } else {
      // Plain mp4 / non-HLS
      video.src = src;
      const onCanPlay = () => {
        if (!cleanedUp) {
          setVideoReady(true);
          video.play().catch(() => {});
        }
        video.removeEventListener('canplay', onCanPlay);
      };
      video.addEventListener('canplay', onCanPlay);
    }

    return () => {
      cleanedUp = true;
      if (src.includes('.m3u8') && !video.canPlayType('application/vnd.apple.mpegurl')) {
        detachFrom(src);
      }
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {/* Thumbnail shown until video is ready */}
      {thumbnail && (
        <div
          className="absolute inset-0 z-10 transition-opacity duration-300"
          style={{ opacity: videoReady ? 0 : 1, pointerEvents: 'none' }}
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>
      )}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function AppIconPopover({ name, icon, videoSrc, thumbnail, description }) {
  // Init HLS only after all featured-project HLS instances have been
  // registered — ensures featured cards buffer first.
  useEffect(() => {
    if (!videoSrc || !videoSrc.includes('.m3u8')) return;

    let isMounted = true;

    featuredProjectsReady.then(() => {
      if (isMounted) initHls(videoSrc);
    });

    return () => {
      isMounted = false;
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
              thumbnail={thumbnail}
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
