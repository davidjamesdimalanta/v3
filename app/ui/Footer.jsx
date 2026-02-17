"use client";

import { TextLoop } from "@/components/motion-primitives/text-loop";
import { useState } from "react";
import Link from 'next/link'; 

const technologies = [
  { name: "Next.js", url: "https://nextjs.org/docs" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/docs" },
  { name: "Framer Motion", url: "https://www.framer.com/motion/" },
  { name: "Lenis", url: "https://lenis.darkroom.engineering/" },
  { name: "Radix UI", url: "https://www.radix-ui.com/" },
  { name: "Motion-Primitives", url:"https://motion-primitives.com/docs" },
  { name: "webGPU", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API" },
  { name: "Mux", url: "https://www.mux.com/solutions/video-for-vercel" },
  { name: "Sanity", url: "https://www.sanity.io/docs" }
];

export default function Footer() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <footer className="p-4 pb-16 md:p-8 text-left flex flex-col md:flex-row gap-4 md:gap-0 justify-between w-fill">
      <div className="inline-flex whitespace-pre-wrap text-button text-[#2C4E47] tracking-wide uppercase">
        Built with{' '}
        <TextLoop
          className="overflow-y-clip"
          interval={1.5}
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
              className="hover:bd-text cursor-pointer transition-all duration-200"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {tech.name}
            </a>
          ))}
        </TextLoop>
      </div>
      <div className="flex flex-wrap gutter-sm">
        <Link href="/" className="text-button text-[#2C4E47] hover:bd-text">
          HOME
        </Link>  
        <Link href="https://www.linkedin.com/in/daviddimalanta/" target="_blank" rel="noopener noreferrer" className="text-button text-[#2C4E47] hover:bd-text">
          LINKEDIN
      </Link>  
        <Link href="https://github.com/davidjamesdimalanta" target="_blank" rel="noopener noreferrer" className="text-button text-[#2C4E47] hover:bd-text">
          GITHUB
      </Link>  
      <Link href="mailto:david.dimalanta@mail.utoronto.ca" className="text-button text-[#2C4E47] hover:bd-text">
          CONTACT
      </Link>  
      <Link href="/cv/DavidDimalanta_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-button text-[#2C4E47] hover:bd-text">
          CV
      </Link>  
      </div>
    </footer>
  );
}
