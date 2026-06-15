"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import { initHls, registerFeaturedSrc, attachTo, detachFrom } from "../../ui/lib/hlsManager";
import { useMediaQuery } from "../../ui/hooks/useMediaQuery";
import { useIsDarkTheme } from "../../ui/hooks/useIsDarkTheme";

const isMuxHLS = (url) =>
  typeof url === "string" && (url.includes(".m3u8") || url.includes("stream.mux.com"));

const getStaticVideoType = (url) => {
  if (typeof url !== "string") return undefined;
  if (url.includes(".webm")) return "video/webm";
  if (url.includes(".mov")) return 'video/quicktime; codecs="hvc1"';
  if (url.includes(".mp4")) return "video/mp4";
  return undefined;
};

export default function BentoCell({
  variant = "hero",
  category,
  title,
  subtitle,
  thumbnail,
  darkThumbnail,
  videoSrc,
  hevcVideoSrc,
  darkVideoSrc,
  darkHevcVideoSrc,
  priority = false,
  href,
  comingSoon = false,
  showCategory = true,
}) {
  const { playHover, playNavigateProject } = useSoundEffects();
  const videoRef = useRef(null);
  const [loadedVideoSrc, setLoadedVideoSrc] = useState(null);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDarkTheme = useIsDarkTheme();
  const activeVideoSrc = isDarkTheme && darkVideoSrc ? darkVideoSrc : videoSrc;
  const activeHevcVideoSrc = isDarkTheme && darkVideoSrc ? darkHevcVideoSrc : hevcVideoSrc;
  const activeThumbnail = isDarkTheme && darkThumbnail ? darkThumbnail : thumbnail;
  const videoLoaded = Boolean(activeVideoSrc && loadedVideoSrc === activeVideoSrc);

  // HLS — register + init eagerly (only hero cell has video)
  useEffect(() => {
    if (!activeVideoSrc || !isMuxHLS(activeVideoSrc)) return;
    registerFeaturedSrc(activeVideoSrc);
    initHls(activeVideoSrc);
  }, [activeVideoSrc]);

  // Attach HLS to <video> element
  useEffect(() => {
    if (!activeVideoSrc || !isMuxHLS(activeVideoSrc)) return;
    const el = videoRef.current;
    if (!el) return;

    const onReady = () => setLoadedVideoSrc(activeVideoSrc);
    el.addEventListener("canplay", onReady);
    el.addEventListener("loadeddata", onReady);

    if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = activeVideoSrc;
      el.load();
    } else {
      attachTo(activeVideoSrc, el);
    }

    return () => {
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("loadeddata", onReady);
      if (!el.canPlayType("application/vnd.apple.mpegurl")) {
        detachFrom(activeVideoSrc);
      }
    };
  }, [activeVideoSrc]);

  // Local/static video files.
  useEffect(() => {
    if (!activeVideoSrc || isMuxHLS(activeVideoSrc)) return;
    const el = videoRef.current;
    if (!el) return;

    const markReady = () => setLoadedVideoSrc(activeVideoSrc);
    el.addEventListener("canplay", markReady);
    el.addEventListener("loadeddata", markReady);

    el.load();
    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markReady();
    }

    return () => {
      el.removeEventListener("canplay", markReady);
      el.removeEventListener("loadeddata", markReady);
      el.removeAttribute("src");
      el.load();
    };
  }, [activeVideoSrc, activeHevcVideoSrc]);

  // Autoplay via IntersectionObserver once loaded
  useEffect(() => {
    if (!activeVideoSrc || !videoRef.current || !videoLoaded || prefersReducedMotion) return;
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
  }, [activeVideoSrc, videoLoaded, prefersReducedMotion]);

  const handleComingSoon = () => {
    toast("Coming soon", {
      description: "This project is currently being documented.",
    });
  };

  const Action = comingSoon ? "button" : Link;
  const actionProps = comingSoon
    ? {
        type: "button",
        onClick: handleComingSoon,
        "aria-disabled": "true",
      }
    : {
        href,
        onClick: playNavigateProject,
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
    "focus-visible:outline-2 focus-visible:outline-(--schemes-primary) focus-visible:outline-offset-2";

  if (isHero) {
    return (
      <Action
        {...actionProps}
        className={`${baseClasses} w-full h-full bg-surface`}
        onMouseEnter={playHover}
        aria-label={comingSoon ? `${title} case study coming soon` : `View project: ${title}`}
      >
        {/* Background media — absolutely positioned, right-aligned */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
          {activeThumbnail && (
            <Image
              src={activeThumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              className={`object-cover transition-opacity duration-500 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
            />
          )}
          {activeVideoSrc && (
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
            >
              {!isMuxHLS(activeVideoSrc) && (
                <>
                  <source src={activeVideoSrc} type={getStaticVideoType(activeVideoSrc)} />
                  {activeHevcVideoSrc && <source src={activeHevcVideoSrc} type={getStaticVideoType(activeHevcVideoSrc)} />}
                </>
              )}
            </video>
          )}
          {/* Scrim — bottom fade so text is legible */}
          <div className="absolute inset-0 bg-linear-to-t from-(--schemes-surface) via-(--schemes-surface)/10 " />
        </div>
        {/* Category label — top-left */}
        {showCategory && category && (
          <span className="relative z-10 t-label text-(--schemes-tertiary) bd-text">{category}</span>
        )}

        {/* Title + subtitle — bottom */}
        <div className="relative z-10 mt-auto flex flex-col gutter-xs">
          <h2 className="t-h4 text-on-surface">{title}</h2>
          {subtitle && <p className="t-p text-on-surface-variant">{subtitle}</p>}
        </div>
      </Action>
    );
  }

  // R1 — surface-container-highest bg (matches Figma DS top-right card tint)
  if (!isR2) {
    return (
      <Action
        {...actionProps}
        className={`${baseClasses} flex-1 min-h-0 w-full bg-surface-container-highest`}
        onMouseEnter={playHover}
        aria-label={comingSoon ? `${title} case study coming soon` : `View project: ${title}`}
      >
        {activeThumbnail && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px] bg-surface-container-highest">
            <Image
              src={activeThumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent from-66% to-(--schemes-surface-container-highest) to-86%" />
          </div>
        )}

        {showCategory && category && (
          <span className="relative z-10 t-label text-(--schemes-tertiary) bd-text">{category}</span>
        )}
        <div className="relative z-10 mt-auto flex flex-col gutter-xs">
          <h2 className="t-h5 text-on-surface">{title}</h2>
          {subtitle && <p className="t-p text-on-surface-variant">{subtitle}</p>}
        </div>
      </Action>
    );
  }

  // R2 — surface-container bg, gradient overlay
  return (
    <Action
      {...actionProps}
      className={`${baseClasses} flex-1 min-h-0 w-full bg-surface-container`}
      onMouseEnter={playHover}
      aria-label={comingSoon ? `${title} case study coming soon` : `View project: ${title}`}
    >
      {/* Background image — full bleed cover */}
      {activeThumbnail && (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
          <Image
            src={activeThumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          {/* Figma gradient: transparent 66% -> surface-container 86% */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-66% to-(--schemes-surface-container) to-86%" />
        </div>
      )}

      {showCategory && category && (
        <span className="relative z-10 t-label text-(--schemes-tertiary) bd-text">{category}</span>
      )}
      <div className="relative z-10 mt-auto flex flex-col gutter-xs">
        <h2 className="t-h5 text-on-surface">{title}</h2>
        {subtitle && <p className="t-p text-on-surface-variant">{subtitle}</p>}
      </div>
    </Action>
  );
}
