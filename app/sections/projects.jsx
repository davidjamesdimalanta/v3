import Link from "next/link";
import FeaturedProject from "./organisms/FeaturedProject";
import { projectsRegistry } from "../project/projects";
import { projectData as goableData } from "../project/goable/data";

export default function Projects() {
    // Map registry to project data
    const projectDataMap = {
      'goable': goableData,
    };

    const projects = projectsRegistry.map((project) => {
      const data = projectDataMap[project.slug];
      return {
        slug: project.slug,
        title: data.name, // Display name as the title
        description: data.title, // Display title as the description
        imageSrc: "/assets/placeholder-project.png", // TODO: Add coverImage to projectData
        imageAlt: `${data.name} Preview`,
        tags: [data.details.role],
        year: data.details.year
      };
    });

    return (
        <div className="w-full h-hug flex flex-col gutter-sm padding-page">
            <h1 className="text-base text-500">Selected Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gutter-sm w-full">
            {projects.map((project, index) => (
                <Link key={index} href={`/project/${project.slug}`} className="block">
                  <FeaturedProject {...project} />
                </Link>
            ))}
            </div>
        </div>
    );
}