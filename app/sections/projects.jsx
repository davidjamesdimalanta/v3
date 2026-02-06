"use client";

import Link from "next/link";
import FeaturedProject from "./organisms/FeaturedProject";
import { projectsRegistry } from "../project/projects";
import { projectData as goableData } from "../project/goable/data";
import { projectData as ihubData } from "../project/ihub/data";
import { projectData as socraticData } from "../project/socratic/data";
import { useSoundEffects } from "../ui/hooks/useSoundEffects";

export default function Projects() {
    // Sound effects
    const { playHover, playNavigateProject } = useSoundEffects();
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
        title: data.name, // Display name as the title
        description: data.title, // Display title as the description
        imageSrc: data.coverImage,
        imageAlt: `${data.name} Preview`,
        tags: [data.details.role],
        skills: data.skills || [],
        year: data.details.year
      };
    });

    return (
        <div className="w-full h-hug flex flex-col gutter-sm p-6 md:p-8">
            <h1 className="text-p text-500">Selected Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gutter-base w-full">
            {projects.map((project, index) => (
                <Link
                  key={index}
                  href={`/project/${project.slug}`}
                  className="block"
                  onMouseEnter={playHover}
                  onClick={playNavigateProject}>
                  <FeaturedProject {...project} />
                </Link>
            ))}
            </div>
        </div>
    );
}