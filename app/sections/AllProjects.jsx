"use client";

import ProjectBento from "./organisms/ProjectBento";
import { useInView } from "../ui/hooks/useInView";
import { useMediaQuery } from "../ui/hooks/useMediaQuery";

export default function AllProjects({ projects = [] }) {
  const { ref, isInView } = useInView({ threshold: 0.08 });
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <section
      id="all-projects"
      ref={ref}
      className="w-full max-w-[1200px] mx-auto px-4 xl:px-0 py-6 scroll-mt-24"
      aria-label="All projects"
    >
      <div className="flex flex-col gutter-sm">
        <h2
          className={`text-button text-(--text-color-60) uppercase fade-up-hidden ${isInView ? "fade-up-visible" : ""}`}
          style={{ transitionDuration: prefersReducedMotion ? "0s" : "0.4s", transitionDelay: "0s" }}
        >
          All Projects
        </h2>
        <div className="flex flex-col gutter-xl">
          {projects.map((project, index) => (
            <ProjectBento
              key={project.slug}
              project={project}
              priority={index === 0}
              animate={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
