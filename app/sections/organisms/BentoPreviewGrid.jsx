"use client";

import Image from "next/image";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

export default function BentoPreviewGrid({ media = [], fallbackThumbnail, activeIndex, onSelect, priority = false }) {
  const { playHover } = useSoundEffects();
  const visibleMedia = media.slice(0, 6);

  return (
    <div className="grid grid-cols-[repeat(3,44px)] md:grid-cols-3 grid-rows-[repeat(2,max-content)]! items-start content-start gap-3 w-hug md:w-full md:flex-1 min-h-0" aria-label="Project media previews">
      {visibleMedia.map((item, index) => {
        const thumbnail = item?.thumbnail || (item?.type === "image" ? item.src : fallbackThumbnail);
        const isActive = index === activeIndex;

        return (
          <button
            key={`${item.src}-${index}`}
            type="button"
            className={`relative size-[44px] md:size-auto md:aspect-square self-start rounded-[16px] bd hover:bd-active hover-surface overflow-hidden min-w-[44px] min-h-[44px] bg-surface-dim cursor-pointer focus-visible:outline-2 focus-visible:outline-(--schemes-primary) focus-visible:outline-offset-2 ${
              isActive ? "outline-2 outline-(--schemes-primary)" : ""
            }`}
            onClick={() => onSelect(index)}
            onMouseEnter={playHover}
            aria-pressed={isActive}
            aria-label={item.caption || `Media ${index + 1}`}
          >
            {thumbnail ? (
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
            )}
            {!isActive && <span className="absolute inset-0 bg-black/20" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
