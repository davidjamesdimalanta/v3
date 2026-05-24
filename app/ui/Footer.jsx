"use client";

import { TextLoop } from "@/components/motion-primitives/text-loop";
import { useState } from "react";
import Link from "next/link";
import { useSoundEffects } from "./hooks/useSoundEffects";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

const technologies = [
  { name: "Next.js", url: "https://nextjs.org/docs" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/docs" },
  { name: "Framer Motion", url: "https://www.framer.com/motion/" },
  { name: "Lenis", url: "https://lenis.darkroom.engineering/" },
  { name: "Radix UI", url: "https://www.radix-ui.com/" },
  { name: "Motion-Primitives", url: "https://motion-primitives.com/docs" },
  { name: "webGPU", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API" },
  { name: "Mux", url: "https://www.mux.com/solutions/video-for-vercel" },
  { name: "Sanity", url: "https://www.sanity.io/docs" },
];

const connectLinks = [
  { label: "Email", value: "david.dimalanta@mail.utoronto.ca", isCopy: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daviddimalanta/", external: true },
  { label: "GitHub", href: "https://github.com/davidjamesdimalanta", external: true },
  { label: "CV", href: "https://drive.google.com/file/d/1LcdDAdHLevMjm8qTPHausg9N1TRkvDBZ/view?usp=sharing", external: true },
];

export default function Footer() {
  const [isPaused, setIsPaused] = useState(false);
  const { playButtonHover } = useSoundEffects();

  return (
    <footer className="px-4 md:px-5 pb-4 md:pb-5 w-full" data-label="site-footer">
      <div
        className="max-w-[1200px] mx-auto bg-inverse-surface text-inverse-on-surface rounded-[24px] pt-12 pb-8 px-8 flex flex-col gutter-md"
      >
        {/* Top row: brand + tagline (left) · CONNECT links (right) */}
        <div className="flex flex-col md:flex-row gutter-md md:gutter-md items-start">
          <div className="flex-1 min-w-0 flex flex-col gutter-xs">
            <h2 className="t-h3">David Dimalanta</h2>
            <div className="t-sm opacity-70 inline-flex flex-wrap">
              <span>Powered by matcha pandan.&nbsp;</span>
              <span className="inline-flex whitespace-nowrap">
                Built with&nbsp;
                <TextLoop
                  className="overflow-y-clip"
                  interval={1.5}
                  trigger={!isPaused}
                  variants={{
                    initial: { y: 20, rotateX: 90, opacity: 0, filter: "blur(4px)" },
                    animate: { y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" },
                    exit: { y: -12, rotateX: -60, opacity: 0, filter: "blur(2px)" },
                  }}
                >
                  {technologies.map((tech) => (
                    <a
                      key={tech.name}
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-100 cursor-pointer transition-opacity duration-200"
                      onMouseEnter={() => {
                        setIsPaused(true);
                        playButtonHover();
                      }}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      {tech.name}
                    </a>
                  ))}
                </TextLoop>
              </span>
            </div>
          </div>

          <div className="flex flex-col gutter-xs shrink-0">
            <span className="t-label opacity-60">CONNECT</span>
            {connectLinks.map((link) =>
              link.isCopy ? (
                <button
                  key={link.label}
                  onClick={() => {
                    navigator.clipboard.writeText(link.value);
                    toast("Email copied to clipboard", {
                      icon: <CopyIcon className="size-4" />,
                    });
                  }}
                  className="t-sm hover:opacity-70 transition-opacity duration-150 text-left cursor-pointer"
                  onMouseEnter={playButtonHover}
                >
                  {link.label}
                </button>
              ) : link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-sm hover:opacity-70 transition-opacity duration-150"
                  onMouseEnter={playButtonHover}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="t-sm hover:opacity-70 transition-opacity duration-150"
                  onMouseEnter={playButtonHover}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Hairline divider — inverse-on-surface @ 20% per Figma */}
        <div className="bg-inverse-on-surface opacity-20 h-px w-full" />

        {/* Bottom row: copyright + location */}
        <div className="flex flex-col sm:flex-row justify-between gutter-xs">
          <p className="t-xs opacity-60">© {new Date().getFullYear()} David Dimalanta</p>
          <p className="t-xs opacity-60">Toronto, ON</p>
        </div>
      </div>
    </footer>
  );
}
