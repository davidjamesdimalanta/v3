"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { attachTo, detachFrom, initHls, registerFeaturedSrc } from "../../ui/lib/hlsManager";
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

export default function BentoHeroStage({
  media,
  fallbackThumbnail,
  title,
  href,
  activeIndex = 0,
  priority = false,
  prefersReducedMotion = false,
}) {
  const videoRef = useRef(null);
  const [loadedVideoSrc, setLoadedVideoSrc] = useState(null);
  const isDarkTheme = useIsDarkTheme();
  const activeMedia = media?.[activeIndex];
  const activeSrc = isDarkTheme && activeMedia?.darkSrc ? activeMedia.darkSrc : activeMedia?.src;
  const activeHevcSrc = isDarkTheme && activeMedia?.darkSrc ? activeMedia?.darkHevcSrc : activeMedia?.hevcSrc;
  const isVideo = activeMedia?.type === "video" && activeSrc;
  const poster = (isDarkTheme && activeMedia?.darkThumbnail ? activeMedia.darkThumbnail : activeMedia?.thumbnail) || fallbackThumbnail;
  const imageSrc = activeMedia?.type === "image" ? activeSrc : poster;
  const videoLoaded = Boolean(isVideo && loadedVideoSrc === activeSrc);
  const mediaKey = `${activeIndex}:${activeSrc || imageSrc || "empty"}`;
  const [mediaVisibility, setMediaVisibility] = useState(() => ({
    key: mediaKey,
    visible: prefersReducedMotion,
  }));

  if (mediaVisibility.key !== mediaKey) {
    setMediaVisibility({
      key: mediaKey,
      visible: prefersReducedMotion,
    });
  }

  useEffect(() => {
    if (prefersReducedMotion || mediaVisibility.visible) return undefined;

    const timer = window.setTimeout(() => {
      setMediaVisibility((current) => {
        if (current.key !== mediaKey || current.visible) return current;
        return { ...current, visible: true };
      });
    }, 40);

    return () => window.clearTimeout(timer);
  }, [mediaKey, mediaVisibility.visible, prefersReducedMotion]);

  useEffect(() => {
    if (!isVideo || !isMuxHLS(activeSrc)) return;
    registerFeaturedSrc(activeSrc);
    initHls(activeSrc);
  }, [isVideo, activeSrc]);

  useEffect(() => {
    if (!isVideo || !isMuxHLS(activeSrc) || prefersReducedMotion) return;
    const el = videoRef.current;
    if (!el) return;

    const onReady = () => setLoadedVideoSrc(activeSrc);
    el.addEventListener("canplay", onReady);
    el.addEventListener("loadeddata", onReady);

    if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = activeSrc;
      el.load();
    } else {
      attachTo(activeSrc, el);
    }

    return () => {
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("loadeddata", onReady);
      if (!el.canPlayType("application/vnd.apple.mpegurl")) {
        detachFrom(activeSrc);
      }
      el.removeAttribute("src");
      el.load();
    };
  }, [isVideo, activeSrc, prefersReducedMotion]);

  useEffect(() => {
    if (!isVideo || isMuxHLS(activeSrc) || prefersReducedMotion) return;
    const el = videoRef.current;
    if (!el) return;

    const markReady = () => setLoadedVideoSrc(activeSrc);
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
  }, [isVideo, activeSrc, activeHevcSrc, prefersReducedMotion]);

  useEffect(() => {
    if (!isVideo || !videoRef.current || !videoLoaded || prefersReducedMotion) return;
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
  }, [isVideo, videoLoaded, prefersReducedMotion]);

  const caption = activeMedia?.caption;
  const mediaTransitionClass = prefersReducedMotion
    ? ""
    : "transition-opacity duration-500";
  const visibleOpacityClass = prefersReducedMotion || mediaVisibility.visible ? "opacity-100" : "opacity-0";
  const posterOpacityClass = isVideo && videoLoaded ? "opacity-0" : visibleOpacityClass;
  const videoOpacityClass = videoLoaded ? visibleOpacityClass : "opacity-0";
  const Container = href ? Link : "div";

  return (
    <Container
      {...(href ? { href, "aria-label": `View ${title} case study` } : {})}
      className={`relative flex-none h-[420px] w-full md:flex-2 md:h-full min-w-0 rounded-[24px] p-4 overflow-hidden bg-surface-container-highest ${href ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-(--schemes-primary) focus-visible:outline-offset-2" : ""}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
        {imageSrc && (
          <Image
            key={`poster-${activeIndex}-${imageSrc}`}
            src={imageSrc}
            alt={activeMedia?.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            className={`object-cover ${mediaTransitionClass} ${posterOpacityClass}`}
          />
        )}

        {isVideo && !prefersReducedMotion && (
          <video
            key={`video-${activeIndex}-${activeSrc}`}
            ref={videoRef}
            muted
            playsInline
            loop
            preload="metadata"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className={`w-full h-full object-cover ${mediaTransitionClass} ${videoOpacityClass}`}
          >
            {!isMuxHLS(activeSrc) && (
              <>
                {activeHevcSrc && <source src={activeHevcSrc} type={getStaticVideoType(activeHevcSrc)} />}
                <source src={activeSrc} type={getStaticVideoType(activeSrc)} />
              </>
            )}
          </video>
        )}

        {!activeMedia && (
          <div className="flex h-full w-full items-center justify-center bg-surface-container-highest p-6 text-center">
            <p className="t-p text-on-surface-variant">Media preview coming soon</p>
          </div>
        )}

        {caption && <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-(--schemes-surface) via-(--schemes-surface)/70 to-transparent" />}

        <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] sunken" />
      </div>

      {caption && (
        <p className="absolute inset-x-6 bottom-6 z-30 max-w-xl t-p text-on-surface-variant bd-text">
          {caption}
        </p>
      )}
    </Container>
  );
}
