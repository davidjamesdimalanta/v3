"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectHero from "../components/ProjectHero";
import ProjectContent from "../components/ProjectContent";

/**
 * Shared layout wrapper for all project pages
 *
 * This component provides the consistent 2-column layout structure
 * (ProjectHero + ProjectContent) while allowing unique content per project
 *
 * @param {Object} projectData - Project metadata (title, liveUrl, awards, description, details)
 * @param {React.ReactNode} children - Unique project content (rendered inside ProjectContent)
 */
export default function ProjectLayout({ projectData, children }) {
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.push('/');
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 300);
  };

  return (
    <div className={`relative w-full min-h-screen bg-black/80 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>

      {/* Two-column layout: Sticky left metadata, scrollable right content */}
      <div className="flex flex-col lg:flex-row gutter-lg lg:gutter-[80px]">

        {/* LEFT COLUMN - Project Metadata (Sticky on desktop) */}
        <ProjectHero
          title={projectData.title}
          liveUrl={projectData.liveUrl}
          awards={projectData.awards}
          description={projectData.description}
          details={projectData.details}
          onClose={handleClose}
        />

        {/* RIGHT COLUMN - Project Content (Scrollable) */}
        <ProjectContent>
          {children}
        </ProjectContent>
      </div>
    </div>
  );
}
