"use client";

import Link from "next/link";
import ProjectLayout from "../_shared/ProjectLayout";
import ContentBlock from "../components/contentTypes/ContentBlock";
import CaseStudySection from "../_shared/CaseStudySection";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import { CaseStudySectionBlock } from "../components/contentTypes/CaseStudySectionBlock";
import DefinitionCard from "../components/contentTypes/DefinitionCard";
import { projectData } from "./data";
import { getNextProject } from "../projects";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import CaseStudyNavigation from "../_shared/CaseStudyNavigation";

export default function ProjectPage() {
  const { playHover, playButtonHover } = useSoundEffects();

  const currentSlug = "figma-ball-knowledge";
  const nextProject = getNextProject(currentSlug);

  const sections = [
    { id: "overview", heading: "Overview" },
    { id: "solutions", heading: "Solutions" },
  ];

  return (
    <>
      <ProjectLayout projectData={projectData}>
        <ContentBlock
          media={{
            type: "image",
            src: "https://image.mux.com/WTe01qzytOwy8GNIsTtpYcEzrp01Yjoz4XxDeZX02ZcY9A/thumbnail.png?width=1919&height=1080&time=9999",
            aspectRatio: "video",
            caption: "",
          }}
          priority
        />
      </ProjectLayout>

      <CaseStudyNavigation sections={sections} />

      <CaseStudySection title="" theme={projectData.caseStudy}>

        {/* ── Overview ─────────────────────────────────────────── */}
        <CaseStudyTextBlock
          id="overview"
          className="pt-64 pb-48"
          sectionHeading="Overview"
          title="Figma's AI tools were built for engineers. I built one for designers."
          text={[
            <>
              New design tools like{" "}
              <DefinitionCard
                trigger="Paper"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>Paper (paper.design).</strong>
                    </div>
                    <div className="mb-2">HTML and CSS-native canvas with bidirectional MCP exposing 24 tools, GPU-accelerated shaders, and a free tier of 100 MCP calls per week.</div>
                    <div>Marketed and reviewed as &ldquo;MCP-first, not MCP-as-afterthought.&rdquo;</div>
                  </>
                }
                caption={{
                  text: "Abduzeedo, March 2026",
                  link: "https://paper.design"
                }}
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              {" "}and{" "}
              <DefinitionCard
                trigger="Pencil"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>Pencil (pencil.dev).</strong>
                    </div>
                    <div className="mb-2">Figma-like canvas that lives inside Cursor or Claude Code, with design files versioned in Git alongside code.</div>
                    <div>Free during early access. One designer testing it with Claude Code described the workflow as &ldquo;vibe-designing&rdquo; and reported they &ldquo;never touched the canvas.&rdquo;</div>
                  </>
                }
                caption={{
                  text: "ADPList Substack, March 2026",
                  link: "https://pencil.dev"
                }}
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              {" "}shipped with AI baked in from day one. Figma is a{" "}
              <DefinitionCard
                trigger="retrofit"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>The retrofit framing.</strong>
                    </div>
                    <div className="mb-2">Lisa Demchenko (@llsbetdigital) on X: designers are comparing Figma&apos;s MCP to tools &ldquo;natively built for AI and design engineering,&rdquo; but Figma was not built for this originally and is retrofitting while keeping the existing product working.</div>
                    <div>The defense is structural: not that the experience is fine today, but that the trajectory is right.</div>
                  </>
                }
                caption={{
                  text: "@llsbetdigital on X, April 2026",
                  link: "https://x.com/llsbetdigital"
                }}
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              — the file format, the API, the editing model all predate the agent. That gap shows.
            </>,
            <>
              I spent time with the{" "}
              <DefinitionCard
                trigger="official MCP workflow"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>Four recurring failure modes.</strong>
                    </div>
                    <div className="mb-1">• Calls that freeze on a license-check error, surfaced as a hang rather than an exception.</div>
                    <div className="mb-1">• Outputs at roughly 10 to 15 percent fidelity on real components.</div>
                    <div className="mb-1">• Round-trips that demand an operator who is &ldquo;both talented and rigorous.&rdquo;</div>
                    <div>• Most tiers locked out of the features the official path depends on for fidelity.</div>
                  </>
                }
                caption={{
                  text: "Synthesis: forum.figma.com, creativebloq.com, medium.com",
                  link: "https://forum.figma.com/"
                }}
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              {" "}and hit the same walls everyone else did. Calls freeze with no useful error. Components come back at{" "}
              <DefinitionCard
                trigger="10 to 15 percent fidelity"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>From the Figma forum.</strong>
                    </div>
                    <div className="mb-2">&ldquo;Every time I asked Claude Code or Cursor to style my UI component like the provided link, it&apos;d not even close. It was 85 to 90 percent wrong, sometimes really wrong.&rdquo;</div>
                    <div>The same prompt run through Figma Make on Claude Sonnet &ldquo;completely nailed&rdquo; the result, suggesting the gap is in the MCP path specifically.</div>
                  </>
                }
                caption={{
                  text: "Figma Forum, June 2025",
                  link: "https://forum.figma.com/"
                }}
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              . Fixing the output requires someone who is{" "}
              <DefinitionCard
                trigger="both talented and rigorous"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>Creative Bloq&apos;s senior designer review.</strong>
                    </div>
                    <div>The workflow only succeeds with someone &ldquo;both talented and rigorous through the round trip.&rdquo; The author called the combination &ldquo;a bit of a unicorn.&rdquo;</div>
                  </>
                }
                caption={{
                  text: "Creative Bloq, April 2026",
                  link: "https://www.creativebloq.com/"
                }}
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              {" "}— which most designers aren&apos;t, because the tool was never built for them.
            </>,
            <>
              Every{" "}
              <DefinitionCard
                trigger="first-party skill Figma ships"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>The official Figma skill set.</strong>
                    </div>
                    <div className="mb-2">figma-use; figma-generate-design; figma-generate-library; figma-implement-design; figma-code-connect-components; figma-create-design-system-rules.</div>
                    <div>Engineering-first framing throughout. The flagship implement skill describes itself as the choice &ldquo;when the deliverable is code in the user&apos;s repository.&rdquo;</div>
                  </>
                }
                caption={{
                  text: "Figma developer docs",
                  link: "https://developers.figma.com/docs/figma-mcp-server/"
                }}
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              {" "}frames the deliverable as code in a developer&apos;s repo. Designers who{" "}
              <DefinitionCard
                trigger="work in the file"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>From XDA Developers.</strong>
                    </div>
                    <div>&ldquo;The integration has an image problem. It is primarily aimed at people who code. As someone who doesn&apos;t code at all, I felt a bit left out.&rdquo;</div>
                  </>
                }
                caption={{
                  text: "XDA Developers, April 2026",
                  link: "https://www.xda-developers.com/"
                }}
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              {" "}— not the codebase — are structurally underserved. That&apos;s the gap I built for: making the agent feel intentional inside a tool it was retrofitted onto, for designers who cannot, or will not, migrate off Figma.
            </>,
          ]}
        />

        {/* ── Solutions ────────────────────────────────────────── */}
        <div id="solutions">
          <CaseStudySectionBlock
            sectionHeading="Solutions"
            className="py-16"
            dark
            textStates={[
              {
                title: "Ask before acting.",
                description:
                  "The skill captures intent before touching anything — the goal, the target frame, what good looks like, what to fall back on if the library isn't published. Figma's first-party skills go straight to execution. This one pauses first, so the agent stops burning tool calls on the wrong assumption.",
              },
              {
                title: "Scan the file before writing to it.",
                description:
                  "Every session maps the file structure with get_metadata before reaching for get_design_context. This is the scan-first pattern Figma's own team documents as the right response to the MCP's token limits. It's slower upfront and catches a class of errors the baseline misses entirely.",
              },
              {
                title: "Preferences that carry forward.",
                description:
                  "Designers shouldn't have to re-explain their token names, layout conventions, or naming patterns every time they start a new session. The skill reads preferences once at the start and carries them forward — so the second prompt builds on the first instead of starting from zero.",
              },
            ]}
          />
        </div>

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
