"use client";

import { motion } from "motion/react";
import ProjectBento from "./organisms/ProjectBento";
import { useWaveReady } from "../ui/hooks/useWaveReady";

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.56,
    },
  },
};

export default function AllProjects({ projects = [] }) {
  const { isReady, prefersReducedMotion } = useWaveReady({ playOnlyOnInitialLoad: true });
  const Section = prefersReducedMotion ? "section" : motion.section;

  return (
    <Section
      id="all-projects"
      className="w-full max-w-[1200px] mx-auto px-4 xl:px-0 py-6 scroll-mt-24"
      aria-label="All projects"
      {...(!prefersReducedMotion && {
        initial: "hidden",
        animate: isReady ? "visible" : "hidden",
        variants: SECTION_VARIANTS,
      })}
    >
      <div className="flex flex-col gutter-sm">
        <h2 className="text-button text-(--text-color-60) uppercase">
          All Projects
        </h2>
        <div className="flex flex-col gutter-xl">
          {projects.map((project, index) => (
            <ProjectBento
              key={project.slug}
              project={project}
              priority={index === 0}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
