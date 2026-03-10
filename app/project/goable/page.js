"use client";

import Link from "next/link";
import ProjectLayout from "../_shared/ProjectLayout";
import ContentBlock from "../components/contentTypes/ContentBlock";
import CaseStudySection from "../_shared/CaseStudySection";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import CaseStudyMediaBlock from "../components/contentTypes/CaseStudyMediaBlock";
import { CaseStudySectionBlock, CaseStudySectionBlockFixed as CaseStudySectionBlockScroll } from "../components/contentTypes/CaseStudySectionBlock";
import CaseStudyHighlightsBlock from "../components/contentTypes/CaseStudyHighlightsBlock";
import DefinitionCard from "../components/contentTypes/DefinitionCard";
import ParticipantDemographics from "../components/contentTypes/ParticipantDemographics";
import IterationCard from "../components/contentTypes/IterationCard";
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
  const currentSlug = "goable";
  const nextProject = getNextProject(currentSlug);

  return (
    <>
      {/* ProjectLayout: Contains high-level project overview (constrained to 75vw) */}
      <ProjectLayout projectData={projectData}>
        <ContentBlock
          media={{
            type: "video",
            src: "https://stream.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA.m3u8?min_resolution=1080p",
            aspectRatio: "video",
            caption: "",
          }}
          thumbnail="https://image.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA/thumbnail.png?width=1919&height=1080&time=0"
          isFirstVideo={true}
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

      {/* CaseStudySection: Full-width detailed process (outside ProjectLayout) */}
      <CaseStudySection title="" theme={projectData.caseStudy}>


      <CaseStudySectionBlockScroll
        sectionHeading="The Problem"
        title="Current washroom listings lack accessibility-related information."
        description={[
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
            side="left"
            width="w-80"
            sideOffset="1"
          />.
          </>,
        ]}
        media={{
          type: "image",
          src: "https://cdn.sanity.io/images/iy4m4myd/production/e168ddbe4769eeba822e95a530fe9624c3dace17-3734x1800.png",
          size: "medium",
          caption: "For example: here is an actual washroom listing on the UofT campus",
        }}
      />

      <CaseStudySectionBlock
        sectionHeading="Solutions"
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


      <CaseStudySectionBlock
        sectionHeading="Discovery"
        title="Washroom access is different for everyone."
        description={[
          <>
          <DefinitionCard
            trigger="Our participants"
            shimmerVariant="brown"
            triggerProps={{ onMouseEnter: playButtonHover }}
            content={<ParticipantDemographics />}
            caption={{
              text: "",
              link: ""
            }}
            side="bottom"
            mobileWidth="w-80"
            desktopWidth="w-120"
            sideOffset="1"
          />
          {" "}
          discussed the different barriers to access they experienced when finding a washroom. Our
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
            side="bottom"
            width="w-120"
            sideOffset="1"
          /> influenced the project, tackling three critical issues in washroom finding:</>
        ]}
      >
        <CaseStudyMediaBlock
          type="image"
          src="https://cdn.sanity.io/images/iy4m4myd/production/a7cf75a0936db781d820f9277c1b5eae9aab97f0-4000x1992.png"
          size="medium"
          bgColor={"#00"}
          className="hidden md:block max-w-full pt-0 pb-4"
        />
        <CaseStudyMediaBlock
          type="image"
          src="https://cdn.sanity.io/images/iy4m4myd/production/42c7436fb36b835738c11ecdb1923c066fa556c5-2342x2342.png"
          size="small"
          bgColor={"#00"}
          className="md:hidden max-w-full pt-0 pb-4"
        />
      </CaseStudySectionBlock>


      {/* Addition 1: Scoping Error + User Tension — process correction aside */}
      {/* Visual choice: left-border callout in the project accent color.
          Signals "deliberate aside" without a title that would make it feel like a feature.
          No sectionHeading label — this is a correction mid-story, not a new section. */}
      <div className="max-w-lg mx-auto px-8 w-full">
        <div className="flex flex-col gap-3 border-l-2 border-[#799A92] pl-5">
          <p className="text-p text-400 text-[var(--text-color-80)]">
            Our original scope was too broad — we designed for anyone who&apos;d ever struggled to find a washroom. After our first interviews, we caught the error: that&apos;s everyone, and you can&apos;t design for everyone. We rescoped to users with mobility impairments and urgent medical needs, rewrote our screener, and restarted recruitment. The tighter scope is what made the design decisions defensible.
          </p>
          <p className="text-p text-400 text-[var(--text-color-80)]">
            Even within that narrower group, we disagreed on who to optimize for — a wheelchair-dependent caregiver has completely different needs than a university student with IBS. Rather than picking one, we asked what both actually want at the end of the interaction: to feel confident they&apos;re going to the right place, fast. Every feature we built traces back to that. Personalization through onboarding handles the rest.
          </p>
        </div>
      </div>

      <CaseStudyTextBlock
        sectionHeading="Initial Designs"
        title="Personalizing the search"
        text="Since the accessibility label didn't always cater to people's needs, we ask users about them during onboarding. We also let them filter preferences as they influence the washroom listings suggested during the search."
      />

      <CaseStudyMediaBlock
        type="video"
        src="/assets/videos/goAble/onboarding-prototype.webm"
        size="small"
        bgColor={"#f9f9f9"}
      />

      <CaseStudyTextBlock
        title="Providing the granular details"
        text={[
          <>
          Washroom details pages show critical information such as: washroom amenity offering, real-time availability or concerns, and community sentiment to help users make informed decisions.
          </>
        ]}
      />

      <CaseStudyMediaBlock
        type="video"
        src="/assets/videos/goAble/amenities-prototype.webm"
        size="small"
      />

      <CaseStudyTextBlock
        title="Creating community to verify the truth"
        text={[
          <>
          To validate the status of the washroom, we envisioned a community section that acts as a source of truth that users can contribute to, so{" "}
          <DefinitionCard
            trigger="users"
            shimmerVariant="brown"
            content={
              <>
                Our survey (<strong>n=58</strong>) revealed that <strong>52.9%</strong> <i>prioritize reviews when looking up washrooms online</i>, and <strong>79.4%</strong> indicated they would likely <i>trust user-generated accessibility reviews</i>.
              </>
            }
            side="left"
          />
          {" "}can feel confident in their decision making.
          </>
        ]}
      />

      <CaseStudyMediaBlock
        type="video"
        src="/assets/videos/goAble/review-prototype.webm"
        size="small"
      />

      {/* Addition 2: Iteration Cards — three-part evidence structure (what happened → quote → what changed).
          Quote is visually subordinate (left-border blockquote, italic, muted color) — it's proof,
          not the headline. All three cards are structurally identical for fast scanning. */}
      <IterationCard
        sectionHeading="Iterations"
        title="Filter Reduction"
        whatHappened="Participants froze during onboarding when presented with the full filter list. They didn't know how many to select, whether choices would conflict, or what the defaults meant."
        quote="I don't know how many of these I should be toggling."
        whatChanged="Cut the least-used filters entirely. The ones that remained are the ones that actually differentiate washrooms for our users. Fewer options, faster decisions, less second-guessing."
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/414c95bfd0b674f67fff9f211a09ebec86c64450-3734x1800.png"
        size="medium"
      />

      <IterationCard
        title="Progressive Disclosure"
        whatHappened="On the listing screen, participants didn't know where to look. Washroom tag colors had no clear meaning, their order wasn't intuitive, and the &ldquo;Great&rdquo; rating label pulled attention without explaining anything."
        quote="I don't know what I'm supposed to be reading first."
        whatChanged="Restructured the information hierarchy — decision-critical details lead, community reports sit behind a clearly labeled tab. Removed the &ldquo;Great&rdquo; label entirely — it added visual weight without helping anyone decide anything."
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/fad969c057cb189a0fa9c45824ece8ffb6eda3c0-3734x1800.png"
        size="medium"
      />

      <IterationCard
        title="Frictionless Review"
        whatHappened="After completing the navigation flow, participants were shown the review prompt. Nobody said it was hard — they just weren't going to do it."
        quote="It looks good but I don't really think I would leave a review that often."
        whatChanged="Stopped trying to incentivize reviews and focused on reducing the cost of leaving one. Quick-select options, pre-loaded responses, three taps to submit or skip. The bar for contributing had to be lower than the bar for ignoring it."
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/88f3523caf9f1931a3d7f82dda374a137b6963a3-3734x1800.png"
        size="medium"
      />

      <CaseStudyHighlightsBlock
        sectionHeading="Final Designs"
        title="Three core flows, built for real people."
        description="GoAble's final screens address accessibility at every step — from personalized onboarding, to granular washroom details, to community-driven verification. Each flow was iterated on across multiple rounds of user testing."
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
{/* 
      <CaseStudyTextBlock
        sectionHeading="Note: Prototypes"
        title="Prototypes that reveal valuable insights."
        text={[
          <>
          Our low-fidelity prototypes exposed foundational flaws in Goable&apos;s layout early on that were symptomatic of an ill-defined user workflow/journey.
          </>,
          <>
          Our higher-fidelity iterations surfaced more micro-level interaction insights, such as issues with filter toggles and map icon clarity in our second round of testing.
          </>
        ]}
      /> */}

      {/* <CaseStudyMediaBlock
        type="video"
        src="https://stream.mux.com/XU4Ly1w1M6d4pmZOKZDIbBdYchQz8njlM008npcId02NQ.m3u8?min_resolution=1080p"
        size="medium"
        thumbnail="https://image.mux.com/XU4Ly1w1M6d4pmZOKZDIbBdYchQz8njlM008npcId02NQ/thumbnail.png?width=1919&height=1080&time=0"
        caption= "Our prototype saves button states, locations, and map views to simulate a production-ready experience."
      /> */}

      <CaseStudyTextBlock
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
          <div key="fidelity" className="flex flex-col gap-1 mb-2 border-l-2 border-[#799A92] pl-4">
            <strong className="text-p text-700 text-[var(--text-color-100)]">Fidelity is a QA Tool, Not Just a Presentation Tool</strong>
            <span className="text-p text-400 text-[var(--text-color-80)]">I built the mid-fi prototype with Figma Variables specifically to stress-test interactions before committing to high-fidelity. That&apos;s where I caught the tag color ambiguity — users had no way to distinguish washroom states at a glance, and it would have been expensive to fix later. The mid-fi wasn&apos;t a stepping stone to the real prototype. <strong className="text-600">It was its own diagnostic tool.</strong></span>
          </div>,
          <div key="wayfinding" className="flex flex-col gap-1 mb-2 border-l-2 border-[#799A92] pl-4">
            <strong className="text-p text-700 text-[var(--text-color-100)]">What&apos;s Next</strong>
            <span className="text-p text-400 text-[var(--text-color-80)]">The feature I&apos;d build next is in-building wayfinding. We cut it due to time, not lack of evidence — it was the one thing our research surfaced that <strong className="text-600">no existing tool handles at all</strong>.</span>
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
