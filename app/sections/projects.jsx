"use client";

import Link from "next/link";
import FeaturedProject from "./organisms/FeaturedProject";
import { projectsRegistry } from "../project/projects";
import { projectData as goableData } from "../project/goable/data";
import { projectData as ihubData } from "../project/ihub/data";
import { projectData as socraticData } from "../project/socratic/data";
import { useSoundEffects } from "../ui/hooks/useSoundEffects";
import { useInView } from "../ui/hooks/useInView";
import { useMediaQuery } from "../ui/hooks/useMediaQuery";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Cursor } from "@/components/motion-primitives/cursor";

export default function Projects() {
    // Sound effects
    const { playHover, playNavigateProject } = useSoundEffects();
    // Scroll-triggered animation
    const { ref, isInView } = useInView({ threshold: 0.1 });
    // Cursor visibility
    const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const showCursor = !isTouchDevice && !prefersReducedMotion;

    // Map registry to project data
    const projectDataMap = {
      'goable': goableData,
      'ihub': ihubData,
      'socratic': socraticData,
    };

    const projects = projectsRegistry.map((project) => {
      const data = projectDataMap[project.slug];
      return {
        slug: project.slug,
        title: data.name,
        description: data.title,
        videoSrc: data.coverVideo,
        thumbnail: data.coverImage,
        imageAlt: `${data.name} Preview`,
        tags: [data.details.role],
        skills: data.skills || [],
        year: data.details.year,
        type: data.details.type
      };
    });

    const projectCards = projects.map((project, index) => (
      <div key={project.slug} className="relative h-full">
        <Link
          href={`/project/${project.slug}`}
          className="block h-full"
          onMouseEnter={playHover}
          onClick={playNavigateProject}
        >
          <FeaturedProject {...project} autoplay={index === 0} />
        </Link>
        {showCursor && project.type && (
          <Cursor
            attachToParent
            springConfig={{ bounce: 0.001 }}
            variants={{
              initial: { scale: 0.3, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.3, opacity: 0 },
            }}
            transition={{ ease: 'easeInOut', duration: 0.15 }}
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--bg-color)] shadow-[0_0_4px_2px_rgba(155,144,122,0.3)] text-button text-400 uppercase whitespace-nowrap">
              {project.type} · {project.year}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Cursor>
        )}
      </div>
    ));

    return (
        <div ref={ref} className="w-full h-hug flex flex-col gutter-sm p-6 md:p-8">
            <h1 className="text-button text-[var(--text-color-60)] uppercase">Selected Works</h1>
            {isInView ? (
              <AnimatedGroup
                preset="fade"
                className="grid grid-cols-1 md:grid-cols-2 gutter-base w-full"
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        duration: 0.05,
                      },
                    },
                  },
                }}
              >
                {projectCards}
              </AnimatedGroup>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gutter-base w-full">
                {projects.map((project) => (
                  <div key={project.slug} className="invisible">
                    <FeaturedProject {...project} autoplay={false} />
                  </div>
                ))}
              </div>
            )}
        </div>
    );
}
