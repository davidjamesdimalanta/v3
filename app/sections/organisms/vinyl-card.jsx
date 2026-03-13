"use client";

import Image from "next/image";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

export default function VinylCard({ record, isActive, onSelect }) {
  const { playHover } = useSoundEffects();

  return (
    <button
      type="button"
      className={`group relative aspect-square rounded-md cursor-pointer hover-surface p-[2px] ${
        isActive ? "vinyl-spinning" : ""
      }`}
      onClick={() => onSelect(record.id)}
      onMouseEnter={playHover}
      aria-label={`Play ${record.artist} — ${record.song}`}
      aria-pressed={isActive}
    >
      <Image
        src={record.cover}
        alt={`${record.artist} — ${record.song}`}
        fill
        sizes="(max-width: 300px) 25vw, 12.5vw"
        className="object-cover group-hover:scale-105 transition-transform duration-150 rounded-[4px]"
      />
    </button>
  );
}
