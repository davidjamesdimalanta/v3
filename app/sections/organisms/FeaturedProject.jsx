"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SkillTag from "../../ui/SkillTag";
import { useMediaQuery } from "../../ui/hooks/useMediaQuery";

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
  const hlsRef = useRef(null);
  const containerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // HLS.js setup#427067
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

    // Load HLS.js for other browsers
    const loadHLS = async () => {
      const Hls = (await import("hls.js")).default;
      if (!Hls.isSupported()) return;

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
        startLevel: -1,
        capLevelToPlayerSize: false,
        maxMaxBufferLength: 600,
      });

      hlsRef.current = hls;
      hls.loadSource(videoSrc);
      hls.attachMedia(videoElement);
    };

    loadHLS();

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
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
      className="bd hover:bd-active transition-all duration-150 overflow-hidden w-fill h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Container */}
      <div className="relative aspect-video overflow-hidden bg-#ffffff">
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
      <div className="p-4 flex flex-col md:flex-row xl:flex-row gutter-xs md:gutter-base flex-1">
        {/* Header with title and year */}
        <div className="flex flex-col flex-1 h-hug lg:h-fill items-start gap-2">
          <h3 className="text-h4 text-400 leading-none">{title}</h3>
          {description && (
            <p className="text-base text-(text--figma-brown) leading-none">
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
