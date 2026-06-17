"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CaseStudyMediaBlock from "./CaseStudyMediaBlock";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Cursor } from "@/components/motion-primitives/cursor";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/motion-primitives/morphing-dialog";
import { useMediaQuery } from "../../../ui/hooks/useMediaQuery";

export default function CaseStudyMorphingMediaBlock({
  type = "image",
  src,
  alt = "",
  caption,
  className = "",
  ...mediaProps
}) {
  const wrapperRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const isImage = type === "image";
  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const showCursor = isImage && !isTouchDevice && !prefersReducedMotion;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeInOut" };
  const dialogItemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        },
      };

  useEffect(() => {
    if (!showCursor) return undefined;

    const handleMouseMove = (event) => {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      const nextIsHovering = Boolean(
        target && wrapperRef.current?.contains(target)
      );
      setIsHovering((current) =>
        current === nextIsHovering ? current : nextIsHovering
      );
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showCursor]);

  if (!isImage || !src) {
    return (
      <CaseStudyMediaBlock
        {...mediaProps}
        type={type}
        src={src}
        alt={alt}
        caption={caption}
        className={className}
      />
    );
  }

  const dialogLabel = caption || alt || "Case study image";

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={() => setIsHovering(false)}
      onPointerEnter={() => setIsHovering(true)}
      onPointerMove={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      onPointerDown={() => setIsHovering(false)}
    >
      <MorphingDialog transition={transition}>
        <MorphingDialogTrigger
          ariaLabel={`View full image: ${dialogLabel}`}
          className="block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--schemes-primary)"
        >
          <CaseStudyMediaBlock
            {...mediaProps}
            type={type}
            src={src}
            alt={alt}
            caption={undefined}
            className={className}
          />
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative flex max-h-[80dvh] max-w-[min(96vw,1400px)] flex-col items-center overflow-visible">
            <MorphingDialogTitle className="sr-only">
              {dialogLabel}
            </MorphingDialogTitle>
            <AnimatedGroup
              className="flex flex-col items-center"
              variants={{
                container: {
                  visible: { transition: { staggerChildren: 0.08 } },
                },
                item: dialogItemVariants,
              }}
            >
              <div className="relative max-h-[80dvh] h-[80dvh] w-[96vw] max-w-[1400px]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="96vw"
                  draggable={false}
                  className="object-contain select-none"
                />
              </div>
              {caption ? (
                <MorphingDialogDescription
                  disableLayoutAnimation
                  className="mt-3 max-w-[min(92vw,840px)] text-center text-small text-400 text-(--text-color-60)"
                >
                  <p>{caption}</p>
                </MorphingDialogDescription>
              ) : (
                <MorphingDialogDescription disableLayoutAnimation className="sr-only">
                  Full-size case study image.
                </MorphingDialogDescription>
              )}
            </AnimatedGroup>
          </MorphingDialogContent>
          <MorphingDialogClose
            className="fixed right-2 top-8 md:right-4 md:top-20 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bd text-(--text-color) hover:bd-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--schemes-primary)"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { delay: 0.2, duration: 0.1 },
              },
              exit: { opacity: 0, transition: { duration: 0 } },
            }}
          />
        </MorphingDialogContainer>
      </MorphingDialog>
      {showCursor && (
        <Cursor
          isVisible={isHovering}
          springConfig={{ bounce: 0.001 }}
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
        >
          <div className="flex items-center gutter-xs rounded-full bg-(--bg-color) px-4 py-3 shadow-[0_0_4px_2px_oklch(from_var(--primary-500)_l_c_h_/_0.3)] text-button text-400 text-(--text-color) whitespace-nowrap">
            View Full
          </div>
        </Cursor>
      )}
    </div>
  );
}
