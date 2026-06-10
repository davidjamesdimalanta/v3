"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SkillTag from "../../ui/SkillTag";
import { useMediaQuery } from "../../ui/hooks/useMediaQuery";
import { initHls, registerFeaturedSrc, attachTo, detachFrom } from "../../ui/lib/hlsManager";

const isMuxHLSVideo = (url) => {
  if (!url || typeof url !== "string") return false;
  return url.includes(".m3u8") || url.includes("stream.mux.com");
};

export default function FeaturedProject({
  title,
  description,
  videoSrc,
  thumbnail,
  imageAlt,
  tags = [],
  skills = [],
  year,
  autoplay = false,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Register and eagerly init HLS instance on mount — highest priority
  // (featured projects load before popover apps).
  // registerFeaturedSrc must run before initHls so the seal count is accurate.
  useEffect(() => {
    if (!videoSrc || !isMuxHLSVideo(videoSrc)) return;
    registerFeaturedSrc(videoSrc);
    initHls(videoSrc);
  }, [videoSrc]);

  // Attach HLS instance to video element once it's in the DOM
  useEffect(() => {
    if (!videoSrc || !isMuxHLSVideo(videoSrc)) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => setVideoLoaded(true);
    const handleLoadedData = () => setVideoLoaded(true);

    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("loadeddata", handleLoadedData);

    // Safari supports HLS natively
    if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = videoSrc;
      videoElement.load();
      return () => {
        videoElement.removeEventListener("canplay", handleCanPlay);
        videoElement.removeEventListener("loadeddata", handleLoadedData);
      };
    }

    attachTo(videoSrc, videoElement);

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      detachFrom(videoSrc);
    };
  }, [videoSrc]);

  // Local/static video files.
  useEffect(() => {
    if (!videoSrc || isMuxHLSVideo(videoSrc)) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const markReady = () => setVideoLoaded(true);

    videoElement.addEventListener("canplay", markReady);
    videoElement.addEventListener("loadeddata", markReady);

    videoElement.src = videoSrc;
    videoElement.load();
    if (videoElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markReady();
    }

    return () => {
      videoElement.removeEventListener("canplay", markReady);
      videoElement.removeEventListener("loadeddata", markReady);
      videoElement.removeAttribute("src");
      videoElement.load();
    };
  }, [videoSrc]);

  // Autoplay: first card plays when in view via IntersectionObserver
  useEffect(() => {
    if (!autoplay || prefersReducedMotion || !videoRef.current) return;

    const videoElement = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoLoaded) {
            videoElement.play().catch(() => {});
          } else if (!entry.isIntersecting && !videoElement.paused) {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [autoplay, videoLoaded, prefersReducedMotion]);

  // Hover play: non-autoplay cards play on hover
  useEffect(() => {
    if (autoplay || prefersReducedMotion || !videoRef.current || !videoLoaded) return;

    const videoElement = videoRef.current;

    if (isHovered) {
      videoElement.play().catch(() => {});
    } else {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }, [isHovered, autoplay, videoLoaded, prefersReducedMotion]);

  // Video end: loop back
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="bd-card hover:bd-active hover-surface rounded-2xl overflow-hidden w-fill h-full flex flex-col p-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-(--primary-50) img-depth">
        {/* Thumbnail - shown while video loads */}
        {thumbnail && (
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-500 ${
              videoLoaded ? "opacity-0" : "opacity-100"
            }`}
            style={{ pointerEvents: videoLoaded ? "none" : "auto" }}
          >
            <Image
              src={thumbnail}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}

        {/* HLS Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            preload="metadata"
            muted
            playsInline
            loop
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content Container */}
      <div className="px-2 pb-2 pt-3 flex flex-col md:flex-row xl:flex-row gutter-xs md:gutter-base flex-1">
        {/* Header with title and year */}
        <div className="flex flex-col flex-1 h-hug lg:h-fill items-start gutter-xs">
          <h3 className="text-h4 text-400 leading-none">{title}</h3>
          {description && (
            <p className="text-base text-(--text-color) leading-none">
              {description}
            </p>
          )}
        </div>


        {/* Skills Tags */}
        {skills.length > 0 && (
          <div className="h-hug flex flex-1 flex-wrap justify-start md:justify-end items-start gutter-xs mt-4 md:mt-0">
            {skills.map((skill, index) => (
              <SkillTag
                key={index}
                skill={skill.name}
                category={skill.category}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
