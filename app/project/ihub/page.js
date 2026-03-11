"use client";

import Link from "next/link";
import ProjectLayout from "../_shared/ProjectLayout";
import ContentBlock from "../components/contentTypes/ContentBlock";
import CaseStudySection from "../_shared/CaseStudySection";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import CaseStudyMediaBlock from "../components/contentTypes/CaseStudyMediaBlock";
import { CaseStudySectionBlock, CaseStudySectionBlockFixed } from "../components/contentTypes/CaseStudySectionBlock";
import CaseStudyHighlightsBlock from "../components/contentTypes/CaseStudyHighlightsBlock";
import DefinitionCard from "../components/contentTypes/DefinitionCard";
import { TextShimmer } from "../../ui/text-shimmer";
import { projectData } from "./data";
import { getNextProject } from "../projects";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import CaseStudyNavigation from "../_shared/CaseStudyNavigation";

export default function ProjectPage() {
  const { playHover, playButtonHover } = useSoundEffects();

  const currentSlug = "ihub";
  const nextProject = getNextProject(currentSlug);

  const sections = [
    { id: "problem",       heading: "Problem" },
    { id: "solutions",     heading: "Solutions" },
    { id: "discovery",     heading: "Discovery" },
    { id: "ihub-website",  heading: "iHub Website" },
    { id: "fco-toolkit",   heading: "FCO Toolkit" },
    { id: "iterations",    heading: "Iterations" },
    { id: "final-designs", heading: "Final Designs" },
    { id: "closing",       heading: "Closing" },
  ];

  return (
    <>
      <ProjectLayout projectData={projectData}>
        <ContentBlock
          media={{
            type: "image",
            src: "https://cdn.sanity.io/images/iy4m4myd/production/06f5335aa8fe0b070994ddf56c66c3b44414bce2-3200x1800.png",
            aspectRatio: "video",
            caption: "",
          }}
        />
        <ContentBlock
          media={{
            type: "video",
            src: "https://stream.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: "",
          }}
          thumbnail="https://image.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc/thumbnail.png?width=1919&height=1080&time=0"
          isFirstVideo={true}
        />
        <ContentBlock
          media={{
            type: "video",
            src: "https://stream.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: "",
          }}
          thumbnail="https://image.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8/thumbnail.png?width=1919&height=1080&time=0"
        />
        <ContentBlock
          media={{
            type: "video",
            src: "https://stream.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: "",
          }}
          thumbnail="https://image.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY/thumbnail.png?width=1919&height=1080&time=0"
        />
      </ProjectLayout>

      <CaseStudyNavigation sections={sections} />

      <CaseStudySection title="" theme={projectData.caseStudy}>

        {/* ─── PROBLEM ─── */}
        <CaseStudyTextBlock
          id="problem"
          className="pt-64"
          sectionHeading="The Problem"
          title="Two projects. One constraint: designers who can't write code."
          text={[
            <>
              The iHub website runs on{" "}
              <DefinitionCard
                trigger="Beaver Builder"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>What Beaver Builder can&apos;t do natively:</strong>
                    </div>
                    <div className="mb-2">• Custom responsive breakpoints beyond its presets</div>
                    <div className="mb-2">• Encapsulated component logic (all widgets are stateless)</div>
                    <div className="mb-2">• Fluid typography that scales with viewport width</div>
                    <div>• Shareable deep-links within a single-page architecture</div>
                  </>
                }
                side="bottom"
                width="w-80"
                sideOffset="1"
              />
              , a drag-and-drop WordPress builder that limits what designers can ship without a developer request. My job was to push past those limits — and make the solutions accessible to the next designer on the team.
            </>,
            <>
              The FCO Toolkit presented a different constraint: a{" "}
              <DefinitionCard
                trigger="26-page research report"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>Research scope:</strong>
                    </div>
                    <div className="mb-2">• 31 student parents across 6 group sessions and 2 interviews</div>
                    <div className="mb-2">• 12 participants in 3 co-creation sessions</div>
                    <div className="mb-2">• 5 detailed personas developed</div>
                    <div className="mb-2">• 10 design principles with 50+ implementation ideas</div>
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
              {" "}worth of insights that needed to live inside a single WordPress page — with shareable URLs for each resource.
            </>,
          ]}
        />

        <CaseStudyTextBlock
          className="pb-64"
          sectionHeading="The Challenge"
          text={[
            <>
              How do you build a site for people who can&apos;t write code? And how do you make <strong>one page feel like many pages?</strong>
            </>
          ]}
        />

        {/* ─── SOLUTIONS ─── */}
        <div id="solutions">
          <CaseStudySectionBlock
            sectionHeading="Solutions"
            className="py-16"
            dark
            textStates={[
              {
                title: "Encapsulated Beaver Builder blocks.",
                description: "Custom blocks where all responsive logic lives inside the component itself — so designers drag, drop, and never touch code.",
              },
              {
                title: "URL hash routing.",
                description: "One WordPress page that behaves like many. Each resource gets its own shareable, bookmarkable URL — without leaving the page.",
              },
              {
                title: "Three-layer documentation.",
                description: "Technical docs, Figma annotations, and walkthrough videos — designed for a team that turns over every year.",
              },
            ]}
          >
            <CaseStudyMediaBlock
              type="video"
              src="https://stream.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc.m3u8?min_resolution=1080p"
              thumbnail="https://image.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc/thumbnail.png?width=1919&height=1080&time=0"
              size="medium"
              aspectRatio="video"
              caption="iHub website — custom Beaver Builder blocks"
              className="max-w-full pt-0 pb-4"
            />
            <CaseStudyMediaBlock
              type="video"
              src="https://stream.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8.m3u8?min_resolution=1080p"
              thumbnail="https://image.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8/thumbnail.png?width=1919&height=1080&time=0"
              size="medium"
              aspectRatio="video"
              caption="FCO Toolkit — URL hash routing"
              className="max-w-full pt-0 pb-4"
            />
            <CaseStudyMediaBlock
              type="image"
              src="https://cdn.sanity.io/images/iy4m4myd/production/f5f3ef414e484fe39ef0afc5b469cda62bee787a-3734x1800.png"
              size="medium"
              caption="Three-layer documentation system"
              className="max-w-full pt-0 pb-4"
            />
          </CaseStudySectionBlock>
        </div>

        {/* ─── DISCOVERY ─── */}
        <div id="discovery" className="flex flex-col gutter-sm">
          <CaseStudyTextBlock
            className="pt-64"
            sectionHeading="Discovery"
            title="I came as an intern. I became the web tech SME."
            text={[
              <>
                I joined the iHub design team as a product design intern, but quickly became the subject matter expert for their web tech stack — representing technical feasibility in design sprints and translating designer intentions into working code.
              </>,
              <>
                To make good decisions, I needed to understand what the{" "}
                <DefinitionCard
                  trigger="builder could and couldn't do"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-2">
                        <strong>Native Beaver Builder limits:</strong>
                      </div>
                      <div className="mb-2">• No custom responsive breakpoints</div>
                      <div className="mb-2">• No encapsulated widget logic — all state is global</div>
                      <div className="mb-2">• Typography doesn&apos;t scale fluidly with viewport</div>
                      <div>• No URL-based navigation within a single page</div>
                    </>
                  }
                  side="bottom"
                  width="w-80"
                  sideOffset="1"
                />
                {" "}— and what gaps I needed to fill with custom code.
              </>,
              <>
                On the FCO side, the research team had spent{" "}
                <DefinitionCard
                  trigger="months of fieldwork with student parents"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-2">
                        <strong>Research scope:</strong>
                      </div>
                      <div className="mb-2">• 31 student parents across 6 group sessions + 2 interviews</div>
                      <div className="mb-2">• 12 participants in 3 co-creation sessions</div>
                      <div className="mb-2">• 5 detailed personas developed</div>
                      <div>• 10 design principles, 50+ implementation ideas</div>
                    </>
                  }
                  side="bottom"
                  width="w-80"
                  sideOffset="1"
                />
                {" "}gathering insights that needed to reach busy staff and faculty — not sit in a PDF.
              </>,
            ]}
          />
          <CaseStudyMediaBlock
            type="image"
            src="https://cdn.sanity.io/images/iy4m4myd/production/06f5335aa8fe0b070994ddf56c66c3b44414bce2-3200x1800.png"
            size="medium"
            className="pt-0 pb-4"
          />
        </div>

        {/* ─── IHUB WEBSITE ─── */}
        <div id="ihub-website" className="flex flex-col gutter-base">
          <CaseStudyTextBlock
            sectionHeading="iHub Website"
            title="Encapsulated logic for a system that limits design."
            text={[
              <>
                Beaver Builder widgets are stateless by default — every style decision has to be re-made each time a designer drops one in. I built custom blocks where{" "}
                <DefinitionCard
                  trigger="all logic is self-contained"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-2">
                        <strong>What &ldquo;encapsulated&rdquo; means in practice:</strong>
                      </div>
                      <div className="mb-2">
                        Each block carries its own responsive rules, typographic scale, and spacing — no external config required.
                      </div>
                      <div>
                        A designer drops the block in, fills in the content fields, and the output is pixel-perfect on every screen size. No dev request needed.
                      </div>
                    </>
                  }
                  side="bottom"
                  width="w-80"
                  sideOffset="1"
                />
                : drag, fill, done. No developer requests, no broken layouts on mobile.
              </>,
            ]}
          />
          <CaseStudyMediaBlock
            type="video"
            src="/assets/videos/ihub/contained-logic.mp4"
            size="medium"
            caption="Saved components are not native to the builder — they must be pre-built with encapsulated logic"
            className="pt-0 pb-4"
          />

          <CaseStudyTextBlock
            title="Defining responsive design."
            text={[
              <>
                I partnered with the design team to define responsive breakpoints and built the mobile-first prototypes in Figma — then translated static type scales into fluid ones using{" "}
                <DefinitionCard
                  trigger="responsive breakpoints"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-2">
                        <strong>Fluid typography in Beaver Builder:</strong>
                      </div>
                      <div className="mb-2">
                        Static px values break on edge-case viewport widths. I replaced them with <code className="text-small bg-black/10 px-1 rounded">clamp()</code> values that scale smoothly between mobile and desktop.
                      </div>
                      <div>
                        Example: <code className="text-small bg-black/10 px-1 rounded">clamp(1rem, 2.5vw, 1.5rem)</code> — scales from 16px to 24px across the viewport range.
                      </div>
                    </>
                  }
                  side="bottom"
                  width="w-80"
                  sideOffset="1"
                />
                {" "}with <code className="text-small">clamp()</code>-based type that scales smoothly across all screen widths.
              </>,
            ]}
          />
          <CaseStudyMediaBlock
            type="image"
            src="https://cdn.sanity.io/images/iy4m4myd/production/fbfb2ca718c25b149bd787e115df3d3daa067d90-3734x1800.png"
            size="medium"
            caption="Working on the &ldquo;Our Work&rdquo; page — designing responsively from the start"
            className="pt-0 pb-4"
          />
        </div>

        {/* ─── FCO TOOLKIT ─── */}
        <div id="fco-toolkit" className="flex flex-col gutter-base">
          <CaseStudyTextBlock
            sectionHeading="FCO Toolkit"
            title="A 26-page report. One WordPress page. Many stakeholders."
            text={[
              <>
                The Family Care Office wanted to turn a rich research report into a practical web toolkit — with separate resources for personas, design principles, and implementation strategies, each with its own{" "}
                <DefinitionCard
                  trigger="shareable URL"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-2">
                        <strong>Why individual URLs matter:</strong>
                      </div>
                      <div className="mb-2">
                        The FCO needed to send targeted resources to specific stakeholders — e.g., a specific persona to a professor, a design principle to an event organizer.
                      </div>
                      <div>
                        Without unique URLs, they&apos;d have to say &ldquo;go to the page, then scroll to find it.&rdquo; With URLs, they paste a link and it opens exactly right.
                      </div>
                    </>
                  }
                  side="bottom"
                  width="w-80"
                  sideOffset="1"
                />
                {" "}so they could send targeted resources to specific audiences.
              </>,
              <>
                But WordPress governance restricted them to a single page. The design vision and the technical constraint seemed incompatible.
              </>,
            ]}
          />

          <CaseStudyTextBlock
            title="WordPress sees one page. Users experience many."
            text={[
              <>
                I implemented{" "}
                <DefinitionCard
                  trigger="URL hash routing"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-3">
                        Custom JavaScript updates the browser URL as users navigate between resources:
                      </div>
                      <div className="mb-2 font-mono text-small opacity-80">
                        FCO.ca/toolkit#curate-connections
                      </div>
                      <div className="mb-2 font-mono text-small opacity-80">
                        FCO.ca/toolkit#foster-flexibility
                      </div>
                      <div className="mb-3 font-mono text-small opacity-80">
                        FCO.ca/toolkit#valeri-persona
                      </div>
                      <div>
                        WordPress sees one page. Users experience many. Each resource gets a shareable link — no page reloads, no broken governance rules.
                      </div>
                    </>
                  }
                  side="bottom"
                  width="w-96"
                  sideOffset="1"
                />
                {" "}using custom JavaScript. When a user navigates to a persona or design principle, the URL updates to reflect exactly where they are — giving every resource a shareable, bookmarkable link without violating the single-page constraint.
              </>,
              <>
                As a bonus: no page reloads means a faster, smoother experience than a traditional multi-page site.
              </>,
            ]}
          />
          <CaseStudyMediaBlock
            type="video"
            src="https://stream.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8.m3u8?min_resolution=1080p"
            thumbnail="https://image.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8/thumbnail.png?width=1919&height=1080&time=0"
            size="medium"
            caption="FCO Toolkit — navigating between resources"
            className="pt-0 pb-4"
          />
          <CaseStudyMediaBlock
            type="video"
            src="https://stream.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY.m3u8?min_resolution=1080p"
            thumbnail="https://image.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY/thumbnail.png?width=1919&height=1080&time=0"
            size="medium"
            caption="FCO Toolkit — persona deep-links"
            className="pt-0 pb-4"
          />
        </div>

        {/* ─── ITERATIONS ─── */}
        <div id="iterations" className="flex flex-col gap-24">
          <CaseStudySectionBlockFixed
            sectionHeading="Iterations"
            title="Component Adoption"
            description={[
              "After the initial handoff, team members were still filing dev requests for changes they could make themselves — they didn't know the blocks were configurable.",
              <div key="quote-1" className="flex flex-col">
                <blockquote className="border-l-2 border-[#427067] pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;I didn&apos;t realize I could do that myself.&rdquo;</p>
                </blockquote>
              </div>,
              "So I added walkthrough videos to the documentation — short screen recordings showing exactly how to edit each block type. Dev requests dropped to near zero.",
            ]}
          >
            <CaseStudyMediaBlock
              type="image"
              src="https://cdn.sanity.io/images/iy4m4myd/production/a7ab016e4654b5542e78ca836736d578c15ea19b-3734x1800.png"
              size="medium"
              className="pt-0!"
            />
          </CaseStudySectionBlockFixed>

          <CaseStudySectionBlockFixed
            title="Responsive Typography"
            description={[
              "During review, designers flagged that type sizes felt off on tablet — correct on desktop and mobile, but awkward in between.",
              <div key="quote-2" className="flex flex-col">
                <blockquote className="border-l-2 border-[#427067] pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;The sizes look right on desktop but something feels off on iPad.&rdquo;</p>
                </blockquote>
              </div>,
              "I replaced the two-breakpoint step function with clamp()-based fluid typography that scales continuously across the full viewport range. I also added a Figma annotation layer so designers could see the live range at any width.",
            ]}
          >
            <CaseStudyMediaBlock
              type="image"
              src="https://cdn.sanity.io/images/iy4m4myd/production/fbfb2ca718c25b149bd787e115df3d3daa067d90-3734x1800.png"
              size="medium"
              className="pt-0!"
            />
          </CaseStudySectionBlockFixed>

          <CaseStudySectionBlockFixed
            title="FCO Navigation"
            description={[
              "In usability sessions, users navigated into a persona or principle but lost track of where they were relative to the rest of the toolkit.",
              <div key="quote-3" className="flex flex-col">
                <blockquote className="border-l-2 border-[#427067] pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;I found the persona I wanted, but I&apos;m not sure how to get back to the main list.&rdquo;</p>
                </blockquote>
              </div>,
              "I added a persistent breadcrumb that updates in sync with the URL hash — always showing the current section and linking back to the top-level view. Users always knew where they were and how to get back.",
            ]}
          >
            <CaseStudyMediaBlock
              type="video"
              src="https://stream.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY.m3u8?min_resolution=1080p"
              thumbnail="https://image.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY/thumbnail.png?width=1919&height=1080&time=0"
              size="medium"
              className="pt-0!"
            />
          </CaseStudySectionBlockFixed>
        </div>

        {/* ─── FINAL DESIGNS ─── */}
        <div id="final-designs">
          <CaseStudyHighlightsBlock
            sectionHeading="Final Designs"
            title="Systems built to last"
            description={[
              <span key={1}>Custom Beaver Builder blocks let designers make site changes <strong>without filing a developer request</strong>. URL hash routing gave the FCO Toolkit <strong>shareable, bookmarkable resources</strong> within a single WordPress page. Three-layer documentation ensures the systems survive <strong>annual team turnover</strong>.</span>
            ]}
            videos={[
              {
                src: "https://stream.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc.m3u8?min_resolution=1080p",
                thumbnail: "https://image.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc/thumbnail.png?width=1919&height=1080&time=0",
                caption: "iHub website — custom blocks"
              },
              {
                src: "https://stream.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8.m3u8?min_resolution=1080p",
                thumbnail: "https://image.mux.com/WnDKo02gp2bjmvqa9DZ8brJMWLDJWB1Y01n9PLf02wRDk8/thumbnail.png?width=1919&height=1080&time=0",
                caption: "FCO Toolkit — hash routing"
              },
              {
                src: "https://stream.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY.m3u8?min_resolution=1080p",
                thumbnail: "https://image.mux.com/UHLgTU7Nm3IOBwVuX2w8diEX6wU8GNVSmj8kYnYFVwY/thumbnail.png?width=1919&height=1080&time=0",
                caption: "FCO Toolkit — deep-links"
              },
            ]}
          />
        </div>

        {/* ─── CLOSING ─── */}
        <CaseStudyTextBlock
          id="closing"
          sectionHeading="Closing"
          title="Final thoughts and learnings"
          text={[
            <div key="constraints" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">Constraints Are Creative Catalysts</strong>
              <span className="text-p text-400 text-(--text-color-80)">The single-page limitation felt like a blocker — but working through it produced a solution that was <strong className="text-600">better than a multi-page site</strong>: faster transitions, no reloads, and clean shareable URLs. The constraint pointed to the right answer.</span>
            </div>,
            <div key="technical" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">Technical Knowledge Expands Design Possibilities</strong>
              <span className="text-p text-400 text-(--text-color-80)">Knowing what Beaver Builder <em>couldn&apos;t</em> do let me propose solutions early in the design process — not as a developer handing back a revised spec, but as a collaborator who <strong className="text-600">shaped the design from the start</strong>.</span>
            </div>,
            <div key="sustainability" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">Sustainability Requires Intentional Design</strong>
              <span className="text-p text-400 text-(--text-color-80)">Documentation isn&apos;t an afterthought. The three-layer system — technical docs, Figma annotations, walkthrough videos — was designed for the next designer I&apos;ll never meet. <strong className="text-600">Handoff is part of the design.</strong></span>
            </div>,
            <div key="research" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">Research Translation Is Design Work</strong>
              <span className="text-p text-400 text-(--text-color-80)">Converting a 26-page report into a navigable web resource required every design skill I had: information architecture, content hierarchy, interaction design, and performance. <strong className="text-600">&ldquo;Putting content online&rdquo; is never just putting content online.</strong></span>
            </div>,
          ]}
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
