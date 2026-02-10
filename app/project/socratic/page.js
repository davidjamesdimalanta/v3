"use client";

import Link from "next/link";
import ProjectLayout from "../_shared/ProjectLayout";
import ContentBlock from "../components/contentTypes/ContentBlock";
import CaseStudySection from "../_shared/CaseStudySection";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import DefinitionCard from "../components/contentTypes/DefinitionCard";
import { TextShimmer } from "../../ui/text-shimmer";
import { projectData } from "./data";
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
  const { playHover, playButtonHover } = useSoundEffects();

  // Get the slug of the current project from the URL
  // Replace 'your-project-slug' with your actual project slug
  const currentSlug = "socratic";
  const nextProject = getNextProject(currentSlug);

  return (
    <>
      {/* ProjectLayout: Contains high-level project overview (constrained to 75vw) */}
      <ProjectLayout projectData={projectData}>
        <ContentBlock
          title="The Challenge: Making AI write award-winning scholarship applications"
          text="Scholarship prompts are often vague and open-ended. As part of the UofTxAnthropic Hackathon, the challenge was to create an AI-powered application that detecs hidden criteria and writes applications that meet them."
          media={{
            type: "image",
            src: "/assets/images/socratic/socratic_splash.png",
            aspectRatio: "video",
            caption: "",
          }}
        />
        <ContentBlock
          title="A conversation with AI"
          text="We built a model that uses Socratic questioning to engage users critically. Through dynamic prompts, it generates fine-tuned responses within a collaborative interface where students work alongside AI."
          media={{
            type: "video",
            src: "https://stream.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: " Instead of generic outputs, users provide critically engaged responses that result in more personalized, insightful, and relevant scholarship application essays.",
          }}
          thumbnail="https://image.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo/thumbnail.png?width=1919&height=1080&time=0"
        />
        <ContentBlock
          title={<>Reimagining{" "}
          <DefinitionCard
            trigger="HAX"
            shimmerVariant="blue"
            triggerProps={{ onMouseEnter: playButtonHover }}
            content={
              <>
                <strong>What is Human-AI Interaction (HAX)?</strong>
                <br /><br />
                Human-AI interaction studies and designs how humans and artificial intelligence (AI) systems communicate and collaborate. AI systems are computer programs that can perform tasks that usually require human intelligence, such as understanding natural language, recognizing images, making decisions, and learning from data. Human-AI interaction aims to create AI systems that are user-friendly, trustworthy, ethical, and beneficial for humans.
              </>
            }
            caption={{
              text: "From the IxDF",
              link: "https://www.interaction-design.org/literature/topics/human-ai-interaction?srsltid=AfmBOop8f0ApVA-MkRFEqsslVKxJ4GZ43gwWndx2gTsac1OPLJKC_OHV"
            }}
            side="right"
            width="w-120"
            sideOffset="2"
          /></>}
          text="Resolving common issues of chat interfaces, we made interactions live on a canvas to give users more control over visual and spatial relationships between AI-insights and their writing."
          media={{
            type: "image",
            src: "/assets/images/socratic/socratic-example-cropped.png",
            aspectRatio: "video",
            caption: "This mode of interaction was applauded for its innovative and visual-based approach.",
          }}
        />
        <ContentBlock
          title="Leading a multi-disciplinary team"
          text="In order to deliver a 0→1 app in 7 days, I recruited one ML engineer, two developers, and a UX researcher. Making the most of 7 days meant coordinating busy student schedules, providing direction and functional requirements for each ticket while ensuring a fun working environment."
          media={{
            type: "image",
            src: "/assets/images/socratic/leadership.png",
            aspectRatio: "video",
            caption: "I used notion's kanban board for sprint planning (3 day sprints), when2meet to coordinate availability for in-person work sessions, and discord for daily standups and check-ins.",
          }}
        />
      </ProjectLayout>

      {/* CaseStudySection: Full-width detailed process (outside ProjectLayout) */}
      <CaseStudySection title="Design Process" theme={projectData.caseStudy}>
        <CaseStudyTextBlock
          text="This case study is currently a work in progress. Reach out if you're curious about it :)"
        />

        {/* Navigation to Next Project */}
        {nextProject && (
          <div className="max-w-lg mx-auto text-center pt-16">
            <span className="text-xs text-400 opacity-60 block mb-2">Next Project</span>
            <Link
              href={`/project/${nextProject.slug}`}
              className="group text-h5 hover:bd-text transition-all duration-150 inline-block"
              onMouseEnter={playHover}
            >
              {nextProject.title} →
            </Link>
          </div>
        )}
      </CaseStudySection>
    </>
  );
}
