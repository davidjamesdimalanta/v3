"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DotLottie } from "@lottiefiles/dotlottie-web";

const isMuxHLSVideo = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('.m3u8') || url.includes('stream.mux.com');
};

export default function MediaBlock({
  type = "image", // "image", "video", or "lottie"
  src,
  alt = "",
  caption,
  thumbnail, // Optional thumbnail/poster image (e.g., Mux thumbnail)
  aspectRatio = "video", // "video" (16:9), "square", "portrait", or custom class
  className = ""
}) {
  const lottieRef = useRef(null);
  const dotLottieInstanceRef = useRef(null);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

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

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('loadeddata', handleLoadedData);

    // Safari supports HLS natively
    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = src;
      // Force Safari to start loading the video
      videoElement.load();
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      };
    }

    // Load HLS.js for other browsers (dynamic import)
    const loadHLS = async () => {
      const Hls = (await import('hls.js')).default;

      if (!Hls.isSupported()) {
        console.error('HLS is not supported in this browser');
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

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('Fatal HLS error:', data);
        }
      });
    };

    loadHLS();

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
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

        // Reset playback state when leaving view to enable replay
        if (!entry.isIntersecting) {
          setHasPlayedOnce(false);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
      observer.disconnect();
    };
  }, [type]);

  // Playback control based on visibility
  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const videoElement = videoRef.current;
    let canPlayHandler = null;

    const playVideo = async () => {
      // Safari requires video to be ready before playing
      if (videoElement.readyState < 3) {
        // Wait for video to be ready
        canPlayHandler = async () => {
          try {
            await videoElement.play();
            setHasPlayedOnce(true);
          } catch (error) {
            console.error('Video playback failed:', error);
          }
        };
        videoElement.addEventListener('canplay', canPlayHandler, { once: true });
      } else {
        try {
          await videoElement.play();
          setHasPlayedOnce(true);
        } catch (error) {
          console.error('Video playback failed:', error);
        }
      }
    };

    const pauseVideo = () => {
      if (!videoElement.paused) {
        videoElement.pause();
      }
    };

    if (isInView && !hasPlayedOnce) {
      playVideo();
    } else if (!isInView && videoElement) {
      pauseVideo();
    }

    // Cleanup function
    return () => {
      if (canPlayHandler) {
        videoElement.removeEventListener('canplay', canPlayHandler);
      }
    };
  }, [isInView, hasPlayedOnce, type]);

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  const aspectClass = aspectClasses[aspectRatio] || aspectRatio;

  // Handle video end - allow replay on next scroll-in
  const handleVideoEnded = () => {
    setHasPlayedOnce(false);
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
          <video
            ref={videoRef}
            preload="metadata"
            loop
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
