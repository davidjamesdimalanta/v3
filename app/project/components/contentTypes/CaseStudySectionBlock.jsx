"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import CaseStudyMediaBlock from "./CaseStudyMediaBlock";
import { renderDescription } from "./renderDescription";

/**
 * Case Study Section Block Component
 *
 * A self-contained, reusable block-level component that mirrors ProjectLayout's
 * sticky-left / scrollable-right split, but operates as a composable content
 * block inside a case study rather than as a page wrapper.
 *
 * @param {string} sectionHeading - Optional uppercase overline label
 * @param {string} title - Optional section main heading (used when textStates not provided)
 * @param {string|string[]} description - Optional body text (used when textStates not provided)
 * @param {Array<{sectionHeading?, title, description}>} textStates - Per-child text states for scroll-driven animation
 * @param {string} mediaTitle - Optional title shown above media in right column
 * @param {string} mediaDescription - Optional description below media title
 * @param {object} media - Props passed to CaseStudyMediaBlock
 * @param {string} mediaCaption - Optional caption shown below the media block
 * @param {string} className - Additional custom classes on outer wrapper
 */
export function CaseStudySectionBlock({
  sectionHeading,
  title,
  description,
  descriptionNode,
  textStates,
  mediaTitle,
  mediaDescription,
  media,
  mediaCaption,
  children,
  dark = false,
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = down, -1 = up
  const prevIndexRef = useRef(0);
  const childRefs = useRef([]);
  const rafRef = useRef(null);

  const childrenArray = React.Children.toArray(children);
  const hasTextStates = textStates && textStates.length > 0;

  const headingColor = dark ? "text-(--text-lightcolor-60)" : "text-(--text-color-60)";
  const titleColor   = dark ? "text-(--text-lightcolor-100)" : "text-(--text-color-100)";
  const descColor    = dark ? "text-(--schemes-inverse-on-surface)" : "text-(--schemes-on-surface)";
  const bgClass      = dark ? "bg-(--schemes-inverse-surface)" : "";

  useEffect(() => {
    if (!hasTextStates || childrenArray.length === 0) return;

    const TARGET_Y = window.innerHeight * 0.45;

    function pickWinner() {
      let bestIndex = 0;
      let bestDistance = Infinity;

      childRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - TARGET_Y);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
        }
      });

      const prev = prevIndexRef.current;
      if (bestIndex !== prev) {
        const newDirection = bestIndex > prev ? 1 : -1;
        prevIndexRef.current = bestIndex;
        setDirection(newDirection);
        setActiveIndex(bestIndex);
      }
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        pickWinner();
      });
    }

    // Seed initial state without waiting for a scroll event
    pickWinner();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [hasTextStates, childrenArray.length]);

  const variants = {
    initial: (dir) => ({ y: dir * 20, opacity: 0 }),
    animate: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir * -20, opacity: 0 }),
  };

  const currentState = hasTextStates ? textStates[activeIndex] ?? textStates[0] : null;

  const rightColumnContent = (() => {
    if (!children) return media?.src ? <CaseStudyMediaBlock {...media} /> : null;
    if (!hasTextStates) return children;
    return childrenArray.map((child, i) => {
      const state = textStates[i] ?? textStates[0];
      return (
        <motion.article
          key={i}
          ref={(el) => { childRefs.current[i] = el; }}
          aria-label={state?.title}
          animate={{ opacity: i === activeIndex ? 1 : 0.5 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-lg:opacity-100!"
        >
          {/* AT-only: heading then description, each a separate block */}
          {state?.title && (
            <h2 className="sr-only">{state.title}</h2>
          )}
          {state?.description && (
            <p className="sr-only">
              {Array.isArray(state.description)
                ? state.description.join(" ")
                : state.description}
            </p>
          )}

          {/* Mobile-only visual text (hidden from AT to avoid double-reading) */}
          <div aria-hidden="true" className="flex flex-col gutter-sm mb-0 lg:hidden">
            {(i === 0 && sectionHeading) || state?.title ? (
              <div className="flex flex-col gutter-xs">
                {i === 0 && sectionHeading && (
                  <span className={`text-sm uppercase tracking-wide ${headingColor}`}>
                    {sectionHeading}
                  </span>
                )}
                {state?.title && (
                  <h2 className={`text-h4 text-600 ${titleColor}`}>{state.title}</h2>
                )}
              </div>
            ) : null}
            {state?.description && (
              <div className="flex flex-col gutter-xs">
                {renderDescription(state.description, descColor)}
              </div>
            )}
          </div>
          {child}
        </motion.article>
      );
    });
  })();

  return (
    <div className={`flex flex-col lg:flex-row lg:gutter-lg px-4 xl:px-0 ${bgClass} ${className}`}>
      {/* LEFT — sticky text column (aria-hidden when textStates: AT content lives in right column) */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gutter-md">
      <aside
        aria-hidden={hasTextStates ? "true" : undefined}
        className={`${hasTextStates ? 'hidden lg:flex gutter-xs' : 'flex gutter-sm'} flex-1 lg:basis-[720px] lg:sticky lg:top-[45dvh] lg:self-start flex-col py-0`}
      >
        {hasTextStates ? (
          <>
            {sectionHeading && (
              <span className={`text-sm uppercase tracking-wide ${headingColor}`}>
                {sectionHeading}
              </span>
            )}

            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gutter-sm"
              >
                {currentState.title && (
                  <h2 className={`text-h4 text-600 ${titleColor}`}>
                    {currentState.title}
                  </h2>
                )}
                {currentState.description && (
                  <div className="flex flex-col gutter-xs">
                    {renderDescription(currentState.description, descColor)}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <>
            {(sectionHeading || title) && (
              <div className="flex flex-col gutter-xs">
                {sectionHeading && (
                  <span className={`text-sm uppercase tracking-wide ${headingColor}`}>
                    {sectionHeading}
                  </span>
                )}
                {title && (
                  <h2 className={`text-h4 text-600 ${titleColor}`}>
                    {title}
                  </h2>
                )}
              </div>
            )}
            {(descriptionNode || description) && (
              <div className="flex flex-col gutter-xs">
                {descriptionNode || renderDescription(description, descColor)}
              </div>
            )}
          </>
        )}
      </aside>

      {/* RIGHT — media column */}
      <div className="flex-1 lg:max-w-[min(75vw,120vh)] lg:flex-1 lg:basis-[75vw]">
        <div className="flex flex-col gutter-lg">
          {mediaTitle && (
            <h4 className={`text-h6 text-500 ${titleColor}`}>
              {mediaTitle}
            </h4>
          )}
          {mediaDescription && (
            <p className={`text-p text-400 ${descColor}`}>
              {mediaDescription}
            </p>
          )}
          {rightColumnContent}
          {mediaCaption && (
            <p className={`text-small text-400 ${headingColor} text-center`}>
              {mediaCaption}
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

/**
 * CaseStudySectionBlockScroll
 *
 * Identical to CaseStudySectionBlock but the left column scrolls normally
 * with the page (no `lg:sticky`). No text loop animation. Reserved for future extension.
 */
export function CaseStudySectionBlockFixed({
  sectionHeading,
  title,
  description,
  descriptionNode,
  mediaTitle,
  mediaDescription,
  media,
  mediaCaption,
  children,
  dark = false,
  className = "",
}) {
  const headingColor = dark ? "text-(--text-lightcolor-60)" : "text-(--text-color-60)";
  const titleColor   = dark ? "text-(--text-lightcolor-100)" : "text-(--text-color-100)";
  const descColor    = dark ? "text-(--schemes-inverse-on-surface)" : "text-(--schemes-on-surface)";
  const bgClass      = dark ? "bg-(--schemes-inverse-surface)" : "";

  return (
    <div className={`flex flex-col lg:flex-row lg:items-center lg:gutter-lg px-4 xl:px-0 w-full max-w-[1200px] mx-auto ${bgClass} ${className}`}>
      {/* LEFT — scrolling text column (no sticky) */}
      <aside className="flex-1 lg:basis-[720px] flex flex-col gutter-sm py-8">
        {(sectionHeading || title) && (
          <div className="flex flex-col gutter-xs">
            {sectionHeading && (
              <span className={`text-sm uppercase tracking-wide ${headingColor}`}>
                {sectionHeading}
              </span>
            )}
            {title && (
              <h2 className={`text-h4 text-600 ${titleColor}`}>
                {title}
              </h2>
            )}
          </div>
        )}
        {(descriptionNode || description) && (
          <div className="flex flex-col gutter-xs">
            {descriptionNode || renderDescription(description, descColor)}
          </div>
        )}
      </aside>

      {/* RIGHT — media column */}
      <div className="flex-1 lg:max-w-[min(75vw,120vh)] lg:flex-1 lg:basis-[75vw]">
        <div className="flex flex-col gutter-sm">
          {mediaTitle && (
            <h4 className={`text-h6 text-500 ${titleColor}`}>
              {mediaTitle}
            </h4>
          )}
          {mediaDescription && (
            <p className={`text-p text-400 ${descColor}`}>
              {mediaDescription}
            </p>
          )}
          {children ? children : media?.src && (
            <CaseStudyMediaBlock {...media} />
          )}
          {mediaCaption && (
            <p className={`text-small text-400 ${headingColor} text-center`}>
              {mediaCaption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaseStudySectionBlockFixed;
