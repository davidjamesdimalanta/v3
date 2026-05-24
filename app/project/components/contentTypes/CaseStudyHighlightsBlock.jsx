"use client";

import CaseStudyMediaBlock from "./CaseStudyMediaBlock";

/**
 * Case Study Highlights Block Component
 *
 * A section that pairs a bold header with a compact video grid.
 * Designed for "Final Designs" or showcase sections where multiple
 * videos should be presented side-by-side rather than stacked individually.
 *
 * @param {string} sectionHeading - Optional uppercase overline label
 * @param {string} title - Bold section heading
 * @param {string} description - Supporting paragraph text
 * @param {Array} videos - Array of { src, thumbnail, caption } objects
 */
export default function CaseStudyHighlightsBlock({
  sectionHeading,
  title,
  description,
  descriptionNode,
  videos = [],
  dark = false,
}) {
  const headingColor = dark ? "text-(--schemes-inverse-on-surface) opacity-60" : "text-(--text-color-60)";
  const titleColor   = dark ? "text-(--schemes-inverse-on-surface)" : "text-(--text-color-100)";
  const descColor    = dark ? "text-(--schemes-inverse-on-surface) opacity-80" : "text-(--text-color-80)";
  const bgClass      = dark ? "bg-(--schemes-inverse-surface)" : "";

  return (
    <div className={`px-4 md:px-8 py-16 flex flex-col items-center gutter-lg ${bgClass}`}>
      {/* Header text */}
      <div className="flex flex-col gutter-sm max-w-[1200px] mx-auto">
        {(sectionHeading || title) && (
          <div className="flex flex-col gutter-xs">
            {sectionHeading && (
              <span className={`text-sm uppercase tracking-wide ${headingColor}`}>
                {sectionHeading}
              </span>
            )}
            {title && <h2 className={`text-h3 text-600 ${titleColor}`}>{title}</h2>}
          </div>
        )}
        {(descriptionNode || description) && (
          <div className={`flex flex-col gutter-xs text-p text-400 ${descColor}`}>
            {descriptionNode || description}
          </div>
        )}
      </div>

      {/* Video grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gutter-base max-w-[1200px]">
        {videos.map((video, i) => (
          <CaseStudyMediaBlock
            key={i}
            type="video"
            src={video.src}
            thumbnail={video.thumbnail}
            size="small"
            aspectRatio="video"
            caption={video.caption}
            className="max-w-full pt-0 pb-4"
          />
        ))}
      </div>
    </div>
  );
}
