"use client";

import Link from "next/link";
import ProjectLayout from "../_shared/ProjectLayout";
import ContentBlock from "../components/contentTypes/ContentBlock";
import CaseStudySection from "../_shared/CaseStudySection";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import CaseStudyMediaBlock from "../components/contentTypes/CaseStudyMediaBlock";
import { CaseStudySectionBlock, CaseStudySectionBlockFixed } from "../components/contentTypes/CaseStudySectionBlock";
import DefinitionCard from "../components/contentTypes/DefinitionCard";
import { TextShimmer } from "../../ui/text-shimmer";
import { projectData } from "./data";
import { getNextProject } from "../projects";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import CaseStudyNavigation from "../_shared/CaseStudyNavigation";

export default function ProjectPage() {
  const { playHover, playButtonHover } = useSoundEffects();

  const currentSlug = "socratic";
  const nextProject = getNextProject(currentSlug);

  const sections = [
    { id: "problem",         heading: "Problem" },
    { id: "solutions",       heading: "Solutions" },
    { id: "discovery",       heading: "Discovery" },
    { id: "initial-designs", heading: "Initial Designs" },
    { id: "pm-process",      heading: "PM Process" },
    { id: "iterations",      heading: "Iterations" },
    { id: "final-designs",   heading: "Final Designs" },
    { id: "closing",         heading: "Closing" },
  ];

  return (
    <>
      <ProjectLayout projectData={projectData}>
        <ContentBlock
          // title="The Challenge: Making AI write award-winning scholarship applications"
          // text="Scholarship prompts are often vague and open-ended. As part of the UofTxAnthropic Hackathon, the challenge was to create an AI-powered application that detects hidden criteria and writes applications that meet them."
          media={{
            type: "image",
            src: "https://cdn.sanity.io/images/iy4m4myd/production/fb22b5dad342c2282ecb24dc8a93b72720928a2b-1980x1080.png",
            aspectRatio: "video",
            caption: "",
          }}
        />
        {/* <ContentBlock
          title="A conversation with AI"
          text="We built a model that uses Socratic questioning to engage users critically. Through dynamic prompts, it generates fine-tuned responses within a collaborative interface where students work alongside AI."
          media={{
            type: "video",
            src: "https://stream.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: "Instead of generic outputs, users provide critically engaged responses that result in more personalized, insightful, and relevant scholarship application essays.",
          }}
          thumbnail="https://image.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo/thumbnail.png?width=1919&height=1080&time=0"
        />
        <ContentBlock
          title={<>Reimagining{" "}
          <DefinitionCard
            trigger="HAX"
            shimmerVariant="brown"
            triggerProps={{ onMouseEnter: playButtonHover }}
            content={
              <>
                <strong>What is Human-AI Interaction (HAX)?</strong>
                <br /><br />
                Human-AI interaction studies and designs how humans and artificial intelligence systems communicate and collaborate. It aims to create AI systems that are user-friendly, trustworthy, ethical, and beneficial for humans.
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
            src: "https://cdn.sanity.io/images/iy4m4myd/production/9b61285d1d9d73ac27dc06a4db2f4912b91b7c39-1803x983.png",
            aspectRatio: "video",
            caption: "This mode of interaction was applauded for its innovative and visual-based approach.",
          }}
        />
        <ContentBlock
          title="Leading a multi-disciplinary team"
          text="In order to deliver a 0→1 app in 7 days, I recruited one ML engineer, two developers, and a UX researcher. Making the most of 7 days meant coordinating busy student schedules, providing direction and functional requirements for each ticket while ensuring a fun working environment."
          media={{
            type: "image",
            src: "https://cdn.sanity.io/images/iy4m4myd/production/58bf804f5281efdff99301a485dd73a761e03ef6-1803x1125.png",
            aspectRatio: "video",
            caption: "I used Notion's kanban board for sprint planning (3-day sprints), when2meet to coordinate availability for in-person sessions, and Discord for daily standups.",
          }}
        /> */}
      </ProjectLayout>

      <CaseStudyNavigation sections={sections} />

      <CaseStudySection title="" theme={projectData.caseStudy}>

        {/* ─── PROBLEM ─── */}
        <CaseStudyTextBlock
          id="problem"
          className="pt-64"
          sectionHeading="The Problem"
          title="Chat AI fails writers because writing is spatial. Chat is linear."
          text={[
            <>
              Generic AI writing tools produce{" "}
              <DefinitionCard
                trigger="generic outputs"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>What chat AI loses in the process:</strong>
                    </div>
                    <div className="mb-2">• The writer&apos;s authentic voice — smoothed into statistical average</div>
                    <div className="mb-2">• Unstated scholarship criteria — hidden in what committees don&apos;t write down</div>
                    <div>• Reflective thinking — bypassed entirely when AI writes the answer</div>
                  </>
                }
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              {" "}because they skip the thinking that makes writing personal. For scholarship essays especially, the quality of the thought behind the words determines the outcome — not the polish.
            </>,
            <>
              Chat interfaces compound this with a{" "}
              <DefinitionCard
                trigger="black box experience"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    <div className="mb-2">
                      <strong>Three layers of opacity in chat AI:</strong>
                    </div>
                    <div className="mb-2">• No visibility into why AI said what it said</div>
                    <div className="mb-2">• No agency over multiple drafts or directions at once</div>
                    <div>• No spatial organization — everything is a flat, chronological thread</div>
                  </>
                }
                side="bottom"
                width="w-90"
                sideOffset="1"
              />
              : users can&apos;t see the reasoning, can&apos;t compare alternatives side by side, and can&apos;t organize their thinking spatially the way writing actually works.
            </>,
          ]}
        />

        <CaseStudyTextBlock
          className="pb-64"
          sectionHeading="The Challenge"
          text={[
            <>
              How do you make AI collaboration feel <strong>transparent and generative</strong>, not prescriptive? And how do you ship it in 7 days?
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
                title: "Socratic questioning model.",
                description: "Instead of writing for users, the AI asks questions that guide them to articulate what's already there — making the output authentically theirs.",
              },
              {
                title: "Canvas-based spatial interface.",
                description: "Writing is non-linear. The canvas lets users place, compare, group, and navigate multiple drafts at once, the way thinking actually works.",
              },
            ]}
          >
            <CaseStudyMediaBlock
              type="video"
              src="https://stream.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo.m3u8?min_resolution=1080p"
              thumbnail="https://image.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo/thumbnail.png?width=1919&height=1080&time=0"
              size="medium"
              aspectRatio="video"
              caption="Socratic questioning model — app demo"
              className="max-w-full pt-0 pb-4"
            />
            <CaseStudyMediaBlock
              type="image"
              src="https://cdn.sanity.io/images/iy4m4myd/production/9b61285d1d9d73ac27dc06a4db2f4912b91b7c39-1803x983.png"
              size="medium"
              caption="Canvas-based spatial interface"
              className="max-w-full pt-0 pb-4"
            />
          </CaseStudySectionBlock>
        </div>

        {/* ─── DISCOVERY ─── */}
        <div id="discovery" className="flex flex-col gutter-sm">
          <CaseStudyTextBlock
            className="py-64"
            sectionHeading="Discovery"
            title="We asked 10 people on campus about their experience with chat-AI interfaces."
            text={[
              <>
                We found that the root cause isn&apos;t the AI, but a fundamental{" "}
                <DefinitionCard
                  trigger="mental model mismatch"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-2">
                        <i>How writers actually think:</i>
                      </div>
                      <div className="mb-2">• <strong>Non-linear:</strong> jumping between ideas, returning to earlier sections</div>
                      <div className="mb-2">• <strong>Spatial:</strong> organizing thoughts by grouping, proximity, and contrast</div>
                      <div>• <strong>Iterative:</strong> holding multiple drafts simultaneously and comparing them</div>
                    </>
                  }
                  side="bottom"
                  width="w-90"
                  sideOffset="1"
                />
                {" "}between how AI chat works and how writing actually happens in practice.
              </>,
              <>
                This produces{" "}
                <DefinitionCard
                  trigger="three failure modes"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-2">
                        <i>Where AI writing tools break down:</i>
                      </div>
                      <div className="mb-2"><strong>Generic outputs</strong>. Averaged voice, missing personal specificity</div>
                      <div className="mb-2"><strong>Lack of agency</strong>. Users receive, not create; no spatial org of ideas</div>
                      <div><strong>No spatial organization</strong>. Flat thread makes comparison and iteration impossible</div>
                    </>
                  }
                  side="bottom"
                  width="w-90"
                  sideOffset="1"
                />
                {" "}in chat-based AI writing tools — and all three pointed to the same solution: give users more agency over the process.
              </>,
            ]}
          />
          {/* <CaseStudyMediaBlock
            type="image"
            src="https://cdn.sanity.io/images/iy4m4myd/production/fb22b5dad342c2282ecb24dc8a93b72720928a2b-1980x1080.png"
            size="medium"
            className="pt-0 pb-4"
          /> */}
        </div>

        {/* ─── INITIAL DESIGNS ─── */}
        <div id="initial-designs" className="flex flex-col gutter-lg">
          <div className="flex flex-col">
            <CaseStudyTextBlock
              sectionHeading="Initial Designs"
              title="Questions, not answers."
              text={[
                <>
                  The core of Socratic.ai is a{" "}
                  <DefinitionCard
                    trigger="Socratic questioning model"
                    shimmerVariant="brown"
                    triggerProps={{ onMouseEnter: playButtonHover }}
                    content={
                      <>
                        <div className="mb-2">
                          <strong>How Socratic questioning works for essays:</strong>
                        </div>
                        <div className="mb-2">Instead of asking &ldquo;write me an essay about X,&rdquo; the AI asks: &ldquo;What specifically changed for you because of that experience?&rdquo;</div>
                        <div className="mb-2">Each question surfaces a layer of the writer&apos;s authentic voice that a generic prompt would smooth over.</div>
                        <div>The essay that emerges is genuinely the writer&apos;s — the AI shaped the thinking process, not the output.</div>
                      </>
                    }
                    side="bottom"
                    width="w-90"
                    sideOffset="1"
                  />
                  : instead of writing for users, the AI asks targeted questions that help them articulate what&apos;s already there. The output is authentically theirs because the thinking was theirs.
                </>,
              ]}
            />
            <CaseStudyMediaBlock
              type="video"
              src="https://stream.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo.m3u8?min_resolution=1080p"
              thumbnail="https://image.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo/thumbnail.png?width=1919&height=1080&time=0"
              size="small"
              aspectRatio="video"
              caption="Socratic questioning in action"
              className="pt-0 pb-4"
            />
          </div>

          <div className="flex flex-col">
            <CaseStudyTextBlock
              title="From thread to canvas."
              text={[
                <>
                  We replaced the chat thread with a{" "}
                  <DefinitionCard
                    trigger="vector canvas"
                    shimmerVariant="brown"
                    triggerProps={{ onMouseEnter: playButtonHover }}
                    content={
                      <>
                        <div className="mb-2">
                          <i>What a canvas affords that a thread doesn&apos;t:</i>
                        </div>
                        <div className="mb-2"><strong>Place</strong>: Put ideas where they belong, not where they arrived</div>
                        <div className="mb-2"><strong>Compare</strong>: Hold two drafts side by side at the same time</div>
                        <div className="mb-2"><strong>Group</strong>: Cluster related ideas spatially</div>
                        <div><strong>Navigate</strong>: Zoom out to see the whole, zoom in to edit a part</div>
                      </>
                    }
                    side="bottom"
                    width="w-90"
                    sideOffset="1"
                  />
                  {" "}that lets users place, compare, group, and navigate their ideas the way writing actually works — non-linearly, spatially, iteratively.
                </>,
              ]}
            />
            <CaseStudyMediaBlock
              type="image"
              src="https://cdn.sanity.io/images/iy4m4myd/production/9b61285d1d9d73ac27dc06a4db2f4912b91b7c39-1803x983.png"
              size="small"
              caption="Canvas interface — spatial organization of AI insights and drafts"
              className="pt-0 pb-4"
            />
          </div>

          <div className="flex flex-col">
            <CaseStudyTextBlock
              title="Surfacing what the prompt doesn't say."
              text={[
                <>
                  Scholarship prompts are designed to be open-ended — but{" "}
                  <DefinitionCard
                    trigger="winning scholarship essays"
                    shimmerVariant="brown"
                    triggerProps={{ onMouseEnter: playButtonHover }}
                    content={
                      <>
                        <div className="mb-2">
                          <strong>What strong scholarship essays signal:</strong>
                        </div>
                        <div className="mb-2">• Specific, concrete detail — not abstract claims about character</div>
                        <div className="mb-2">• A clear through-line connecting experience to impact to future direction</div>
                        <div className="mb-2">• Evidence of reflection, not just recounting</div>
                        <div>• Alignment with the committee&apos;s stated values — often buried in the mission statement, not the prompt</div>
                      </>
                    }
                    side="bottom"
                    width="w-90"
                    sideOffset="1"
                  />
                  {" "}carry hidden criteria that committees never write down. Socratic.ai surfaces those criteria during the questioning process — so users write toward them without being told what to say.
                </>,
              ]}
            />
            <CaseStudyMediaBlock
              type="image"
              src="https://cdn.sanity.io/images/iy4m4myd/production/fb22b5dad342c2282ecb24dc8a93b72720928a2b-1980x1080.png"
              size="small"
              caption="Hidden criteria surfaced from the scholarship prompt"
              className="pt-0 pb-4"
            />
          </div>
        </div>

        {/* ─── PM PROCESS ─── */}
        <div id="pm-process">
          <CaseStudySectionBlockFixed
            sectionHeading="PM Process"
            title="Recruiting and running a 5-person team in 7 days."
            description={[
              "I recruited one ML engineer, two full-stack developers, and a UX researcher — then set up the infrastructure to keep us moving: Notion kanban for sprint planning (3-day sprints), when2meet to find in-person overlap in busy student schedules, Discord for daily async standups.",
              "My job as PM was to turn design decisions into functional requirements that developers could act on immediately — and to create enough clarity that everyone could work in parallel without blocking each other.",
            ]}
          >
            <CaseStudyMediaBlock
              type="image"
              src="https://cdn.sanity.io/images/iy4m4myd/production/58bf804f5281efdff99301a485dd73a761e03ef6-1803x1125.png"
              size="medium"
              caption="Team coordination — Notion kanban, when2meet, Discord"
              className="max-w-full pt-0 pb-4"
            />
          </CaseStudySectionBlockFixed>
        </div>

        {/* ─── ITERATIONS ─── */}
        <div id="iterations" className="flex flex-col gap-24">
          <CaseStudySectionBlockFixed
            sectionHeading="Iterations"
            title="Canvas Onboarding"
            description={[
              "First-time users opened the canvas and didn't know what to do first. The blank state created paralysis — they understood what the canvas was for, but not where to start.",
              <div key="quote-1" className="flex flex-col">
                <blockquote className="border-l-2 border-[#799A92] pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;I see the canvas but I don&apos;t know what I&apos;m supposed to put on it first.&rdquo;</p>
                </blockquote>
              </div>,
              "I designed a guided first-run flow: paste your prompt → hidden criteria surface automatically → the first Socratic question auto-loads on the canvas. Users arrive with something to respond to, not an empty page.",
            ]}
          >
            <CaseStudyMediaBlock
              type="image"
              src="https://cdn.sanity.io/images/iy4m4myd/production/9b61285d1d9d73ac27dc06a4db2f4912b91b7c39-1803x983.png"
              size="medium"
              className="pt-0!"
            />
          </CaseStudySectionBlockFixed>

          <CaseStudySectionBlockFixed
            title="AI Thinking Visibility"
            description={[
              "Users received Socratic questions but didn't understand why they were being asked. Without that context, responses felt arbitrary — and users couldn't evaluate whether the question was worth their time.",
              <div key="quote-2" className="flex flex-col">
                <blockquote className="border-l-2 border-[#799A92] pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;It&apos;s asking me this but I don&apos;t know why.&rdquo;</p>
                </blockquote>
              </div>,
              "I added an expandable reasoning panel to each question — linking it explicitly to the hidden criterion it was designed to surface. Users could now see the logic behind each question and decide whether to engage or skip.",
            ]}
          >
            <CaseStudyMediaBlock
              type="video"
              src="https://stream.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo.m3u8?min_resolution=1080p"
              thumbnail="https://image.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo/thumbnail.png?width=1919&height=1080&time=0"
              size="medium"
              className="pt-0!"
            />
          </CaseStudySectionBlockFixed>
        </div>

        {/* ─── FINAL DESIGNS ─── */}
        <div id="final-designs" className="flex flex-col gutter-base px-8 py-16">
          <CaseStudyTextBlock
            sectionHeading="Final Designs"
            title="A Socratic model on a spatial canvas"
            text={[
              <>
                Socratic.ai makes AI collaboration transparent and generative — not prescriptive. The Socratic questioning model surfaces authentic voice. The canvas gives writers spatial control over their thinking. The reasoning panel makes AI logic visible and evaluable.
              </>
            ]}
          />
          <CaseStudyMediaBlock
            type="video"
            src="https://stream.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo.m3u8?min_resolution=1080p"
            thumbnail="https://image.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo/thumbnail.png?width=1919&height=1080&time=0"
            size="medium"
            aspectRatio="video"
            caption="Full app demo — Socratic questioning, canvas, reasoning panel"
            className="pt-0 pb-4"
          />
          <CaseStudyMediaBlock
            type="image"
            src="https://cdn.sanity.io/images/iy4m4myd/production/9b61285d1d9d73ac27dc06a4db2f4912b91b7c39-1803x983.png"
            size="medium"
            caption="Canvas interface — spatial organization, draft comparison, criteria mapping"
            className="pt-0 pb-4"
          />
        </div>

        {/* ─── CLOSING ─── */}
        <CaseStudyTextBlock
          id="closing"
          sectionHeading="Closing"
          title="Final thoughts and learnings"
          text={[
            <div key="constraints" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">Constraints made the decisions easier</strong>
              <span className="text-p text-400 text-(--text-color-80)">I expected seven days to feel limiting. Instead, it removed a lot of the noise. Every decision had to be <strong className="text-600">justified right away</strong>, so there was no time to second-guess or over-explore. The design ended up sharper than it probably would have been with more runway.</span>
            </div>,
            <div key="mental" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">The interface was the real problem, not the AI</strong>
              <span className="text-p text-400 text-(--text-color-80)">I went in thinking the issue was output quality. It wasn&apos;t. It was that <strong className="text-600">chat threads don&apos;t match how writing actually happens</strong>. Reframing it as a mental model problem changed everything about how we approached the solution.</span>
            </div>,
            <div key="transparency" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">Showing the reasoning changed how people used the AI</strong>
              <span className="text-p text-400 text-(--text-color-80)">Users weren&apos;t skeptical of the outputs as much as they were skeptical of the process. Once they could see why the AI was asking a question, they <strong className="text-600">engaged with it more seriously</strong> instead of just answering to get past it.</span>
            </div>,
            <div key="pm" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">Being a good PM meant staying out of the way</strong>
              <span className="text-p text-400 text-(--text-color-80)">I thought my job was coordination. It turned out to be <strong className="text-600">removing blockers before the team hit them</strong>. Writing clear requirements, making scope calls early, and keeping async communication tight meant people could keep working without waiting on me.</span>
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
