"use client";

import Link from "next/link";
import ContentBlock from "../components/contentTypes/ContentBlock";
import MediaBlock from "../components/contentTypes/MediaBlock";
import ProjectSection from "../components/ProjectSection";
import { getNextProject } from "../projects";

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
  // Get the slug of the current project from the URL
  // Replace 'your-project-slug' with your actual project slug
  const currentSlug = "goable";
  const nextProject = getNextProject(currentSlug);

  return (
    <>
      <ContentBlock
        title=""
        text=""
        media={{
          type: "image",
          src: "/assets/images/goAble/Spread2.webp",
          aspectRatio: "video",
          caption: "",
        }}
      />
      <ContentBlock
        title=""
        text=""
        media={{
          type: "video",
          src: "https://stream.mux.com/Kj01AIk5dJC6h9fppRUVlNtROykz7l01pIe02fMYnskk01A.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: "",
        }}
        thumbnail="https://image.mux.com/Kj01AIk5dJC6h9fppRUVlNtROykz7l01pIe02fMYnskk01A/thumbnail.png?width=1919&height=1080&time=0"
      />
      <ContentBlock
        title=""
        text=""
        media={{
          type: "video",
          src: "https://stream.mux.com/i5ShqXfOWRH7tXz3xrE3202UZuCT4Ffqe7P5GoJlgKLA.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: ""
        }}
        thumbnail="https://image.mux.com/i5ShqXfOWRH7tXz3xrE3202UZuCT4Ffqe7P5GoJlgKLA/thumbnail.png?width=1919&height=1080&time=0"
      />
      <ContentBlock
        title=""
        text=""
        media={{
          type: "video",
          src: "https://stream.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: ""
        }}
        thumbnail="https://image.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg/thumbnail.png?width=1919&height=1080&time=0"
      />

      {/* Navigation to Next Project */}
      {nextProject && (
        <section className="flex flex-col gutter-sm pt-8 pb-16">
          <span className="text-tiny text-400 opacity-60">Next Project</span>
          <Link
            href={`/project/${nextProject.slug}`}
            className="group text-medium text-600 hover:bd-text transition-all duration-150 w-hug"
          >
            {nextProject.title} →
          </Link>
        </section>
      )}
    </>
  );
}
