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
  const currentSlug = "ihub";
  const nextProject = getNextProject(currentSlug);

  return (
    <>
      <ContentBlock
        title="Developing the web presence for student-driven design research."
        text="The Innovation Hub (iHub) is UofT's student design research agency, dedicated to improving student life across all three campuses. As a web designer on the UX team, I helped redesign the website that showcases 50+ research projects and their findings to campus stakeholders."
        media={{
          type: "video",
          src: "https://stream.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: "",
        }}
        thumbnail="https://image.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc/thumbnail.png?width=1919&height=1080&time=0"
        isFirstVideo={true}
      />
      <div className="flex flex-col gap-4">
      <ContentBlock
        title="Balancing stakeholder needs to create a family-friendly campus resource."
        text="UofT's Family Care Office wanted a campus-wide resources for educators supporting student-parents. Limited to a single WordPress page, it conflicted with the design team's multi-page design. To solve this, we created a single-page app that pushes each resource's slug to the URL dynamically, giving every resource a shareable link despite the technical constraint."
        media={{
          type: "video",
          src: "https://stream.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: "",
        }}
        thumbnail="https://image.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8/thumbnail.png?width=1919&height=1080&time=0"
      />
      <ContentBlock
        title=""
        text=""
        media={{
          type: "video",
          src: "https://stream.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: "",
        }}
        thumbnail="https://image.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY/thumbnail.png?width=1919&height=1080&time=0"
      />
      </div>

      <div className="flex flex-col gap-4">
      <ContentBlock
        title="Handing off to non-developers"
        text="Part of my role is to develop documentation for all my work that is reproducible and easy to follow by non-developers on the team. This entails custom Wordpress blocks with contained logic, visual documentation in Figma for new designers unfamiliar with the website builder, and walkthrough videos. I also am tasked with maintaining their internal design system components for any components I've developed."
        media={{
          type: "image",
          src: "/assets/images/ihub/Design-system.png",
          aspectRatio: "video",
          caption: "Though confidential, I am able to discuss more about their design system verbally upon request.",
        }}
      />
      <ContentBlock
        title=""
        text=""
        media={{
          type: "image",
          src: "/assets/images/ihub/design-system-example.png",
          aspectRatio: "video",
          caption: "By incorporating visuals in our documentation, designers are able to resolve common issues and make changes to any custom component without the technical expertise.",
        }}
      />
      </div>
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
