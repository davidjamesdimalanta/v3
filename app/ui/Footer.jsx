"use client";

import { TextLoop } from "@/components/motion-primitives/text-loop";
import { useState } from "react";

const technologies = [
  { name: "Next.js", url: "https://nextjs.org/docs" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/docs" },
  { name: "Framer Motion", url: "https://www.framer.com/motion/" },
  { name: "Lenis", url: "https://lenis.darkroom.engineering/" },
  { name: "Radix UI", url: "https://www.radix-ui.com/" },
];

export default function Footer() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <footer className="p-4 md:p-8 text-left">
      <div className="inline-flex whitespace-pre-wrap text-button text-[#CDCDCD] tracking-wide uppercase">
        Built with{' '}
        <TextLoop
          className="overflow-y-clip"
          trigger={!isPaused}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: 'blur(4px)',
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: 'blur(0px)',
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: 'blur(4px)',
            },
          }}
        >
          {technologies.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bd-text hover:text-white cursor-pointer transition-all duration-200"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {tech.name}
            </a>
          ))}
        </TextLoop>
      </div>
    </footer>
  );
}
