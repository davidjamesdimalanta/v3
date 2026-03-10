"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import CaseStudyMediaBlock from "./CaseStudyMediaBlock";

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
  textStates,
  mediaTitle,
  mediaDescription,
  media,
  mediaCaption,
  children,
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = down, -1 = up
  const prevIndexRef = useRef(0);
  const childRefs = useRef([]);
  const debounceRef = useRef(null);

  const childrenArray = React.Children.toArray(children);
  const hasTextStates = textStates && textStates.length > 0;

  useEffect(() => {
    if (!hasTextStates || childrenArray.length === 0) return;

    const observers = [];

    childRefs.current.forEach((el, i) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            const prev = prevIndexRef.current;
            const newDirection = i >= prev ? 1 : -1;
            prevIndexRef.current = i;
            setDirection(newDirection);
            setActiveIndex(i);
          }, 50);
        },
        { threshold: 0.8 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      clearTimeout(debounceRef.current);
    };
  }, [hasTextStates, childrenArray.length]);

  const renderDescription = (desc) => {
    if (Array.isArray(desc)) {
      return desc.map((paragraph, index) => {
        if (
          typeof paragraph === "object" &&
          paragraph?.props?.className?.includes("flex")
        ) {
          return React.cloneElement(paragraph, { key: index });
        }
        return (
          <p key={index} className="text-p text-400 text-(--text-color-80)">
            {paragraph}
          </p>
        );
      });
    }
    return (
      <p className="text-p text-400 text-(--text-color-80)">{desc}</p>
    );
  };

  const variants = {
    initial: (dir) => ({ y: dir * 20, opacity: 0 }),
    animate: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir * -20, opacity: 0 }),
  };

  const currentState = hasTextStates ? textStates[activeIndex] ?? textStates[0] : null;

  return (
    <div className={`flex flex-col lg:flex-row lg:gutter-lg px-8 ${className}`}>
      {/* LEFT — sticky text column */}
      <aside className="flex-1 lg:basis-[720px] lg:sticky lg:top-0 lg:self-start flex flex-col gap-2 py-8">
        {hasTextStates ? (
          <>
            {sectionHeading && (
              <span className="text-sm uppercase tracking-wide text-(--text-color-60)">
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
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col gap-2"
              >
                {currentState.title && (
                  <h3 className="text-h5 text-600 text-(--text-color-100)">
                    {currentState.title}
                  </h3>
                )}
                {currentState.description && (
                  <div className="flex flex-col gap-2">
                    {renderDescription(currentState.description)}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <>
            {sectionHeading && (
              <span className="text-sm uppercase tracking-wide text-(--text-color-60)">
                {sectionHeading}
              </span>
            )}
            {title && (
              <h3 className="text-h5 text-600 text-(--text-color-100)">
                {title}
              </h3>
            )}
            {description && (
              <div className="flex flex-col gap-2">
                {renderDescription(description)}
              </div>
            )}
          </>
        )}
      </aside>

      {/* RIGHT — media column */}
      <div className="flex-1 lg:max-w-[min(75vw,120vh)] lg:flex-1 lg:basis-[75vw]">
        <div className="flex flex-col gutter-2xl">
          {mediaTitle && (
            <h4 className="text-h6 text-500 text-(--text-color-100)">
              {mediaTitle}
            </h4>
          )}
          {mediaDescription && (
            <p className="text-p text-400 text-(--text-color-80)">
              {mediaDescription}
            </p>
          )}
          {children ? (
            hasTextStates ? (
              childrenArray.map((child, i) => (
                <motion.div
                  key={i}
                  ref={(el) => { childRefs.current[i] = el; }}
                  animate={{ opacity: i === activeIndex ? 1 : 0.5 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {child}
                </motion.div>
              ))
            ) : (
              children
            )
          ) : media?.src && (
            <CaseStudyMediaBlock
              type={media.type}
              src={media.src}
              alt={media.alt}
              aspectRatio={media.aspectRatio}
              size={media.size}
              thumbnail={media.thumbnail}
              caption={media.caption}
              priority={media.priority}
            />
          )}
          {mediaCaption && (
            <p className="text-small text-400 text-(--text-color-60) text-center">
              {mediaCaption}
            </p>
          )}
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
  mediaTitle,
  mediaDescription,
  media,
  mediaCaption,
  children,
  className = "",
}) {
  const renderDescription = (desc) => {
    if (Array.isArray(desc)) {
      return desc.map((paragraph, index) => {
        if (
          typeof paragraph === "object" &&
          paragraph?.props?.className?.includes("flex")
        ) {
          return React.cloneElement(paragraph, { key: index });
        }
        return (
          <p key={index} className="text-p text-400 text-(--text-color-80)">
            {paragraph}
          </p>
        );
      });
    }
    return (
      <p className="text-p text-400 text-(--text-color-80)">{desc}</p>
    );
  };

  return (
    <div className={`flex flex-col lg:flex-row lg:gutter-lg px-8 ${className}`}>
      {/* LEFT — scrolling text column (no sticky) */}
      <aside className="flex-1 lg:basis-[720px] flex flex-col gap-2 py-8">
        {sectionHeading && (
          <span className="text-sm uppercase tracking-wide text-(--text-color-60)">
            {sectionHeading}
          </span>
        )}
        {title && (
          <h3 className="text-h5 text-600 text-(--text-color-100)">
            {title}
          </h3>
        )}
        {description && (
          <div className="flex flex-col gap-2">
            {renderDescription(description)}
          </div>
        )}
      </aside>

      {/* RIGHT — media column */}
      <div className="flex-1 lg:max-w-[min(75vw,120vh)] lg:flex-1 lg:basis-[75vw]">
        <div className="flex flex-col gap-4">
          {mediaTitle && (
            <h4 className="text-h6 text-500 text-(--text-color-100)">
              {mediaTitle}
            </h4>
          )}
          {mediaDescription && (
            <p className="text-p text-400 text-(--text-color-80)">
              {mediaDescription}
            </p>
          )}
          {children ? children : media?.src && (
            <CaseStudyMediaBlock
              type={media.type}
              src={media.src}
              alt={media.alt}
              aspectRatio={media.aspectRatio}
              size={media.size}
              thumbnail={media.thumbnail}
              caption={media.caption}
              priority={media.priority}
            />
          )}
          {mediaCaption && (
            <p className="text-small text-400 text-(--text-color-60) text-center">
              {mediaCaption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaseStudySectionBlockFixed;
