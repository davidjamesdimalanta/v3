"use client";

import Link from "next/link";
import ProjectLayout from "../_shared/ProjectLayout";
import ContentBlock from "../components/contentTypes/ContentBlock";
import CaseStudySection from "../_shared/CaseStudySection";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import CaseStudyMediaBlock from "../components/contentTypes/CaseStudyMediaBlock";
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
  const currentSlug = "ihub";
  const nextProject = getNextProject(currentSlug);

  return (
    <>
      {/* ProjectLayout: Contains high-level project overview (constrained to 75vw) */}
      <ProjectLayout projectData={projectData}>
        <ContentBlock 
          media={{
            type: "image",
            src: "/assets/images/ihub/ihub_spread2.png",
            aspectRatio: "video",
            caption: "",
          }}
        />
        <ContentBlock
          // title="iHub Website Design & Development"
          // text="The Innovation Hub (iHub) is UofT's student design research agency, dedicated to improving student life across all three campuses. As a web designer on the UX team, I helped redesign the website that showcases 50+ research projects and their findings to campus stakeholders."
          media={{
            type: "video",
            src: "https://stream.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: "",
          }}
          thumbnail="https://image.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc/thumbnail.png?width=1919&height=1080&time=0"
          isFirstVideo={true}
        />

{/*         
        <div className="flex flex-col gap-4">
          <ContentBlock
            title="Project 2: Family Care Office Website"
            // text="UofT's Family Care Office wanted a campus-wide resource for educators supporting student-parents. Limited to a single WordPress page, it conflicted with the design team's multi-page design. To solve this, we created a single-page app that pushes each resource's slug to the URL dynamically, giving every resource a shareable link despite the technical constraint."
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
 */}
{/* 
        <div className="flex flex-col gap-4">
          <ContentBlock
            title="Technical Documentation"
            // text="Part of my role is to develop documentation for all my work that is reproducible and easy to follow by non-developers on the team. This entails custom Wordpress blocks with contained logic, visual documentation in Figma for new designers unfamiliar with the website builder, and walkthrough videos. I also am tasked with maintaining their internal design system components for any components I've developed."
            media={{
              type: "image",
              src: "/assets/images/ihub/design_system.png",
              aspectRatio: "video",
              caption: "Though confidential, I am able to discuss more about their design system verbally upon request.",
            }}
          />
          <ContentBlock
            title=""
            text=""
            media={{
              type: "image",
              src: "/assets/images/ihub/technical_documentation.png",
              aspectRatio: "video",
              caption: "By incorporating visuals in our documentation, designers are able to resolve common issues and make changes to any custom component without the technical expertise.",
            }}
          />
        </div> */}

      </ProjectLayout>

      {/* CaseStudySection: Full-width detailed process (outside ProjectLayout) */}
      <CaseStudySection title="" theme={projectData.caseStudy}>

        {/* ============================================ */}
        {/* PROJECT 1: Website Responsive Design */}
        {/* ============================================ */}

        <CaseStudyTextBlock
          sectionHeading="Ihub Website"
          title="Custom code for a system that limits design."
          text={[
            <>
              I came onto the design team as a product design intern, but 
              quickly became the SME for their web tech stack. 
            </>,
            <>
              In design sprints, I represented technical feasibility and responsive design.
            </>,
          ]}
        />

        <CaseStudyMediaBlock
          type="video"
          src="https://stream.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc.m3u8?min_resolution=1080p"
          size="medium"
          caption=""
          thumbnail="https://image.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc/thumbnail.png?width=1919&height=1080&time=0"
        />

        <CaseStudyTextBlock
          title="Designer-friendly code."
          text={[
            <>
              Knowing that future Innovation Hub team members would be designers and researchers—not 
              developers—I built the components using custom Beaver Builder blocks with encapsulated logic.
              
            </>,
            <>
              All designers had to do is drag and drop.
            </>
          ]}
        />

        <CaseStudyMediaBlock 
          type="video"
          src="/assets/videos/ihub/contained-logic.mp4"
          size="medium"
          caption="Saved components are not native to the builder, and must be pre-built"
        />

        <CaseStudyTextBlock
          title="Responsive design"
          text={[
            <>
              I defined responsive breakpoints with the designers, 
              creating the design system and mobile prototypes in Figma. 
              
            </>,
            <>
              For mobile users, we focused on spacing because of the 
              limited amount of space on a mobile device.
            </>,
            <>
            As the developer, it was a challenge 
            to convert static typescales with responsive ones.
          </>,
          ]}
        />

        <CaseStudyMediaBlock 
          type="image"
          src="/assets/images/ihub/mobile-media3.png"
          size="medium"
          caption="Working on the &quot;Our Work&quot; page, designing responsively from the start."
        />

        {/* ============================================ */}
        {/* PROJECT 2: FCO (Family Care Office) Project */}
        {/* ============================================ */}
        
        {/* <CaseStudyTextBlock
          sectionHeading="FCO Website"
          title="Student parents face impossible choices every day."
          text={[
            <>At UofT, hundreds of students balance{" "}
            <DefinitionCard
              trigger="family responsibilities"
              shimmerVariant="green"
              triggerProps={{ onMouseEnter: playButtonHover }}
              content={
                <>
                  <div className="mb-2">
                    <strong>Student parents face unique barriers:</strong>
                  </div>
                  <div className="mb-2">
                    • Finding childcare during evening events
                  </div>
                  <div className="mb-2">
                    • Choosing between sick children and academic deadlines
                  </div>
                  <div className="mb-2">
                    • Feeling isolated from campus communities
                  </div>
                  <div>
                    • Worrying about being judged by peers and professors
                  </div>
                </>
              }
              side="bottom"
              width="w-80"
              sideOffset="1"
            />
            {" "}with academic demands, often feeling like they must choose between being a good parent and being a good student.</>,
            <>The Innovation Hub spent months listening to their stories. What they learned filled a 26-page report—rich with insights, but not easy for busy staff and faculty to use. My role was to transform this research into something practical: a web resource that could help professors, event organizers, and student leaders understand and support student parents across campus.</>,
          ]}
        /> */}

        <CaseStudyMediaBlock
          type="video"
          src="https://stream.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8.m3u8?min_resolution=1080p"
          aspectRatio="video"
          caption=""
          thumbnail="https://image.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8/thumbnail.png?width=1919&height=1080&time=0"
        />

        <CaseStudyMediaBlock
          type="video"
          src="https://stream.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY.m3u8?min_resolution=1080p"
          aspectRatio="video"
          caption=""
          thumbnail="https://image.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY/thumbnail.png?width=1919&height=1080&time=0"
        />

        {/* <CaseStudyTextBlock
          title="When stakeholder needs collide with technical reality"
          text={[
            <>The Innovation Hub&apos;s research team spent months speaking with{" "}
            <DefinitionCard
              trigger="student parents at UofT"
              shimmerVariant="green"
              triggerProps={{ onMouseEnter: playButtonHover }}
              content={
                <>
                  <div className="mb-2">
                    <strong>Research Scope:</strong>
                  </div>
                  <div className="mb-2">
                    • 31 student parents in 6 group sessions and 2 interviews
                  </div>
                  <div className="mb-2">
                    • 12 participants in 3 co-creation sessions
                  </div>
                  <div className="mb-2">
                    • 5 detailed personas developed
                  </div>
                  <div>
                    • 10 design principles with 50+ implementation ideas
                  </div>
                </>
              }
              caption={{
                text: "View full report (PDF)",
                link: "https://ose.utoronto.ca/wp-content/uploads/Family-Care-Office-Report-April-2024.pdf"
              }}
              side="bottom"
              width="w-80"
              sideOffset="1"
            />
            , uncovering how they navigate impossible choices between family responsibilities and academic demands. The findings were rich—but they lived in a 26-page report that staff and faculty wouldn&apos;t realistically engage with.</>,
            <>The Family Care Office wanted to transform these insights into a practical toolkit. The design team created a beautiful multi-page experience with separate sections for personas, design principles, and implementation strategies—each needing its own shareable URL so the office could send targeted resources to specific stakeholders.</>,
            <>But there was a problem: WordPress governance at UofT restricted the Family Care Office to a single page. No subpages, no additional URLs. The design vision and technical reality seemed fundamentally incompatible.</>,
          ]}
        />

        <CaseStudyTextBlock
          title="Client-side routing: Satisfying both design and technical constraints"
          text={[
            <>I realized we could achieve the design team&apos;s multi-resource experience while respecting the single-page constraint by implementing{" "}
            <DefinitionCard
              trigger="URL hash routing"
              shimmerVariant="green"
              triggerProps={{ onMouseEnter: playButtonHover }}
              content={
                <>
                  <div className="mb-3">
                    Using custom JavaScript, each resource dynamically updates the browser URL with a unique identifier:
                  </div>
                  <div className="mb-2 font-mono text-sm opacity-80">
                    FCO.ca/toolkit#curate-connections
                  </div>
                  <div className="mb-2 font-mono text-sm opacity-80">
                    FCO.ca/toolkit#foster-flexibility
                  </div>
                  <div className="mb-3 font-mono text-sm opacity-80">
                    FCO.ca/toolkit#valeri-persona
                  </div>
                  <div>
                    WordPress sees one page. Users experience many. Each resource gets a shareable link for targeted communication—exactly what stakeholders needed.
                  </div>
                </>
              }
              side="bottom"
              width="w-96"
              sideOffset="1"
            />
            . When users navigate between resources, the URL updates automatically to reflect their current location—giving every resource a unique, shareable link.</>,
            <>This approach satisfied everyone: the design team got their multi-resource experience with individual URLs, the Family Care Office stayed within WordPress governance, and stakeholders could bookmark and share specific personas or principles with their teams. As a bonus, the single-page architecture meant no page reloads—creating a smoother user experience than a traditional multi-page site.</>,
            <><strong>[YOUR INPUT NEEDED: Did you consider alternative technical approaches? Why was URL hash routing the best choice? Add 1-2 sentences about the decision-making process or trade-offs considered.]</strong></>,
          ]}
        /> */}

        {/* ============================================
        {/* PROJECT 3: Designing for Handoff */}
        {/* ============================================ */}
        
{/* 
        <CaseStudyTextBlock
          sectionHeading="Technical Documentation"
          title="Three-layer documentation system for long-term sustainability"
          text={[
            <>Creating the toolkit was only half the challenge. The other half was ensuring that{" "}
            <DefinitionCard
              trigger="future team members"
              shimmerVariant="green"
              triggerProps={{ onMouseEnter: playButtonHover }}
              content={
                <>
                  Innovation Hub team members rotate annually. Future designers and researchers would need to maintain and update the toolkit without my technical expertise. This meant documentation couldn&apos;t just explain <i>what</i> I built—it needed to teach <i>how</i> to use and maintain it.
                </>
              }
              side="bottom"
              width="w-80"
              sideOffset="1"
            />
            {" "}could maintain and update it without my technical background.</>,
            <>I designed a three-layer documentation system: <strong>(1) Technical documentation</strong> for developers who might extend the system, <strong>(2) Visual documentation in Figma</strong> with annotated screenshots for common tasks and troubleshooting, and <strong>(3) Walkthrough videos</strong> demonstrating complete workflows with voiceover explaining the reasoning behind each step.</>,
            <>I also contributed all custom components to Innovation Hub&apos;s internal design system, with usage guidelines and code patterns that could be reused across future projects. This project taught me that documentation is a design challenge—you&apos;re designing for future users you&apos;ll never meet.</>,
          ]}
        />  */}


        <CaseStudyTextBlock 
          sectionHeading="Technical Documentation"
          title="Future-proofing with visuals"
          text={[ 
            <>
              In discussions with the design team, we found that documentation works best when paired with walkthrough visuals.
            </>,
            <>
            By incorporating visuals in our documentation, designers are able to resolve common issues and make changes to any custom component without the technical expertise.
          </>,
          ]}
        />
        <CaseStudyMediaBlock
          type="image"
          src="/assets/images/ihub/technical_documentation.png"
          size="medium"
        />

        <CaseStudyMediaBlock
          type="image"
          src="/assets/images/ihub/design_system.png"
          size="medium"
          caption=""
        />

{/* 
        <CaseStudyTextBlock
          sectionHeading="Outcomes"
          title="What this project taught me"
          text={[
            <div key="constraints" className="flex flex-col mb-2">
              <strong>Constraints can be creative catalysts</strong>
              <span className="text-[#D9D9D9]">When I first learned about the single-page limitation, I saw it as a frustrating obstacle. But working through the constraint led to a solution (URL hash routing) that actually improved the user experience with seamless transitions between resources. This project taught me to view technical constraints as design opportunities, not just problems to solve.</span>
            </div>,
            <div key="technical" className="flex flex-col mb-2">
              <strong>Technical knowledge expands design possibilities</strong>
              <span className="text-[#D9D9D9]">My background in web development helped me see a solution that a designer-only team might not have considered. But more importantly, understanding technical possibilities early in the design process meant I could propose solutions that were both user-friendly and technically feasible—rather than designing ideal experiences and hoping they could be built.</span>
            </div>,
            <div key="sustainability" className="flex flex-col mb-2">
              <strong>Sustainability requires intentional design</strong>
              <span className="text-[#D9D9D9]">Before this project, I thought of documentation as an afterthought—something you do when the &quot;real work&quot; is finished. But designing for handoff taught me that creating maintainable systems is just as important as the initial build. The three-layer documentation approach, custom WordPress blocks, and design system contributions were all intentional design decisions aimed at future maintainers—they were part of the project&apos;s core value, not extra tasks.</span>
            </div>,
            <div key="research" className="flex flex-col mb-2">
              <strong>Research translation is design work</strong>
              <span className="text-[#D9D9D9]">Converting a 26-page research report into a web experience required design decisions at every level: information architecture, content hierarchy, navigation patterns, and interaction design. I learned that &quot;putting content online&quot; is actually a sophisticated design challenge—it&apos;s about understanding user intent, creating intuitive pathways through information, and making complex insights actionable.</span>
            </div>,
          />
          ]} */}

        <CaseStudyTextBlock
          text="This case study is currently a work in progress. Reach out if you're curious about it :)"
        />


        {/* Navigation to Next Project - Inside Case Study Section */}
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
