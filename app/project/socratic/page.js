"use client";

import Link from "next/link";
import ContentBlock from "../components/contentTypes/ContentBlock";
import MediaBlock from "../components/contentTypes/MediaBlock";
import ProjectSection from "../components/ProjectSection";
import { getNextProject } from "../projects";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

/**
 * Project Content Page Template
 *
 * This is where you build your unique case study content
 * You have two patterns available:
 *
 * 1. ContentBlock (Recommended) - All-in-one component with optional fields
 *    <ContentBlock title="..." text="..." media={{...}} />
 *
 * 2. Composition Pattern - Mix and match components
 *    <ProjectSection title="...">
 *      <MediaBlock type="image" src="..." />
 *    </ProjectSection>
 */

export default function ProjectPage() {
  // Sound effects
  const { playHover } = useSoundEffects();

  // Get the slug of the current project from the URL
  // Replace 'your-project-slug' with your actual project slug
  const currentSlug = "socratic";
  const nextProject = getNextProject(currentSlug);

  return (
    <>
      <ContentBlock
        title=""
        text=""
        media={{
          type: "image",
          src: "/assets/images/socratic/socratic_splash.png",
          aspectRatio: "video",
          caption: "",
        }}
      />
      <ContentBlock
        title=""
        text=""
        media={{
          type: "video",
          src: "https://stream.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: "",
        }}
        thumbnail="https://image.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo/thumbnail.png?width=1919&height=1080&time=0"
      />
      <ContentBlock
      title=""
      text=""
      media={{
        type: "image",
        src: "/assets/images/socratic/socratic-example-cropped.png",
        aspectRatio: "video",
        caption: "",
      }}
    />

      {/* Navigation to Next Project */}
      {nextProject && (
        <section className="flex flex-col gutter-sm pt-8 pb-16">
          <span className="text-tiny text-400 opacity-60">Next Project</span>
          <Link
            href={`/project/${nextProject.slug}`}
            className="group text-medium text-600 hover:bd-text transition-all duration-150 w-hug"
            onMouseEnter={playHover}
          >
            {nextProject.title} →
          </Link>
        </section>
      )}
    </>
  );
}
