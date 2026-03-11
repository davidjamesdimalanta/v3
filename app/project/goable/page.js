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
import ParticipantDemographics from "../components/contentTypes/ParticipantDemographics";
import { TextShimmer } from "../../ui/text-shimmer";
import { projectData } from "./data";
import { getNextProject } from "../projects";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import CaseStudyNavigation from "../_shared/CaseStudyNavigation";

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
  const currentSlug = "goable";
  const nextProject = getNextProject(currentSlug);

  const sections = [
    { id: "problem", heading: "Problem" },
    { id: "solutions", heading: "Solutions" },
    { id: "discovery", heading: "Discovery" },
    { id: "initial-designs", heading: "Initial Designs" },
    { id: "iterations", heading: "Iterations" },
    { id: "final-designs", heading: "Final Designs" },
    { id: "closing", heading: "Closing" },
  ];

  return (
    <>
      {/* ProjectLayout: Contains high-level project overview (constrained to 75vw) */}
      <ProjectLayout projectData={projectData}>
      {/* <ContentBlock
          media={{
            type: "video",
            src: "https://stream.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: "",
          }}
          thumbnail="https://image.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA/thumbnail.png?width=1919&height=1080&time=0"
          isFirstVideo={true}
          priority
        /> */}
        <ContentBlock
          media={{
            type: "image",
            src: "/assets/images/goAble/Spread2.webp",
            aspectRatio: "video",
            caption: "",
          }}
          priority
        />
{/* 
        <ContentBlock
          media={{
            type: "video",
            src: "https://stream.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: ""
          }}
          thumbnail="https://image.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8/thumbnail.png?width=1919&height=1080&time=0"
        />

        <ContentBlock
          media={{
            type: "video",
            src: "https://stream.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: ""
          }}
          thumbnail="https://image.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg/thumbnail.png?width=1919&height=1080&time=0"
        /> */}
{/* 
        <ContentBlock
          media={{
            type: "video",
            src: "https://stream.mux.com/XU4Ly1w1M6d4pmZOKZDIbBdYchQz8njlM008npcId02NQ.m3u8?min_resolution=1080p",
            aspectRatio: "video",
          }}
          thumbnail="https://image.mux.com/XU4Ly1w1M6d4pmZOKZDIbBdYchQz8njlM008npcId02NQ/thumbnail.png?width=1919&height=1080&time=0"
        />

        <ContentBlock
          media={{
            type: "image",
            src: "/assets/images/goAble/goAble_screens.png",
            aspectRatio: "video",
            caption: "Screens included in user flows: Map-based finding, search-based finding, washroom Information Pages, navigation Screens"
          }}
        />

        <ContentBlock
          media={{
            type: "image",
            src: "/assets/images/goAble/styletile_superfinal.png",
            aspectRatio: "video",
            caption: "Design Guide",
          }}
        /> */}
      </ProjectLayout>

      <CaseStudyNavigation sections={sections} />

      {/* CaseStudySection: Full-width detailed process (outside ProjectLayout) */}
      <CaseStudySection title="" theme={projectData.caseStudy}>


      <CaseStudyTextBlock
        id="problem"
        className="pt-64"
        sectionHeading="The Problem"
        title="Current washroom listings lack accessibility-related information."
        text={[
          <>Whether it&apos;s Google Maps, or dedicated washroom finding apps like Toilet Finder, washroom listings on the current market lack sufficient{" "}
          <DefinitionCard
            trigger="Washroom Access"
            shimmerVariant="brown"
            triggerProps={{ onMouseEnter: playButtonHover }}
            content={
              <>
                <i className="pr-[4px]">
                  <TextShimmer variant="brown">Washroom access</TextShimmer>
                </i>
                {" "}involves both physical barriers: <strong>amenity offerings</strong> and <strong>reliable availability</strong>; and emotional barriers: <strong>security & trust</strong>—for users with specific needs.
              </>
            }
            caption={{
              text: "DOI : 10.17577/IJERTV9IS070564",
              link: "https://www.ijert.org/access-to-public-toilets-facilities-amongst-physically-challenged-people"
            }}
            side="bottom"
            width="w-80"
            sideOffset="1"
          />.
          </>,
        ]}
      />

      <CaseStudyTextBlock
        className="pb-64"
        sectionHeading="The Challenge"
        text={[
          <>
          How do we make washrooms more accessible, when <strong>access means something different for everyone?</strong>
          </>
        ]}
      />

      <div id="solutions">
      <CaseStudySectionBlock
        sectionHeading="Solutions"
        className="py-16"
        dark
        textStates={[
          {
            title: "Personalized onboarding & search.",
            description: "Since the accessibility label didn't always cater to people's needs, GoAble asks users about them during onboarding — then filters results to match their profile.",
          },
          {
            title: "Community-driven status updates.",
            description: "Washroom details pages show real-time availability, community sentiment, and granular amenity info so users can make informed decisions before they arrive.",
          },
          {
            title: "Three-tap review & verification.",
            description: "Quick-select, pre-loaded options reduce friction to near zero — making it just as easy to leave a review as it is to skip it.",
          },
        ]}
      >
        <CaseStudyMediaBlock
          type="video"
          src="https://stream.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA.m3u8?min_resolution=1080p"
          thumbnail="https://image.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA/thumbnail.png?width=1919&height=1080&time=0"
          size="medium"
          aspectRatio="video"
          caption="Personalized onboarding & search"
          className="max-w-full pt-0 pb-4"
        />
        <CaseStudyMediaBlock
          type="video"
          src="https://stream.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8.m3u8?min_resolution=1080p"
          thumbnail="https://image.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8/thumbnail.png?width=1919&height=1080&time=0"
          size="medium"
          aspectRatio="video"
          caption="Community-driven status updates"
          className="max-w-full pt-0 pb-4"
        />
        <CaseStudyMediaBlock
          type="video"
          src="https://stream.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg.m3u8?min_resolution=1080p"
          thumbnail="https://image.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg/thumbnail.png?width=1919&height=1080&time=0"
          size="medium"
          aspectRatio="video"
          caption="Three-tap review & verification"
          className="max-w-full pt-0 pb-4"
        />
      </CaseStudySectionBlock>
      </div>


      <div id="discovery" className="flex flex-col gutter-sm">
      <CaseStudyTextBlock
              className="pt-64"
              sectionHeading="Discovery"
              title="Surfacing barriers in washrooms across Toronto"
              text={[
                <>
                <DefinitionCard
                  trigger="Secondary research"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={<ParticipantDemographics />}
                  caption={{
                    text: "",
                    link: ""
                  }}
                  side="right"
                  mobileWidth="w-80"
                  desktopWidth="w-120"
                  sideOffset="1"
                />
                {" "}
                revealed the different barriers to access they experienced when finding a washroom. It influenced our
                {" "}
                <DefinitionCard
                  trigger="design goals"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <>
                      <div className="mb-3">
                        <i className="opacity-60">Design focuses led by our primary research:</i>
                      </div>
                      <div className="mb-2">
                        If washroom access is different for everyone, how might we <i><strong>personalize</strong></i> the washroom finding experience?
                      </div>
                      <div className="mb-2">
                        If washroom listing is sparse, then <i><strong>what amenities do people care about most</strong></i>, and what design principles help communicate them effectively?
                      </div>
                      <div>
                        If sources of truth are rare, then how might we convey <i><strong>trustworthy and relevant</strong></i> washroom info?
                      </div>
                    </>
                  }
                  caption={{
                    text: "",
                    link: ""
                  }}
                  side="right"
                  width="w-120"
                  sideOffset="1"
                />, tackling three critical issues in washroom finding:</>
              ]}
            />
      <CaseStudyMediaBlock
                type="image"
                src="https://cdn.sanity.io/images/iy4m4myd/production/a7cf75a0936db781d820f9277c1b5eae9aab97f0-4000x1992.png"
                size="medium"
                bgColor={"#00"}
                className="hidden md:block pt-0 pb-4"
              />
              <CaseStudyMediaBlock
                type="image"
                src="https://cdn.sanity.io/images/iy4m4myd/production/42c7436fb36b835738c11ecdb1923c066fa556c5-2342x2342.png"
                size="small"
                bgColor={"#00"}
                className="md:hidden pt-0 pb-4"
              />
      </div>


      <div id="initial-designs" className="flex flex-col gutter-base">
        <CaseStudyTextBlock
          sectionHeading="Initial Designs"
          title="Personalizing the search"
          text={[
            <>
              Since the{" "}
              <DefinitionCard
                trigger="accessibility label"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <div className="flex flex-col gap-2">
                    <div>
                      <i className="opacity-60">Design goal: how might we <strong>personalize</strong> the washroom finding experience?</i>
                    </div>
                    <div>
                      <strong>1 in 4</strong> participants with accessibility needs encountered a washroom labeled &ldquo;accessible&rdquo; that <i>did not meet their needs</i>.
                    </div>
                    <div>
                      <strong>So we ask users directly</strong>: onboarding captures their specific needs and filters results to match.
                    </div>
                  </div>
                }
                side="right"
                width="w-90"
                sideOffset="1"
              />{" "}
              didn&apos;t always cater to people&apos;s needs, we asked users about them during onboarding, influencing the washroom listings suggested during the search.
            </>,
          ]}
        />
        <CaseStudyMediaBlock
          type="video"
          src="/assets/videos/goAble/onboarding-prototype.webm"
          size="small"
          bgColor="#f9f9f9"
          className="pt-0!"
        />
      </div>

      <div className="flex flex-col gutter-base">
        <CaseStudyTextBlock
          title="Providing the granular details"
          text={[
            <>
              Washroom details pages show critical information such as: washroom amenity offering, real-time availability or concerns, and community sentiment to help users make{" "}
              <DefinitionCard
                trigger="informed decisions"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <div className="flex flex-col gap-2">
                    <div>
                      <i className="opacity-60">Design goal: <strong>what amenities do people care about most?</strong></i>
                    </div>
                    <div>
                      <strong>97%</strong> of participants ranked <i>cleanliness</i> as their top washroom feature.
                    </div>
                    <div>
                      <strong>70.6%</strong> reported feeling stressed when they couldn&apos;t locate a washroom quickly.
                    </div>
                    <div>
                      Granular, <strong>upfront details</strong> directly reduce that anxiety.
                    </div>
                  </div>
                }
                side="right"
                width="w-96"
                sideOffset="1"
              />
              .
            </>,
          ]}
        />
        <CaseStudyMediaBlock
          type="video"
          src="/assets/videos/goAble/amenities-prototype.webm"
          size="small"
          className="pt-0!"
        />
      </div>

      <div className="flex flex-col gutter-base">
        <CaseStudyTextBlock
          title="Creating community to verify the truth"
          text={[
            <>
              To validate the status of the washroom, we envisioned a community section that acts as a{" "}
              <DefinitionCard
                trigger="source of truth"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <div className="flex flex-col gap-2">
                    <div>
                      <i className="opacity-60">Design goal: how might we convey <strong>trustworthy and relevant</strong> washroom info?</i>
                    </div>
                    <div>
                      <strong>1 in 2</strong> participants (<strong>n=56</strong>) <i>prioritize reviews when looking up washrooms online</i>.
                    </div>
                    <div>
                      <strong>4 out of 5</strong> said they&apos;d trust user-generated accessibility reviews.
                    </div>
                    <div>
                      So we made a <strong>community built on user reviews</strong>.
                    </div>
                  </div>
                }
                side="left"
                width="w-90"
                sideOffset="1"
              />{" "}
              that users can contribute to, so they can feel confident in their decision making.
            </>,
          ]}
        />
        <CaseStudyMediaBlock
          type="video"
          src="/assets/videos/goAble/review-prototype.webm"
          size="small"
          className="pt-0! pb-8 lg:pb-48"
        />
      </div>

      {/* Iterations — three-part evidence structure (what happened → quote → what changed). */}
      <div id="iterations" className="flex flex-col gap-24">
      <CaseStudySectionBlockFixed
        sectionHeading="Iterations"
        title="Filter Reduction"
        description={[
          "Participants froze during onboarding when presented with the full filter list.",
          <div key="quote-1" className="flex flex-col">
            <blockquote className="border-l-2 border-[#799A92] pl-4 my-1">
              <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;I don&apos;t know how many of these I should be toggling.&rdquo;</p>
            </blockquote>
          </div>,
          <span key="filter-reduction-conclusion"><strong>So I cut the least-used filters entirely.</strong> The ones that remained are the ones that actually differentiate washrooms for our users.</span>,
        ]}
      >
        <CaseStudyMediaBlock
          type="image"
          // src="https://cdn.sanity.io/images/iy4m4myd/production/414c95bfd0b674f67fff9f211a09ebec86c64450-3734x1800.png"
          src="/assets/images/goAble/Before&After_Onboarding_new.png"
          size="large"
          className="pt-0! bg-none"
        />
      </CaseStudySectionBlockFixed>

      <CaseStudySectionBlockFixed
        title="Progressive Disclosure"
        description={[
          "Participants didn't know where to look first, and felt some elements were fighting for their attention.",
          <div key="quote-2" className="flex flex-col">
            <blockquote className="border-l-2 border-[#799A92] pl-4 my-1">
              <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;I don&apos;t know what I&apos;m supposed to be reading first.&rdquo;</p>
            </blockquote>
          </div>,
          <span key="progressive-disclosure-conclusion"><strong>So I put the most important stuff at the front.</strong> Relevant amenity offerings are displayed first, then community reports sit behind a clearly labeled tab. Removed the rating label as users called it visual noise.</span>,
        ]}
      >
        <CaseStudyMediaBlock
          type="image"
          // src="https://cdn.sanity.io/images/iy4m4myd/production/fad969c057cb189a0fa9c45824ece8ffb6eda3c0-3734x1800.png"
          src="/assets/images/goAble/Before&Information_Page_New.png"
          size="large"
          className="pt-0!"
        />
      </CaseStudySectionBlockFixed>

      <CaseStudySectionBlockFixed
        title="Frictionless Review"
        description={[
          "Nobody said it was hard... they just weren\u2019t going to do it.",
          <div key="quote-3" className="flex flex-col">
            <blockquote className="border-l-2 border-[#799A92] pl-4 my-1">
              <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;It looks good but I don&apos;t really think I would leave a review that often.&rdquo;</p>
            </blockquote>
          </div>,
          <span key="Frictionless-review-conclusion">So I stopped trying to incentivize reviews and <strong>focused on reducing the cost of leaving one</strong>. Quick-select options and pre-loaded responses designed lower the bar to report than the bar for ignoring it.</span>,
        ]}
      >
        <CaseStudyMediaBlock
          type="image"
          // src="https://cdn.sanity.io/images/iy4m4myd/production/88f3523caf9f1931a3d7f82dda374a137b6963a3-3734x1800.png"
          src="/assets/images/goAble/Before&After_Reviews_new.png"
          size="large"
          className="pt-0!"
        />
      </CaseStudySectionBlockFixed>
      </div>

      <div id="final-designs">
      <CaseStudyHighlightsBlock
        sectionHeading="Final Designs"
        title="Making accessibility personal"
        description={[
          <span key={1}>GoAble filters washrooms by <strong>your needs</strong>, surfaces <strong>granular details</strong> before you arrive, and uses <strong>crowdsourced reviews</strong> to keep information honest and reduce the stress of finding a suitable washroom in public.</span>
        ]}
        videos={[
          {
            src: "https://stream.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA.m3u8?min_resolution=1080p",
            thumbnail: "https://image.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA/thumbnail.png?width=1919&height=1080&time=0",
            caption: "Personalized onboarding & search"
          },
          {
            src: "https://stream.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8.m3u8?min_resolution=1080p",
            thumbnail: "https://image.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8/thumbnail.png?width=1919&height=1080&time=0",
            caption: "Community-driven status updates"
          },
          {
            src: "https://stream.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg.m3u8?min_resolution=1080p",
            thumbnail: "https://image.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg/thumbnail.png?width=1919&height=1080&time=0",
            caption: "Three-tap review & verification"
          },
        ]}
      />

      </div>

      <CaseStudyTextBlock
        id="closing"
        sectionHeading="Closing"
        title="Final thoughts and learnings"
        text={[
          <div key="access" className="flex flex-col mb-2">
            <strong className="text-p text-700 text-(--text-color-100)">Access is Multidimensional</strong>
            <span className="text-p text-400 text-(--text-color-80)">This project taught me that access doesn&apos;t just mean <strong className="text-600">physical</strong>, but also <strong className="text-600">emotional</strong> and <strong className="text-600">political</strong> barriers people face.</span>
          </div>,
          <div key="restraint" className="flex flex-col mb-2">
            <strong className="text-p text-700 text-(--text-color-100)">The Power of Restraint</strong>
            <span className="text-p text-400 text-(--text-color-80)">Instead of maximizing a design through incentives or by providing all options, I learned that people appreciate when designers <strong className="text-600">show restraint</strong>—providing exactly <strong className="text-600">what they need</strong>, <strong className="text-600">when</strong> they need it, while respecting their choice <strong className="text-600">to participate or not</strong>.</span>
          </div>,
          <div key="fidelity" className="flex flex-col mb-2">
            <strong className="text-p text-700 text-(--text-color-100)">Fidelity is a QA Tool, Not Just a Presentation Tool</strong>
            <span className="text-p text-400 text-(--text-color-80)">I built the mid-fi prototype with Figma Variables specifically to stress-test interactions before committing to high-fidelity. That&apos;s where I caught the tag color ambiguity issue where users had no way to distinguish washroom states at a glance, and it would have been expensive to fix later. The mid-fi acted as <strong className="text-600">a diagnostic tool.</strong></span>
          </div>,
          <div key="wayfinding" className="flex flex-col mb-2">
            <strong className="text-p text-700 text-(--text-color-100)">What&apos;s Next</strong>
            <span className="text-p text-400 text-(--text-color-80)">The feature I&apos;d build next is in-building wayfinding. We cut it due to time, but it was the one thing our research surfaced that <strong className="text-600">no existing tool handles at all</strong>.</span>
          </div>,
        ]}
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
