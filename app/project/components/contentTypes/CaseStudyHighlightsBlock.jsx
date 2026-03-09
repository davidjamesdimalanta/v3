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
  videos = [],
}) {
  return (
    <div className="px-8 py-16 flex flex-col gutter-lg">
      {/* Header text */}
      <div className="flex flex-col gutter-xs max-w-2xl">
        {sectionHeading && (
          <span className="text-sm uppercase tracking-wide text-(--text-color-60)">
            {sectionHeading}
          </span>
        )}
        <h3 className="text-h3 text-600 text-(--text-color-100)">{title}</h3>
        <p className="text-p text-400 text-(--text-color-80)">{description}</p>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
