"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { TextScramble } from "@/components/motion-primitives/text-scramble";
import { vinylRecords } from "../about-data";
import VinylCard from "./vinyl-card";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

function isMusicAllowed() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return localStorage.getItem("audioPermission") === "allowed";
}

export default function VinylSection() {
  const [activeVinylId, setActiveVinylId] = useState(null);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [showSoundModal, setShowSoundModal] = useState(false);
  const audioRef = useRef(null);
  const { playNavigateProject } = useSoundEffects();

  const handleEnableSound = () => {
    try {
      localStorage.setItem('audioPermission', 'allowed');
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  const activeRecord = vinylRecords.find((r) => r.id === activeVinylId);
  const nowPlayingText = activeRecord
    ? `${activeRecord.artist} — ${activeRecord.song}`
    : "Select a record";

  const handleSelect = useCallback(
    (id) => {
      const audio = audioRef.current;

      if (id === activeVinylId) {
        // Deselect — stop playback
        setActiveVinylId(null);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      } else {
        // Select new vinyl
        setActiveVinylId(id);
        if (isMusicAllowed()) {
          if (audio) {
            const record = vinylRecords.find((r) => r.id === id);
            if (record?.audioSrc) {
              audio.pause();
              audio.src = record.audioSrc;
              audio.volume = 0.4;
              audio.load();
              audio.play().catch(() => {});
            }
          }
        } else {
          setShowSoundModal(true);
        }
      }

      setScrambleTrigger((prev) => !prev);
      playNavigateProject();
    },
    [activeVinylId, playNavigateProject]
  );

  // Pause audio on unmount (navigation away)
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-col gutter-base">

      <span className="text-p text-300">
        the sounds of my soul.
      </span>

      <div className="grid grid-cols-3 md:grid-cols-4 gutter-sm">
        {vinylRecords.map((record) => (
          <VinylCard
            key={record.id}
            record={record}
            isActive={activeVinylId === record.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="flex flex-col gutter-xs">
        <span className="text-[#799A92] uppercase tracking-wide text-sm">
          Now Playing:
        </span>
        <TextScramble
          as="span"
          className="text-p"
          trigger={scrambleTrigger}
          speed={0.03}
        >
          {nowPlayingText}
        </TextScramble>
      </div>

      <audio ref={audioRef} loop hidden />

      {showSoundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSoundModal(false)}
          />
          <div className="relative rounded-sm px-6 py-5 shadow-md bg-[#ECEAE9] border border-[#D6CAC8] text-[#3A1F1E] w-72 flex flex-col gap-4">
            <p className="text-p">Enable sound to play music?</p>
            <div className="flex gap-3">
              <button
                onClick={handleEnableSound}
                className="flex-1 px-4 py-2 rounded-sm bg-[#3A1F1E] text-[#ECEAE9] text-sm cursor-pointer hover:opacity-80 transition-opacity"
              >
                Enable Sound
              </button>
              <button
                onClick={() => setShowSoundModal(false)}
                className="flex-1 px-4 py-2 rounded-sm border border-[#D6CAC8] text-sm cursor-pointer hover:bg-[#D6CAC8] transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
