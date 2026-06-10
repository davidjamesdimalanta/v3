"use client";

import { useState } from "react";
import Link from "next/link";
import FeaturedProject from "./organisms/FeaturedProject";
import { useSoundEffects } from "../ui/hooks/useSoundEffects";
import { useInView } from "../ui/hooks/useInView";
import { useMediaQuery } from "../ui/hooks/useMediaQuery";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Cursor } from "@/components/motion-primitives/cursor";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function Projects({ projects = [] }) {
    // Sound effects
    const { playHover, playNavigateProject } = useSoundEffects();
    // Scroll-triggered animation
    const { ref, isInView } = useInView({ threshold: 0.1 });
    // Cursor visibility
    const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const showCursor = !isTouchDevice && !prefersReducedMotion;
    // Track which project card is hovered for the shared cursor
    const [hoveredProject, setHoveredProject] = useState(null);
    const cursorProject = hoveredProject;

    const projectCardsData = projects.map((data) => {
      return {
        slug: data.slug,
        title: data.title,
        videoSrc: data.coverVideo,
        thumbnail: data.coverImage,
        imageAlt: `${data.name} Preview`,
        tags: [data.details.role],
        skills: data.skills || [],
        year: data.details.year,
        type: data.details.type,
        comingSoon: data.comingSoon,
      };
    });

    const handleComingSoon = (event) => {
      event.preventDefault();
      toast("Coming soon", {
        description: "This project is currently being documented.",
      });
    };

    const projectCards = projectCardsData.map((project, index) => (
      <div
        key={project.slug}
        className="relative h-full"
        onMouseEnter={() => setHoveredProject(project)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        <Link
          href={`/project/${project.slug}`}
          className="block h-full"
          onMouseEnter={playHover}
          onClick={project.comingSoon ? handleComingSoon : playNavigateProject}
          aria-disabled={project.comingSoon ? "true" : undefined}
        >
          <FeaturedProject {...project} autoplay={index === 0} />
        </Link>
      </div>
    ));

    return (
        <div ref={ref} className="w-full h-hug flex flex-col gutter-sm p-6 md:p-8">
            <h1
              className={`text-button text-(--text-color-60) uppercase fade-up-hidden ${isInView ? 'fade-up-visible' : ''}`}
              style={{ transitionDuration: '0.4s', transitionDelay: '0s' }}
            >
              Selected Works
            </h1>
            <AnimatedGroup
              preset="fade"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 gutter-base w-full"
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                },
                item: {
                  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
                },
              }}
            >
              {projectCards}
            </AnimatedGroup>
            {/* Single shared cursor rendered outside AnimatedGroup to avoid
                transformed ancestor breaking position:fixed coordinate space */}
            {showCursor && (
              <Cursor
                attachToParent={false}
                springConfig={{ bounce: 0.001 }}
                variants={{
                  initial: { scale: 0.3, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  exit: { scale: 0.3, opacity: 0 },
                }}
                transition={{ ease: 'easeInOut', duration: 0.15 }}
                isVisible={!!hoveredProject}
              >
                {cursorProject && (
                  <div className="flex items-center gutter-xs px-4 py-3 rounded-full bg-(--bg-color) shadow-[0_0_4px_2px_oklch(from_var(--primary-500)_l_c_h_/_0.3)] text-button text-400 uppercase whitespace-nowrap tabular-nums">
                    {cursorProject.type} · {cursorProject.year}
                    <motion.span
                      className="shrink-0 flex items-center"
                      initial={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ delay: 0.08, duration: 0.15, ease: 'easeOut' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                  </div>
                )}
              </Cursor>
            )}
        </div>
    );
}
