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

function FooterLogo({ className = "" }) {
  return (
    <svg
      width="30"
      height="24"
      viewBox="0 0 155 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M0 0H17.1667V17.0265H0V0ZM17.1667 0H34.3333V17.0265H17.1667V0ZM34.3333 0H51.5V17.0265H34.3333V0ZM51.5 0H68.6667V17.0265H51.5V0ZM68.6667 0H85.8333V17.0265H68.6667V0ZM85.8333 0H103V17.0265H85.8333V0ZM0 17.0265H17.1667V34.0531H0V17.0265ZM85.8333 17.0265H103V34.0531H85.8333V17.0265ZM0 34.0531H17.1667V51.0796H0V34.0531ZM85.8333 34.0531H103V51.0796H85.8333V34.0531ZM103 34.0531H120.167V51.0796H103V34.0531ZM120.167 34.0531H137.333V51.0796H120.167V34.0531ZM137.333 34.0531H154.5V51.0796H137.333V34.0531ZM0 51.0796H17.1667V68.1061H0V51.0796ZM137.333 51.0796H154.5V68.1061H137.333V51.0796ZM0 68.1061H17.1667V85.1327H0V68.1061ZM137.333 68.1061H154.5V85.1327H137.333V68.1061ZM0 85.1327H17.1667L17.1667 102.159H0V85.1327ZM137.333 85.1327H154.5V102.159H137.333L137.333 85.1327ZM0 102.159H17.1667L17.1667 119.186H0V102.159ZM17.1667 102.159H34.3333L34.3333 119.186H17.1667L17.1667 102.159ZM34.3333 102.159H51.5L51.5 119.186H34.3333L34.3333 102.159ZM51.5 102.159H68.6667L68.6667 119.186H51.5L51.5 102.159ZM68.6667 102.159H85.8334L85.8333 119.186H68.6667L68.6667 102.159ZM85.8334 102.159H103L103 119.186H85.8333L85.8334 102.159ZM103 102.159H120.167L120.167 119.186H103L103 102.159ZM120.167 102.159H137.333L137.333 119.186H120.167L120.167 102.159ZM137.333 102.159H154.5V119.186H137.333L137.333 102.159Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const [isPaused, setIsPaused] = useState(false);
  const { playButtonHover } = useSoundEffects();

  return (
    <footer className="px-4 md:px-5 pb-4 md:pb-5 w-full" data-label="site-footer">
      <div
        className="max-w-[1200px] mx-auto bg-inverse-surface text-inverse-on-surface rounded-[24px] p-8 flex flex-col gutter-md"
      >
        {/* Top row: brand + tagline (left) · CONNECT links (right) */}
        <div className="flex flex-col md:flex-row gutter-md md:gutter-md items-start">
          <div className="flex-1 min-w-0 flex flex-col gutter-xs">
            <Link
              href="/"
              aria-label="Go to home page"
              className="w-hug inline-flex items-center gutter-sm rounded-sm transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
              onMouseEnter={playButtonHover}
            >
              <FooterLogo className="block h-auto w-[30px]" />
              <span className="hidden md:inline-flex text-h5 text-500 leading-none">
                David Dimalanta
              </span>
            </Link>
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

      </div>
    </footer>
  );
}
