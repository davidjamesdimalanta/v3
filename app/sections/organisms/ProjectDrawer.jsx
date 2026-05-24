"use client";

import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import Image from "next/image";
import Button from "../../ui/Button";
import { useIsDarkTheme } from "../../ui/hooks/useIsDarkTheme";

const isMuxHLS = (url) =>
  typeof url === "string" && (url.includes(".m3u8") || url.includes("stream.mux.com"));

function DrawerVideo({ src, thumbnail, name }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const videoLoaded = Boolean(src && loadedSrc === src);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;

    const onReady = () => {
      setLoadedSrc(src);
      el.play().catch(() => {});
    };

    el.addEventListener("canplay", onReady, { once: true });

    if (!isMuxHLS(src)) {
      el.src = src;
      el.load();
    } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = src;
      el.load();
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (!Hls.isSupported()) return;
        const hls = new Hls({ startLevel: -1, capLevelToPlayerSize: false });
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(el);
      });
    }

    return () => {
      el.removeEventListener("canplay", onReady);
      el.pause();
      el.removeAttribute("src");
      el.load();
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

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
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="w-full h-full object-cover"
      />
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
 * We keep a ref to the last non-null `project` so the drawer content stays
 * rendered during the 500 ms closing animation. Without this, the parent
 * would set `project` to null the instant `open` becomes false, causing the
 * drawer to flash blank before it slides out.
 */
export default function ProjectDrawer({ open, onOpenChange, project }) {
  useDrawerBodyLock(open);

  const renderProject = project;
  const isDarkTheme = useIsDarkTheme();

  // If we've never had a project at all, nothing to render
  if (!renderProject) return null;

  const { slug, name, title, coverVideo, coverVideoDark, coverImage, problem, solutions, takeaways, comingSoon } =
    renderProject;
  const activeCoverVideo = isDarkTheme && coverVideoDark ? coverVideoDark : coverVideo;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-[24px] bd flex flex-col max-h-[90vh] outline-none"
        >
          <Drawer.Title className="sr-only">{name}</Drawer.Title>

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
                        soundEffect="navigateProject"
                      />
                    )}
                  </div>
                </header>
              </div>

              {/* Hero media (Matches text max-width 700px container) */}
              {(activeCoverVideo || coverImage) && (
                <div className="max-w-[700px] w-full mx-auto mt-8 mb-8">
                  {activeCoverVideo ? (
                    <DrawerVideo src={activeCoverVideo} thumbnail={coverImage} name={name} />
                  ) : coverImage ? (
                    <div className="relative w-full aspect-video rounded-[16px] overflow-hidden border-[0.5px] border-(--text-color-80)">
                      <Image
                        src={coverImage}
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
