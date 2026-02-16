"use client";

import Link from "next/link";
import ProjectLayout from "../_shared/ProjectLayout";
import ContentBlock from "../components/contentTypes/ContentBlock";
import CaseStudySection from "../_shared/CaseStudySection";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import CaseStudyMediaBlock from "../components/contentTypes/CaseStudyMediaBlock";
import DefinitionCard from "../components/contentTypes/DefinitionCard";
import ParticipantDemographics from "../components/contentTypes/ParticipantDemographics";
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
        />

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
        />
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

      <CaseStudyTextBlock
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
            side="left"
            width="w-80"
            sideOffset="1"
          />.
          </>,
        ]}
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/e168ddbe4769eeba822e95a530fe9624c3dace17-3734x1800.png"
        size="medium"
        caption={"For example: here is an actual washroom listing on the UofT campus"}
        bgColor={"#000000"}
      />

      <CaseStudyTextBlock
        sectionHeading="Discovery"
        title="Washroom access is different for everyone."
        text={[
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
          discussed the different barriers to access they experienced when finding a washroom. Influenced by our
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
          />, the project aimed to tackle the three critical issues in washroom finding:</>

        ]}
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/a7cf75a0936db781d820f9277c1b5eae9aab97f0-4000x1992.png"
        size="medium"
        bgColor={"#00"}
        className="hidden md:block"
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/42c7436fb36b835738c11ecdb1923c066fa556c5-2342x2342.png"
        size="small"
        bgColor={"#00"}
        className="md:hidden"
      />


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

       <CaseStudyTextBlock
        sectionHeading="Iterations"
        title="Less is More"
        text="Participants spent a lot of time worrying about which filters to pick. Ommiting the least popular search filters lets users focus on washroom amenities that differentiate washrooms."
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/414c95bfd0b674f67fff9f211a09ebec86c64450-3734x1800.png"
        size="medium"
      />

      <CaseStudyTextBlock
        title="Progressive Disclosure"
        text="Users often felt that our designs were screaming at them. In order to convey the same amount of information, I put the most important information on the listing page, while putting the community-based, time-stamped reports, behind a visually striking tab."
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/fad969c057cb189a0fa9c45824ece8ffb6eda3c0-3734x1800.png"
        size="medium"
      />

      <CaseStudyTextBlock
        title="Focusing on friction instead of incentives."
        text="Users described that sometimes, no amount of incentive will get them to leave a review. GoAble reduces this friction with quick-select, pre-loaded options, and three-tap reporting, in order to make the reviewing process equally as easy as skipping it."
      />

      <CaseStudyMediaBlock
        type="image"
        src="https://cdn.sanity.io/images/iy4m4myd/production/88f3523caf9f1931a3d7f82dda374a137b6963a3-3734x1800.png"
        size="medium"
      />

      <CaseStudyTextBlock
        sectionHeading="Final Designs"
        title="Tailoring the washroom-finding experience through personalized search."
        text="GoAble addresses over-generalization with an onboarding that saves individual preferences and tailors future search results accordingly."
      />

      <CaseStudyMediaBlock
        type="video"
        src="https://stream.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA.m3u8?min_resolution=1080p"
        size="medium"
        thumbnail="https://image.mux.com/6GaqiMIUzmLy6qAVvfD6BYjA3lG46OdDr602V5j01WcQA/thumbnail.png?width=1919&height=1080&time=0"
      />

      <CaseStudyTextBlock
        title="Conveying reliability and trust of washroom conditions and status updates."
        text="GoAble critically informs users with a community-driven updates page that provides real-time, crowdsourced information, so users can choose with confidence."
      />

      <CaseStudyMediaBlock
        type="video"
        src="https://stream.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8.m3u8?min_resolution=1080p"
        size="medium"
        thumbnail="https://image.mux.com/oOx1pDiKIfK9QgQsHyi7Eij1LJf1XzKoQBJsqvJwMb8/thumbnail.png?width=1919&height=1080&time=0"
      />

      <CaseStudyTextBlock
        title="Frictionless sources of truth"
        text="Writing or skipping a review on GoAble can be done in three taps or less, making community and washroom verification effortless."
      />

      <CaseStudyMediaBlock
        type="video"
        src="https://stream.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg.m3u8?min_resolution=1080p"
        size="medium"
        thumbnail="https://image.mux.com/e01ssPxTDTbOC1jnh0166CK8pq4jsYmPvktPZmwKR022Zg/thumbnail.png?width=1919&height=1080&time=0"
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
            <strong>Access is Multidimensional</strong>
            <span className="text-[#2C4E47]">This project taught me that access doesn&apos;t just mean physical, but also emotional and political barriers people face.</span>
          </div>,
          <div key="restraint" className="flex flex-col mb-2">
            <strong>The Power of Restraint</strong>
            <span className="text-[#2C4E47]">Instead of maximizing a design through incentives or by providing all options, I learned that people appreciate when designers show restraint—providing exactly what they need, when they need it, while respecting their choice to participate or not.</span>
          </div>,
          <div key="details" className="flex flex-col mb-2">
            <strong>Details Can Distract</strong>
            <span className="text-[#2C4E47]">Different prototype fidelities serve their purposes and all are equally needed in the design process. Doing UXR without one or the other can compromise your designs further down the line.</span>
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
