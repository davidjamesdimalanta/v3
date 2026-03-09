"use client";

import React from "react";
import CaseStudyMediaBlock from "./CaseStudyMediaBlock";

/**
 * Case Study Section Block Component
 *
 * A self-contained, reusable block-level component that mirrors ProjectLayout's
 * sticky-left / scrollable-right split, but operates as a composable content
 * block inside a case study rather than as a page wrapper.
 *
 * @param {string} sectionHeading - Optional uppercase overline label
 * @param {string} title - Optional section main heading
 * @param {string|string[]} description - Optional body text (string or array of paragraphs)
 * @param {string} mediaTitle - Optional title shown above media in right column
 * @param {string} mediaDescription - Optional description below media title
 * @param {object} media - Props passed to CaseStudyMediaBlock (type, src, alt, aspectRatio, size, thumbnail, caption, priority)
 * @param {string} mediaCaption - Optional caption shown below the media block
 * @param {string} className - Additional custom classes on outer wrapper
 */
export default function CaseStudySectionBlock({
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
        // If it's already a block-level flex container, render as-is without wrapping in <p>
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
    <div
      className={`flex flex-col lg:flex-row lg:gutter-lg px-8 ${className}`}
    >
      {/* LEFT — sticky text column */}
      <aside className="flex-1 lg:basis-[720px] lg:sticky lg:top-0 lg:self-start flex flex-col gap-2 py-8">
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
