"use client";

import { useState } from "react";
import BentoHeroStage from "./BentoHeroStage";
import BentoMetaCell from "./BentoMetaCell";
import BentoPreviewGrid from "./BentoPreviewGrid";

export default function ProjectBento({ project, priority = false, animate = true, prefersReducedMotion = false }) {
  const media = project.bentoMedia ?? [];
  const previewMedia = Object.values(project.bentoPreview?.sources ?? {});
  const showPreview = project.bentoPreview?.enabled === true && previewMedia.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex = media.length > 0 && activeIndex >= media.length ? 0 : activeIndex;
  const containerGutterClass = showPreview ? "gutter-xs md:gutter-md" : "gutter-md";
  const contentGutterClass = showPreview ? "gutter-md md:gutter-sm" : "gutter-sm";

  const fallbackThumbnail = project.bento?.thumbnail || project.coverImageDark || project.coverImage;

  return (
    <div
      className={`flex flex-col md:flex-row ${containerGutterClass} md:h-[600px] w-full fade-up-hidden ${animate ? "fade-up-visible" : ""}`}
      style={{ transitionDuration: prefersReducedMotion ? "0s" : "0.4s" }}
    >
      <BentoHeroStage
        media={media}
        fallbackThumbnail={fallbackThumbnail}
        title={project.name}
        href={`/project/${project.slug}`}
        activeIndex={safeActiveIndex}
        priority={priority}
        prefersReducedMotion={prefersReducedMotion}
      />
      <div className={`flex flex-col md:grid md:grid-rows-2 ${contentGutterClass} flex-1 min-w-0`}>
        <div className="order-2 h-full min-h-0 md:order-1">
          <BentoMetaCell project={project} />
        </div>
        {showPreview && (
          <div className="order-1 min-h-0 md:order-2 md:flex">
            <BentoPreviewGrid
              media={previewMedia}
              fallbackThumbnail={fallbackThumbnail}
              activeIndex={safeActiveIndex}
              onSelect={setActiveIndex}
              priority={priority}
            />
          </div>
        )}
      </div>
    </div>
  );
}
