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
      {/* Example 1: ContentBlock with text only */}
      <ContentBlock
        title="Section Title"
        text="Add your project content here. This could include design process, research findings, or key insights."
      />

      {/* Example 2: ContentBlock with text array (multiple paragraphs) */}
      <ContentBlock
        title="Another Section"
        text={[
          "You can pass an array of paragraphs for longer content.",
          "Each string in the array becomes a separate paragraph with proper spacing.",
        ]}
      />

      {/* Example 3: ContentBlock with text and media */}
      <ContentBlock
        title="Visual Examples"
        text="Include images or videos to showcase your work. The media block handles aspect ratios automatically."
        media={{
          type: "image", // or "video"
          src: "/placeholder-image.jpg",
          alt: "Description of image",
          aspectRatio: "video", // "video" (16:9), "square" (1:1), "portrait" (3:4), or custom like "21/9"
          caption: "Optional caption for the image",
        }}
      />

      {/* Example 4: ContentBlock with media only (no text) */}
      <ContentBlock
        media={{
          type: "image",
          src: "/another-image.jpg",
          alt: "Description",
          aspectRatio: "video",
        }}
      />

      {/* Example 5: Composition pattern with ProjectSection + MediaBlock */}
      <ProjectSection title="Custom Layout">
        <p className="text-base text-400 leading-relaxed">
          For more control, use the composition pattern with ProjectSection and MediaBlock.
        </p>

        <MediaBlock
          type="image"
          src="/custom-image.jpg"
          alt="Custom layout image"
          aspectRatio="square"
          caption="This uses the composition pattern for maximum flexibility"
        />
      </ProjectSection>

      {/* Example 6: ContentBlock with custom caption separate from media */}
      <ContentBlock
        title="Final Results"
        text="Share the outcomes, metrics, and impact of your work."
        media={{
          type: "video",
          src: "/project-demo.mp4",
          aspectRatio: "video",
        }}
        caption="This caption appears below the media block and can describe results or context."
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
