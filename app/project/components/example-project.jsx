"use client";

/**
 * EXAMPLE PROJECT PAGE
 *
 * This is a template showing how to use the project components.
 * To create a new project page:
 *
 * 1. Copy this file to a new route: app/project/[project-name]/page.js
 * 2. Update the metadata with your project info
 * 3. Replace the content with your project details
 * 4. Add your images/videos to /public/projects/[project-name]/
 *
 * COMPONENTS:
 * - ProjectHero: Left column with project metadata (title, awards, description, details)
 * - ProjectContent: Right column wrapper with consistent styling
 * - ContentBlock: Comprehensive content block with optional title, text, media, and caption
 * - ProjectSection: Simple section wrapper (traditional composition pattern)
 * - MediaBlock: Media-only component for images/videos
 *
 * USAGE PATTERNS:
 * 1. ContentBlock (recommended for standard content):
 *    <ContentBlock title="..." text="..." media={{...}} caption="..." />
 *
 * 2. Traditional composition (flexible for custom layouts):
 *    <ProjectSection title="...">
 *      <p>Custom content...</p>
 *      <MediaBlock type="image" src="..." />
 *    </ProjectSection>
 */

import { useState } from "react";
import Link from "next/link";
import ProjectHero from "./ProjectHero";
import ProjectContent from "./ProjectContent";
import ProjectSection from "./ProjectSection";
import MediaBlock from "./contentTypes/MediaBlock";
import ContentBlock from "./contentTypes/ContentBlock";

export default function ExampleProject() {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      window.location.href = "/#projects";
    }, 300);
  };

  // Project metadata
  const projectData = {
    title: "A vibrant, interactive experience for the Example brand",
    liveUrl: "https://example.com",
    awards: [
      { name: "Award Name - Category", url: "#" },
      { name: "Another Award - Category", url: "#" },
      { name: "Third Award - Category", url: "#" },
    ],
    description: [
      "Replace this with your project description. Explain the challenge, your role, and the approach you took to solve the problem.",
      "Add multiple paragraphs to provide context about the project's goals, constraints, and your design process.",
      "Highlight key insights, decisions, and outcomes that demonstrate your impact on the project.",
    ],
    details: {
      Role: "Product Designer",
      Timeline: "6 months",
      Team: "4 designers, 6 engineers",
      Year: "2024",
    },
  };

  return (
    <div className={`relative w-full min-h-screen padding-page transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col lg:flex-row gutter-lg lg:gutter-[80px] max-w-[1400px] mx-auto">

        {/* LEFT COLUMN - Project Metadata */}
        <ProjectHero
          title={projectData.title}
          liveUrl={projectData.liveUrl}
          awards={projectData.awards}
          description={projectData.description}
          details={projectData.details}
          onClose={handleClose}
        />

        {/* RIGHT COLUMN - Project Content */}
        <ProjectContent className="gutter-lg">

          {/* Section 1 - Challenge */}
          <ProjectSection title="The Challenge">
            <p className="text-base text-400 leading-relaxed">
              Describe the problem you were solving. What were the user needs?
              What were the business goals? What constraints did you face?
            </p>
            <MediaBlock
              type="image"
              src="/projects/example/challenge.png"
              alt="Challenge overview"
              caption="Caption describing the image"
            />
          </ProjectSection>

          {/* Section 2 - Research */}
          <ProjectSection title="Research & Discovery">
            <p className="text-base text-400 leading-relaxed">
              Share your research process. What did you learn from users?
              What insights drove your design decisions?
            </p>
            <MediaBlock
              type="image"
              src="/projects/example/research.png"
              alt="Research findings"
            />
          </ProjectSection>

          {/* Section 3 - Design Process (using ContentBlock for cleaner syntax) */}
          <ContentBlock
            title="Design Process"
            text="Walk through your design iterations. Show wireframes, prototypes, and how the design evolved based on feedback and testing."
            media={{
              type: "video",
              src: "/projects/example/process.mp4"
            }}
            caption="Design iteration process"
          />

          {/* Section 4 - Alternative: ContentBlock with text array */}
          <ContentBlock
            title="Key Insights"
            text={[
              "First iteration focused on user flows and information architecture.",
              "Second iteration refined visual hierarchy and interaction patterns.",
              "Final iteration optimized for accessibility and mobile experience."
            ]}
          />

          {/* Section 5 - Traditional ProjectSection (still valid) */}
          <ProjectSection title="Design Process (Traditional Composition)">
            <p className="text-base text-400 leading-relaxed">
              Walk through your design iterations. Show wireframes, prototypes,
              and how the design evolved based on feedback and testing.
            </p>
            <MediaBlock
              type="video"
              src="/projects/example/process.mp4"
              caption="Design iteration process"
            />
          </ProjectSection>

          {/* Section 4 - Solution */}
          <ProjectSection title="The Solution">
            <p className="text-base text-400 leading-relaxed">
              Present your final design. Explain key design decisions and how
              they solve the original problem.
            </p>
            <MediaBlock
              type="image"
              src="/projects/example/solution.png"
              alt="Final design solution"
            />
          </ProjectSection>

          {/* Section 5 - Impact */}
          <ProjectSection title="Impact & Results">
            <p className="text-base text-400 leading-relaxed">
              Share the outcomes. What metrics improved? What did users say?
              What did you learn from this project?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="flex flex-col gutter-xs">
                <span className="text-large text-600">40%</span>
                <span className="text-small text-400 opacity-60">Metric improvement</span>
              </div>
              <div className="flex flex-col gutter-xs">
                <span className="text-large text-600">2.5x</span>
                <span className="text-small text-400 opacity-60">User engagement</span>
              </div>
              <div className="flex flex-col gutter-xs">
                <span className="text-large text-600">95%</span>
                <span className="text-small text-400 opacity-60">Satisfaction rate</span>
              </div>
            </div>
          </ProjectSection>

          {/* Navigation to Next Project */}
          <ProjectSection className="pt-8 pb-16">
            <span className="text-tiny text-400 opacity-60">Next Project</span>
            <Link
              href="/project/next-project"
              className="group text-medium text-600 hover:bd-text transition-all duration-150 w-hug"
            >
              Next Project Title →
            </Link>
          </ProjectSection>
        </ProjectContent>
      </div>
    </div>
  );
}
