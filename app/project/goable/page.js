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
  const currentSlug = "goable";
  const nextProject = getNextProject(currentSlug);

  return (
    <>
      <ContentBlock
        title="The &quot;Accessible&quot; label doesn&apos;t account for diverse washroom needs."
        text="Current washroom listings lack critical information, such as amenity offering, for users with specific washroom needs. In order to resolve this, we ask: how might we make washroom finding more accessible, when it means something different for everyone?"
        media={{
          type: "image",
          src: "/assets/images/goAble/Spread2.webp",
          aspectRatio: "video",
          caption: "",
        }}
      />
      <ContentBlock
        title="Tailoring the washroom-finding experience through personalized search."
        text="The 'accessible' label on washrooms fails to account for the diverse washroom needs of users. GoAble addresses this issue with an onboarding that saves individual preferences and tailors future search results accordingly."
        media={{
          type: "video",
          src: "https://stream.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: "",
        }}
        thumbnail="https://image.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA/thumbnail.png?width=1919&height=1080&time=0"
        isFirstVideo={true}
      />
      <ContentBlock
        title="Meeting user expectations of washroom conditions and status updates."
        text="Outdated images and comments often lead users to washrooms that don't meet their needs. GoAble solves this with a community-driven updates page that provides real-time, crowdsourced information, so users can choose with confidence."
        media={{
          type: "video",
          src: "https://stream.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: ""
        }}
        thumbnail="https://image.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8/thumbnail.png?width=1919&height=1080&time=0"
      />
      <ContentBlock
        title="Focusing on friction instead of incentives."
        text="Users described that sometimes, no amount of incentive will get them to leave a review. GoAble reduces this friction with quick-select, pre-loaded options, and three-tap reporting, in order to make the reviewing process equally as easy as skipping it."
        media={{
          type: "video",
          src: "https://stream.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: ""
        }}
        thumbnail="https://image.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg/thumbnail.png?width=1919&height=1080&time=0"
      />
      <ContentBlock
        title="Prototypes that reveal valuable insights."
        text="Low-fidelity prototypes exposed foundational flaws but couldn't capture micro-level friction. High-fidelity iterations I developed surfaced issues with filter toggles and map icon clarity in our second round of testing."
        media={{
          type: "video",
          src: "https://stream.mux.com/XU4Ly1w1M6d4pmZOKZDIbBdYchQz8njlM008npcId02NQ.m3u8?min_resolution=1080p",
          aspectRatio: "video",
          caption: "Our prototype saves button states, locations, and map views to simulate a production-ready experience."
        }}
        thumbnail="https://image.mux.com/XU4Ly1w1M6d4pmZOKZDIbBdYchQz8njlM008npcId02NQ/thumbnail.png?width=1919&height=1080&time=0"
      />
      <ContentBlock
        title=""
        text=""
        media={{
          type: "image",
          src: "/assets/images/goAble/goAble_screens.png",
          aspectRatio: "video",
          caption: "Screens included in user flows: Map-based finding, search-based finding, washroom Information Pages, navigation Screens"
        }}
      />
      <ContentBlock
        title=""
        text=""
        media={{
          type: "image",
          src: "/assets/images/goAble/styletile_superfinal.png",
          aspectRatio: "video",
          caption: "Design Guide",
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
