"use client";

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
    <div className="relative">

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
          heroMedia={projectData.heroMedia}
        />

        {/* Content — media/video blocks below hero */}
        <ProjectContent
        >
          {children}
        </ProjectContent>
      </div>
    </div>
  );
}
