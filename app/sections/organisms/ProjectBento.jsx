"use client";

import { useEffect, useState } from "react";
import BentoHeroStage from "./BentoHeroStage";
import BentoMetaCell from "./BentoMetaCell";
import BentoPreviewGrid from "./BentoPreviewGrid";

export default function ProjectBento({ project, priority = false, animate = true, prefersReducedMotion = false }) {
  const media = project.bentoMedia ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (media.length > 0 && activeIndex >= media.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, media.length]);

  const fallbackThumbnail = project.bento?.thumbnail || project.coverImageDark || project.coverImage;

  return (
    <div
      className={`flex flex-col md:flex-row gutter-sm md:h-[600px] w-full fade-up-hidden ${animate ? "fade-up-visible" : ""}`}
      style={{ transitionDuration: prefersReducedMotion ? "0s" : "0.4s" }}
    >
      <BentoHeroStage
        media={media}
        fallbackThumbnail={fallbackThumbnail}
        title={project.name}
        activeIndex={activeIndex}
        priority={priority}
        prefersReducedMotion={prefersReducedMotion}
      />
      <div className="flex flex-col gutter-sm flex-1 min-w-0">
        <BentoPreviewGrid
          media={media}
          fallbackThumbnail={fallbackThumbnail}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          priority={priority}
        />
        <BentoMetaCell project={project} />
      </div>
    </div>
  );
}
