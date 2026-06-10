"use client";

import Image from "next/image";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

export default function BentoPreviewGrid({ media = [], fallbackThumbnail, activeIndex, onSelect, priority = false }) {
  const { playHover } = useSoundEffects();
  const visibleMedia = media.slice(0, 6);

  return (
    <div className="flex flex-row flex-wrap md:grid md:grid-cols-3 md:![grid-template-rows:repeat(2,max-content)] items-start content-start gap-3 w-full md:flex-1 min-h-0" aria-label="Project media previews">
      {visibleMedia.map((item, index) => {
        const thumbnail = item?.thumbnail || (item?.type === "image" ? item.src : fallbackThumbnail);
        const isActive = index === activeIndex;
        const previewClassName =
          "relative size-[44px] md:size-auto md:aspect-square self-start rounded-[16px] overflow-hidden min-w-[44px] min-h-[44px] bg-surface-dim";
        const media = thumbnail ? (
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="(max-width: 768px) 33vw, 130px"
            loading={priority && index === 0 ? "eager" : "lazy"}
            fetchPriority={priority && index === 0 ? "high" : undefined}
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 bg-surface-dim" />
        );

        if (isActive) {
          return (
            <div
              key={`${item.src}-${index}`}
              className={`${previewClassName} shadow-none`}
              aria-current="true"
              aria-label={item.caption || `Media ${index + 1}`}
            >
              {media}
              <span className="pointer-events-none absolute inset-0 rounded-[inherit] sunken" aria-hidden="true" />
            </div>
          );
        }

        return (
          <button
            key={`${item.src}-${index}`}
            type="button"
            className={`${previewClassName} bd hover:bd-active hover-surface cursor-pointer focus-visible:outline-2 focus-visible:outline-(--schemes-primary) focus-visible:outline-offset-2`}
            onClick={() => onSelect(index)}
            onMouseEnter={playHover}
            aria-label={item.caption || `Media ${index + 1}`}
          >
            {media}
            <span className="absolute inset-0 bg-black/20" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
