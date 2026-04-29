"use client";

import { motion } from "motion/react";
import ProjectHero from "../components/ProjectHero";
import ProjectContent from "../components/ProjectContent";

/**
 * Shared layout wrapper for all project pages
 *
 * This component provides the consistent stacked layout structure
 * (ProjectHero full-width header + ProjectContent below) while allowing unique content per project
 *
 * @param {Object} projectData - Project metadata (title, links, awards, description, details)
 * @param {React.ReactNode} children - Unique project content (rendered inside ProjectContent)
 */
export default function ProjectLayout({ projectData, children }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.3, ease: 'easeIn' }}
    >

      {/* Stacked layout: Full-width hero above content */}
      <div className="flex flex-col">

        {/* Hero — full-width header with title/links + meta/description */}
        <ProjectHero
          name={projectData.name}
          title={projectData.title}
          links={projectData.links}
          awards={projectData.awards}
          description={projectData.description}
          details={projectData.details}
        />

        {/* Content — media/video blocks below hero */}
        <ProjectContent
        >
          {children}
        </ProjectContent>
      </div>
    </motion.div>
  );
}

