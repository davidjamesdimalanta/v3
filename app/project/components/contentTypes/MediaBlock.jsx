"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { useMediaQuery } from "../../../ui/hooks/useMediaQuery";

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
          className="bg-black/80 hover:bg-black/90 rounded-full min-w-[44px] min-h-[44px] px-3 py-3 flex items-center justify-center text-[rgb(245,245,245)] transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
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
          className="bg-black/80 hover:bg-black/90 rounded-full min-w-[44px] min-h-[44px] px-3 py-3 flex items-center justify-center text-[rgb(245,245,245)] transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 10C4 6.686 6.686 4 10 4C12.2 4 14.1 5.2 15.1 7M16 7V3M16 7H12M16 10C16 13.314 13.314 16 10 16C7.8 16 5.9 14.8 4.9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function MediaBlock({
  type = "image", // "image", "video", or "lottie"
  src,
  alt = "",
  caption,
  thumbnail, // Optional thumbnail/poster image (e.g., Mux thumbnail)
  aspectRatio = "video", // "video" (16:9), "square", "portrait", or custom class
  className = "",
  isFirstVideo = false // First video has 2-second delay, others autoplay instantly
}) {
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

  // Desktop/mobile and accessibility detection for autoplay
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const shouldEnableAutoplay = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    if (type === "lottie" && src && lottieRef.current) {
      // Early return if no valid source
      if (!src) return;

      const canvas = lottieRef.current;

      // Set canvas dimensions based on container size for better performance
      const updateCanvasSize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };

      updateCanvasSize();

      // Cleanup previous DotLottie instance if exists
      if (dotLottieInstanceRef.current) {
        dotLottieInstanceRef.current.destroy();
        dotLottieInstanceRef.current = null;
      }

      // Create new DotLottie instance
      const dotLottie = new DotLottie({
        canvas: canvas,
        src: src,
        autoplay: true,
        loop: true,
      });

      // Store instance reference
      dotLottieInstanceRef.current = dotLottie;

      // Optimize rendering performance
      dotLottie.setRenderConfig({
        devicePixelRatio: 2,
        autoResize: true,
      });

      // Handle window resize events
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

  // HLS.js integration for Mux videos
  useEffect(() => {
    if (type !== "video" || !src || !isMuxHLSVideo(src)) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Handle video loaded events - Safari needs multiple event listeners
    const handleCanPlay = () => setVideoLoaded(true);
    const handleLoadedData = () => setVideoLoaded(true);
    const handleVideoPlay = () => setIsPlaying(true);
    const handleVideoPause = () => setIsPlaying(false);

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('play', handleVideoPlay);
    videoElement.addEventListener('pause', handleVideoPause);

    // Safari supports HLS natively
    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = src;
      // Force Safari to start loading the video
      videoElement.load();
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('play', handleVideoPlay);
        videoElement.removeEventListener('pause', handleVideoPause);
      };
    }

    // Load HLS.js for other browsers (dynamic import)
    const loadHLS = async () => {
      const Hls = (await import('hls.js')).default;

      if (!Hls.isSupported()) {
        return;
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
        startLevel: -1, // Auto-select quality, but will prefer higher
        capLevelToPlayerSize: false, // Allow quality higher than player size
        maxMaxBufferLength: 600, // Larger buffer for better quality
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

  // Intersection Observer for scroll-triggered video playback
  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const videoElement = videoRef.current; // Capture ref for cleanup

    const observerOptions = {
      threshold: 0.75,  // 75% visibility required (practical for most layouts)
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

  // Playback control based on visibility - pause when out of view
  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const videoElement = videoRef.current;

    const pauseVideo = () => {
      if (!videoElement.paused) {
        videoElement.pause();
        setIsPlaying(false);
      }
    };

    // Only pause when scrolled out of view, no autoplay
    if (!isInView && videoElement && isPlaying) {
      pauseVideo();
    }

    return () => {};
  }, [isInView, type, isPlaying]);

  // Reset autoplay ability when video scrolls out of view (unless it has ended)
  useEffect(() => {
    if (type !== "video") return;

    if (!isInView && !hasEnded) {
      setAutoplayExecuted(false);
    }
  }, [isInView, hasEnded, type]);

  // Autoplay logic when video comes into view (desktop only, respects reduced motion)
  useEffect(() => {
    if (
      type !== "video" ||
      !videoRef.current ||
      !videoLoaded ||
      !isInView ||
      autoplayExecuted ||
      !shouldEnableAutoplay ||
      hasEnded  // Don't autoplay if video has finished
    ) return;

    // Clear any existing timeout
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    // First video has 2-second accessibility delay, others autoplay instantly
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

  // Event handlers for video controls
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

  const aspectClasses = {
    video: "aspect-[11/6]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  const aspectClass = aspectClasses[aspectRatio] || aspectRatio;

  // Handle video end - show replay button
  const handleVideoEnded = () => {
    setHasEnded(true);
    setIsPlaying(false);
  };

  return (
    <div className={`flex flex-col gutter-xs ${className}`}>
      <div className={`w-full ${aspectClass} bg-[#F9F9F9] overflow-hidden relative`}>
        {/* Thumbnail/Poster Image - shown while video loads */}
        {thumbnail && type === "video" && (
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

        {type === "lottie" && src ? (
          <canvas
            ref={lottieRef}
            className="w-full h-full"
            style={{ display: 'block' }}
          />
        ) : type === "video" && src ? (
          <>
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

            {/* Video Controls */}
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
            <span className="text-small opacity-40">
              {type === "lottie" ? "Lottie" : type === "video" ? "Video" : "Image"}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <p className="text-tiny text-400 opacity-60 text-center">{caption}</p>
      )}
    </div>
  );
}
