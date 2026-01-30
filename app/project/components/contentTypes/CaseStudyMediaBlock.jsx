"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { useMediaQuery } from "../../../ui/hooks/useMediaQuery";
import { useCaseStudyTheme } from "../../_shared/CaseStudyThemeContext";

/**
 * Case Study Media Block Component
 *
 * Full-width media block with Daybreak Studio-inspired matting effect.
 * Features rounded corners, colored background, and internal padding.
 * Supports images, videos (Mux HLS), and Lottie animations.
 *
 * @param {string} sectionHeading - Optional section heading (h5, appears above media)
 * @param {string} type - Media type: "image", "video", or "lottie"
 * @param {string} src - Source URL for the media
 * @param {string} alt - Alt text for images
 * @param {string} caption - Optional caption text
 * @param {string} thumbnail - Optional thumbnail/poster (for videos)
 * @param {string} aspectRatio - "video", "square", "portrait", or custom like "1000/750" (ignored for small/medium sizes)
 * @param {string} bgColor - Optional background color override
 * @param {string} fgColor - Optional caption color override
 * @param {boolean} isFirstVideo - First video has 2-second delay
 * @param {string} size - Size variant: "small" (512px, 1:1), "medium" (1290px, 2.07:1), or "large" (1664px, flexible aspect)
 * @param {string} id - Optional ID for intersection observer tracking
 * @param {string} className - Additional custom classes
 */

const isMuxHLSVideo = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('.m3u8') || url.includes('stream.mux.com');
};

function VideoControls({ isPlaying, hasEnded, onPlay, onPause, onRestart }) {
  const handleTogglePlayback = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end p-3 z-50">
      {!hasEnded ? (
        <button
          onClick={handleTogglePlayback}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          aria-pressed={isPlaying}
          className="bg-black/80 hover:bg-black/90 rounded-full min-w-[44px] min-h-[44px] px-3 py-3 flex items-center justify-center text-[rgb(245,245,245)] transition-all duration-150 focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="6" y="4" width="2.5" height="12" rx="1" fill="currentColor" />
              <rect x="11.5" y="4" width="2.5" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 4.5L15 10L6 15.5V4.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      ) : (
        <button
          onClick={onRestart}
          aria-label="Restart video"
          className="bg-black/80 hover:bg-black/90 rounded-full min-w-[44px] min-h-[44px] px-3 py-3 flex items-center justify-center text-[rgb(245,245,245)] transition-all duration-150 focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 10C4 6.686 6.686 4 10 4C12.2 4 14.1 5.2 15.1 7M16 7V3M16 7H12M16 10C16 13.314 13.314 16 10 16C7.8 16 5.9 14.8 4.9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function CaseStudyMediaBlock({
  sectionHeading,
  type = "image",
  src,
  alt = "",
  caption,
  thumbnail,
  aspectRatio = "1000/750",  // Default to Daybreak's 4:3 ratio
  bgColor,  // Optional override
  fgColor,  // Optional override
  isFirstVideo = false,
  size = "large",  // "small", "medium", or "large"
  id,
  className = "",
}) {
  // Get theme from context (can be overridden by props)
  const theme = useCaseStudyTheme();
  const backgroundColor = bgColor || theme.bgColor;
  const foregroundColor = fgColor || theme.fgColor;

  // Size configuration
  const sizeConfig = {
    small: {
      maxWidth: "max-w-lg",           // 512px (32rem), matches CaseStudyTextBlock
      aspectRatio: "1/1",              // Square
      innerMargin: "px-4 md:px-8",     // Responsive padding (16px mobile, 32px desktop)
    },
    medium: {
      maxWidth: "max-w-[1290px]",      // 1290px
      aspectRatio: "1290/622",         // ~2.07:1 (from safe-area dimensions)
      innerMargin: "px-4 md:px-8",     // Responsive padding (16px mobile, 32px desktop)
    },
    large: {
      maxWidth: "max-w-[1664px]",      // Current width
      aspectRatio: null,               // Use aspectRatio prop
      innerMargin: "px-4 md:px-8",     // Responsive padding (16px mobile, 32px desktop)
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.large;

  // Parse aspect ratio
  const getAspectRatio = () => {
    // Check if aspectRatio was explicitly provided (different from default)
    const hasExplicitAspectRatio = aspectRatio !== "1000/750";

    // If aspectRatio is explicitly provided, use it regardless of size
    if (hasExplicitAspectRatio) {
      const presets = {
        video: "16/9",
        square: "1/1",
        portrait: "3/4",
      };

      // If it's a preset, use the mapped value
      if (presets[aspectRatio]) {
        return presets[aspectRatio];
      }

      // Otherwise, assume it's already a ratio like "11/6"
      return aspectRatio;
    }

    // For small/medium sizes without explicit override, use the size-specific aspect ratio
    if (currentSize.aspectRatio) {
      return currentSize.aspectRatio;
    }

    // For large size without explicit override, use default
    return aspectRatio;
  };

  const ratio = getAspectRatio();

  // Video/Lottie state and refs (same as MediaBlock)
  const lottieRef = useRef(null);
  const dotLottieInstanceRef = useRef(null);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const autoplayTimeoutRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [autoplayExecuted, setAutoplayExecuted] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const shouldEnableAutoplay = isDesktop && !prefersReducedMotion;

  // Lottie effect (same as MediaBlock)
  useEffect(() => {
    if (type === "lottie" && src && lottieRef.current) {
      if (!src) return;

      const canvas = lottieRef.current;

      const updateCanvasSize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };

      updateCanvasSize();

      if (dotLottieInstanceRef.current) {
        dotLottieInstanceRef.current.destroy();
        dotLottieInstanceRef.current = null;
      }

      const dotLottie = new DotLottie({
        canvas: canvas,
        src: src,
        autoplay: true,
        loop: true,
      });

      dotLottieInstanceRef.current = dotLottie;

      dotLottie.setRenderConfig({
        devicePixelRatio: 2,
        autoResize: true,
      });

      const handleResize = () => {
        updateCanvasSize();
        dotLottie.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (dotLottieInstanceRef.current) {
          dotLottieInstanceRef.current.destroy();
          dotLottieInstanceRef.current = null;
        }
      };
    }
  }, [type, src]);

  // Regular video files (non-HLS)
  useEffect(() => {
    if (type !== "video" || !src || isMuxHLSVideo(src)) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => setVideoLoaded(true);
    const handleLoadedData = () => setVideoLoaded(true);
    const handleVideoPlay = () => setIsPlaying(true);
    const handleVideoPause = () => setIsPlaying(false);

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('play', handleVideoPlay);
    videoElement.addEventListener('pause', handleVideoPause);

    videoElement.src = src;
    videoElement.load();

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('play', handleVideoPlay);
      videoElement.removeEventListener('pause', handleVideoPause);
    };
  }, [type, src]);

  // HLS.js integration (same as MediaBlock)
  useEffect(() => {
    if (type !== "video" || !src || !isMuxHLSVideo(src)) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => setVideoLoaded(true);
    const handleLoadedData = () => setVideoLoaded(true);
    const handleVideoPlay = () => setIsPlaying(true);
    const handleVideoPause = () => setIsPlaying(false);

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('play', handleVideoPlay);
    videoElement.addEventListener('pause', handleVideoPause);

    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = src;
      videoElement.load();
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('play', handleVideoPlay);
        videoElement.removeEventListener('pause', handleVideoPause);
      };
    }

    const loadHLS = async () => {
      const Hls = (await import('hls.js')).default;

      if (!Hls.isSupported()) {
        return;
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
        startLevel: -1,
        capLevelToPlayerSize: false,
        maxMaxBufferLength: 600,
      });

      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(videoElement);
    };

    loadHLS();

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('play', handleVideoPlay);
      videoElement.removeEventListener('pause', handleVideoPause);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [type, src]);

  // Intersection Observer (same as MediaBlock)
  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const videoElement = videoRef.current;

    const observerOptions = {
      threshold: 0.75,
      rootMargin: '0px'
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
      observer.disconnect();
    };
  }, [type]);

  // Playback control (same as MediaBlock)
  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const videoElement = videoRef.current;

    const pauseVideo = () => {
      if (!videoElement.paused) {
        videoElement.pause();
        setIsPlaying(false);
      }
    };

    if (!isInView && videoElement && isPlaying) {
      pauseVideo();
    }

    return () => {};
  }, [isInView, type, isPlaying]);

  // Reset autoplay (same as MediaBlock)
  useEffect(() => {
    if (type !== "video") return;

    if (!isInView && !hasEnded) {
      setAutoplayExecuted(false);
    }
  }, [isInView, hasEnded, type]);

  // Autoplay logic (same as MediaBlock)
  useEffect(() => {
    if (
      type !== "video" ||
      !videoRef.current ||
      !videoLoaded ||
      !isInView ||
      autoplayExecuted ||
      !shouldEnableAutoplay ||
      hasEnded
    ) return;

    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    const delay = isFirstVideo ? 2000 : 0;

    autoplayTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setAutoplayExecuted(true);
          })
          .catch(() => {
            setAutoplayExecuted(true);
          });
      }
    }, delay);

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [type, videoLoaded, isInView, autoplayExecuted, shouldEnableAutoplay, hasEnded, isFirstVideo]);

  // Video control handlers
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const handleVideoEnded = () => {
    setHasEnded(true);
    setIsPlaying(false);
  };

  return (
    <figure
      id={id}
      className={`mx-auto flex flex-col items-center justify-center pt-8 pb-20 w-full ${currentSize.maxWidth} ${className}`}
      style={{
        '--bg-color': backgroundColor,
        '--fg-color': foregroundColor,
        '--aspect-ratio': ratio,
      }}
    >
      {/* Optional Section Heading */}
      {sectionHeading && (
        <span className="text-h6 uppercase tracking-wider text-center opacity-60" style={{ color: 'var(--fg-color)' }}>
          {sectionHeading}
        </span>
      )}

      {/* Rounded container with background color */}
      <div
        className="relative w-full overflow-hidden transition-all"
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        <div className="relative">
          {/* Aspect ratio spacer with responsive margins */}
          <div
            className={currentSize.innerMargin}
            style={{
              aspectRatio: 'var(--aspect-ratio)',
            }}
          />

          {/* Absolute positioned media container */}
          <div className="absolute inset-0">
            {type === "lottie" && src ? (
              <canvas
                ref={lottieRef}
                className="w-full h-full"
                style={{ display: 'block' }}
              />
            ) : type === "video" && src ? (
              <>
                {/* Video thumbnail */}
                {thumbnail && (
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      videoLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ pointerEvents: videoLoaded ? 'none' : 'auto' }}
                  >
                    <Image
                      src={thumbnail}
                      alt={alt || "Video thumbnail"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <video
                  ref={videoRef}
                  preload="metadata"
                  muted
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>

                <VideoControls
                  isPlaying={isPlaying}
                  hasEnded={hasEnded}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onRestart={handleRestart}
                />
              </>
            ) : type === "image" && src ? (
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm opacity-40">
                  {type === "lottie" ? "Lottie" : type === "video" ? "Video" : "Image"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <figcaption
          className="mb-3 mt-3 max-w-prose text-center text-sm"
          style={{ color: 'var(--fg-color)' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
