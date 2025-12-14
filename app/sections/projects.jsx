import Image from "next/image";
import Link from "next/link";
import FeaturedProject from "./organisms/FeaturedProject";

export default function Projects() {
    const projects = [
        {
          title: "Project Alpha",
          description: "A modern web application built with cutting-edge technologies",
          imageSrc: "/assets/placeholder-project.png",
          imageAlt: "Project Alpha Screenshot",
          tags: ["React", "Next.js", "Tailwind"],
          year: "2024"
        },
        {
          title: "Project Beta",
          description: "Innovative solution for creative professionals",
          imageSrc: "/assets/placeholder-project.png",
          imageAlt: "Project Beta Screenshot",
          tags: ["WebGL", "Three.js", "TypeScript"],
          year: "2024"
        },
      ];

    return (
        <div className="w-full min-h-screen flex flex-col gutter-sm padding-page">
            <h1 className="text-base text-500">Selected Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gutter-sm w-full">
            {projects.map((project, index) => (
                <FeaturedProject key={index} {...project} />
            ))}
            </div>
        </div>
    );
}