"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import { initHls, registerFeaturedSrc, attachTo, detachFrom } from "../../ui/lib/hlsManager";
import { useMediaQuery } from "../../ui/hooks/useMediaQuery";

const isMuxHLS = (url) =>
  typeof url === "string" && (url.includes(".m3u8") || url.includes("stream.mux.com"));

export default function BentoCell({
  variant = "hero",
  category,
  title,
  subtitle,
  thumbnail,
  videoSrc,
  onOpen,
}) {
  const { playHover, playNavigateProject } = useSoundEffects();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // HLS — register + init eagerly (only hero cell has video)
  useEffect(() => {
    if (!videoSrc || !isMuxHLS(videoSrc)) return;
    registerFeaturedSrc(videoSrc);
    initHls(videoSrc);
  }, [videoSrc]);

  // Attach HLS to <video> element
  useEffect(() => {
    if (!videoSrc || !isMuxHLS(videoSrc)) return;
    const el = videoRef.current;
    if (!el) return;

    const onReady = () => setVideoLoaded(true);
    el.addEventListener("canplay", onReady);
    el.addEventListener("loadeddata", onReady);

    if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = videoSrc;
      el.load();
    } else {
      attachTo(videoSrc, el);
    }

    return () => {
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("loadeddata", onReady);
      if (!el.canPlayType("application/vnd.apple.mpegurl")) {
        detachFrom(videoSrc);
      }
    };
  }, [videoSrc]);

  // Autoplay via IntersectionObserver once loaded
  useEffect(() => {
    if (!videoSrc || !videoRef.current || !videoLoaded || prefersReducedMotion) return;
    const el = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else if (!el.paused) {
            el.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc, videoLoaded, prefersReducedMotion]);

  const handleClick = () => {
    playNavigateProject();
    onOpen?.();
  };

  const isHero = variant === "hero";
  const isR2 = variant === "r2";

  // Shared outer button classes
  // bd-card = layered card shadow (no backdrop-blur) — matches Figma "Surface/bd Default" drop shadow
  // hover:bd-active = elevated shadow on interaction
  const baseClasses =
    "relative flex flex-col text-left cursor-pointer " +
    "border border-outline-variant rounded-[24px] p-6 overflow-hidden " +
    "bd-card hover:bd-active hover-surface " +
    "focus-visible:outline-2 focus-visible:outline-[var(--schemes-primary)] focus-visible:outline-offset-2";

  if (isHero) {
    return (
      <button
        type="button"
        className={`${baseClasses} w-full h-full bg-surface`}
        onClick={handleClick}
        onMouseEnter={playHover}
        aria-label={`View project: ${title}`}
      >
        {/* Background media — absolutely positioned, right-aligned */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className={`object-cover transition-opacity duration-500 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
            />
          )}
          {videoSrc && (
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              preload="metadata"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="w-full h-full object-cover"
            />
          )}
          {/* Scrim — bottom fade so text is legible */}
          <div className="absolute inset-0 bg-linear-to-t from-(--schemes-surface) via-(--schemes-surface)/10 " />
        </div>
        {/* Category label — top-left */}
        <span className="relative z-10 t-label text-(--schemes-tertiary)">{category}</span>

        {/* Title + subtitle — bottom */}
        <div className="relative z-10 mt-auto flex flex-col gap-1">
          <h2 className="t-h4 text-on-surface">{title}</h2>
          {subtitle && <p className="t-p text-on-surface-variant">{subtitle}</p>}
        </div>
      </button>
    );
  }

  // R1 — surface-container-highest bg (matches Figma DS top-right card tint)
  if (!isR2) {
    return (
      <button
        type="button"
        className={`${baseClasses} flex-1 min-h-0 w-full bg-surface-container-highest`}
        onClick={handleClick}
        onMouseEnter={playHover}
        aria-label={`View project: ${title}`}
      >
        {thumbnail && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px] bg-surface-container-highest">
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent from-66% to-(--schemes-surface-container-highest) to-86%" />
          </div>
        )}

        <span className="relative z-10 t-label text-on-surface-variant">{category}</span>
        <h2 className="relative z-10 mt-auto t-h5 text-on-surface">{title}</h2>
      </button>
    );
  }

  // R2 — surface-container bg, gradient overlay
  return (
    <button
      type="button"
      className={`${baseClasses} flex-1 min-h-0 w-full bg-surface-container`}
      onClick={handleClick}
      onMouseEnter={playHover}
      aria-label={`View project: ${title}`}
    >
      {/* Background image — full bleed cover */}
      {thumbnail && (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          {/* Figma gradient: transparent 66% -> surface-container 86% */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-66% to-(--schemes-surface-container) to-86%" />
        </div>
      )}

      <span className="relative z-10 t-label text-on-surface-variant">{category}</span>
      <h2 className="relative z-10 mt-auto t-h5 text-on-surface">{title}</h2>
    </button>
  );
}
