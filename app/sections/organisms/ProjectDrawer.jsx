"use client";

import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import Image from "next/image";
import Button from "../../ui/Button";
import { useIsDarkTheme } from "../../ui/hooks/useIsDarkTheme";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

const isMuxHLS = (url) =>
  typeof url === "string" && (url.includes(".m3u8") || url.includes("stream.mux.com"));

const MOBILE_DRAWER_MEDIA_QUERY = "(max-width: 767px), (hover: none) and (pointer: coarse)";
const DRAWER_VIDEO_PLAY_DELAY_MS = 500;

const isMobileDrawerViewport = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(MOBILE_DRAWER_MEDIA_QUERY).matches;

function getDrawerPlaybackSrc(src) {
  if (!isMuxHLS(src) || typeof window === "undefined" || !isMobileDrawerViewport()) return src;

  const url = new URL(src);
  url.searchParams.delete("min_resolution");
  url.searchParams.set("max_resolution", "720p");
  return url.toString();
}

function DrawerVideo({ src, hevcSrc, thumbnail, name, active }) {
  const videoRef = useRef(null);
  const [playbackSrc, setPlaybackSrc] = useState(null);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const videoLoaded = Boolean(playbackSrc && loadedSrc === playbackSrc);

  useEffect(() => {
    if (!src) {
      setPlaybackSrc(null);
      return;
    }

    const mediaQuery =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia(MOBILE_DRAWER_MEDIA_QUERY)
        : null;
    const updatePlaybackSrc = () => setPlaybackSrc(getDrawerPlaybackSrc(src));

    updatePlaybackSrc();
    if (!mediaQuery) return;

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePlaybackSrc);
      return () => mediaQuery.removeEventListener("change", updatePlaybackSrc);
    }

    mediaQuery.addListener?.(updatePlaybackSrc);
    return () => mediaQuery.removeListener?.(updatePlaybackSrc);
  }, [src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !playbackSrc || !active) {
      setLoadedSrc(null);
      return;
    }

    let cancelled = false;
    let hlsInstance = null;
    const isMobile = isMobileDrawerViewport();
    const playTimer = window.setTimeout(() => {
      if (!cancelled) el.play().catch(() => {});
    }, DRAWER_VIDEO_PLAY_DELAY_MS);

    const onReady = () => {
      if (!cancelled) setLoadedSrc(playbackSrc);
    };

    setLoadedSrc(null);
    el.addEventListener("canplay", onReady);
    el.addEventListener("loadeddata", onReady);

    if (!isMuxHLS(playbackSrc)) {
      el.load();
    } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = playbackSrc;
      el.load();
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return;

        hlsInstance = new Hls({
          autoStartLoad: true,
          capLevelOnFPSDrop: true,
          capLevelToPlayerSize: true,
          enableWorker: true,
          maxBufferLength: isMobile ? 6 : 10,
          maxMaxBufferLength: isMobile ? 10 : 20,
          startLevel: isMobile ? 0 : -1,
        });
        hlsInstance.loadSource(playbackSrc);
        hlsInstance.attachMedia(el);
      });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(playTimer);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("loadeddata", onReady);
      el.pause();
      el.removeAttribute("src");
      el.load();
      hlsInstance?.destroy();
    };
  }, [playbackSrc, hevcSrc, active]);

  return (
    <div className="relative w-full aspect-video rounded-[16px] overflow-hidden border-[0.5px] border-(--text-color-80)">
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={`${name} cover`}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className={`object-cover transition-opacity duration-500 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
        />
      )}
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
        {playbackSrc && !isMuxHLS(playbackSrc) && (
          <>
            <source src={playbackSrc} />
            {hevcSrc && <source src={hevcSrc} type='video/quicktime; codecs="hvc1"' />}
          </>
        )}
      </video>
    </div>
  );
}

/**
 * Lock the body with custom inline styles while the drawer is open,
 * and stop Lenis smooth-scroll so the drawer content can scroll natively.
 */
function useDrawerBodyLock(isOpen) {
  useEffect(() => {
    if (!isOpen) return;

    // --- Stop Lenis so it doesn't hijack scroll inside the drawer ---
    const lenis = typeof window !== "undefined" ? window.lenis : null;
    if (lenis) lenis.stop();

    return () => {
      // --- Restart Lenis when drawer closes ---
      if (lenis) lenis.start();
    };
  }, [isOpen]);
}

/**
 * ProjectDrawer — Figma node 838:536
 * Vertically stacked: Header → Hero media → Problem → Solutions → Takeaways
 * 1200px outer frame, 700px content column, scrollable body, primary CTA.
 *
 * IMPORTANT — Unmount lifecycle:
 * Parents keep `project` populated until Vaul reports the close animation has
 * finished. Clearing it earlier unmounts the drawer before `data-state="closed"`
 * can animate.
 */
export default function ProjectDrawer({
  open,
  onOpenChange,
  onCloseAnimationEnd,
  project,
}) {
  useDrawerBodyLock(open);

  const renderProject = project;
  const isDarkTheme = useIsDarkTheme();
  const { playNavigateProject } = useSoundEffects();

  // If we've never had a project at all, nothing to render
  if (!renderProject) return null;

  const { slug, name, title, coverVideo, coverVideoHevc, coverVideoDark, coverVideoDarkHevc, coverImage, coverImageDark, problem, solutions, takeaways, comingSoon } =
    renderProject;
  const activeCoverVideo = isDarkTheme && coverVideoDark ? coverVideoDark : coverVideo;
  const activeCoverVideoHevc = isDarkTheme && coverVideoDark ? coverVideoDarkHevc : coverVideoHevc;
  const activeCoverImage = isDarkTheme && coverImageDark ? coverImageDark : coverImage;
  const handleFullCaseStudyClick = () => {
    playNavigateProject();
    onOpenChange?.(false);
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      onAnimationEnd={(isOpen) => {
        if (isOpen) return;
        onCloseAnimationEnd?.();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-[24px] bd flex flex-col max-h-[90vh] outline-none"
        >
          <Drawer.Title className="sr-only">{name}</Drawer.Title>
          <Drawer.Description className="sr-only">
            Project preview for {name}
          </Drawer.Description>

          {/* Drawer cutoff bump — matches Figma 838:579 */}
          <div className="mx-auto mt-4 h-1 w-9 shrink-0 rounded-full bg-on-surface-variant opacity-30" />

          {/* Scrollable body — outer 1200px frame, inner 700px column */}
          <div className="flex-1 overflow-y-auto select-text min-h-0" data-vaul-no-drag data-lenis-prevent>
            <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-8 md:py-10">
              <div className="max-w-[700px] w-full mx-auto flex flex-col gutter-lg">
                {/* Header — title cluster + primary CTA */}
                <header className="flex flex-col md:flex-row md:items-start gutter-base md:justify-between">
                  <div className="flex flex-col min-w-0 flex-1">
                    <h2 className="t-h5 text-on-surface">
                      {name}
                    </h2>
                    {title && <p className="t-sm text-on-surface-variant">{title}</p>}
                  </div>
                  <div className="shrink-0">
                    {comingSoon ? (
                      <Button
                        text="Coming Soon"
                        variant="primary"
                        disabled
                        aria-disabled="true"
                      />
                    ) : (
                      <Button
                        text="Full Case Study"
                        href={`/project/${slug}`}
                        variant="primary"
                        soundEffect="hover"
                        onClick={handleFullCaseStudyClick}
                      />
                    )}
                  </div>
                </header>
              </div>

              {/* Hero media (Matches text max-width 700px container) */}
              {(activeCoverVideo || activeCoverImage) && (
                <div className="max-w-[700px] w-full mx-auto mt-8 mb-8">
                  {activeCoverVideo ? (
                    <DrawerVideo
                      src={activeCoverVideo}
                      hevcSrc={activeCoverVideoHevc}
                      thumbnail={activeCoverImage}
                      name={name}
                      active={open}
                    />
                  ) : activeCoverImage ? (
                    <div className="relative w-full aspect-video rounded-[16px] overflow-hidden border-[0.5px] border-(--text-color-80)">
                      <Image
                        src={activeCoverImage}
                        alt={`${name} cover`}
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              )}

              <div className="max-w-[700px] w-full mx-auto flex flex-col gutter-xl">
                {/* The Problem */}
                {problem?.description && (
                  <section className="flex flex-col gutter-xs">
                    <h3 className="t-label text-on-surface-variant">{problem.title ?? "The Problem"}</h3>
                    <p className="t-p text-on-surface">{problem.description}</p>
                  </section>
                )}

                {/* The Solution(s) */}
                {solutions?.items?.length > 0 && (
                  <section className="flex flex-col gutter-xs">
                    <h3 className="t-label text-on-surface-variant">{solutions.title ?? "The Solution"}</h3>
                    <div className="flex flex-col gutter-sm">
                      {solutions.items.map((sol, i) => (
                        <article key={i} className="flex flex-col">
                          <h4 className="t-p text-on-surface text-600">{sol.title}</h4>
                          <p className="t-p text-on-surface-variant">{sol.description}</p>
                          {sol.media && (
                            <div className="relative w-full aspect-video rounded-[16px] overflow-hidden bg-surface-container mt-2">
                              <Image
                                src={sol.media}
                                alt={sol.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 700px"
                                className="object-cover"
                              />
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                {/* Takeaways */}
                {takeaways?.items?.length > 0 && (
                  <section className="flex flex-col gutter-xs">
                    <h3 className="t-label text-on-surface-variant">{takeaways.title ?? "Takeaways"}</h3>
                    <div className="flex flex-col gutter-sm">
                      {takeaways.items.map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <h4 className="t-p text-on-surface text-600">{item.title}</h4>
                          <p className="t-p text-on-surface-variant">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
