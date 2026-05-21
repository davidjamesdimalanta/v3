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
import CaseStudyPersonas from "../components/contentTypes/CaseStudyPersonas";

const sections = [
  { id: "problem", heading: "Overview" },
  { id: "discovery", heading: "Discovery" },
  { id: "personas", heading: "Who We're Designing For" },
  { id: "initial-designs", heading: "Initial Designs" },
  { id: "iterations", heading: "Co-Design" },
  { id: "final-designs", heading: "Final Build" },
  { id: "closing", heading: "Closing" },
];

const media = {
  banner: "https://cdn.sanity.io/images/iy4m4myd/production/43ba809e70315133281b75a5d5ac9d2661b12d90-2880x1620.png",
  clientDirectory: "https://cdn.sanity.io/files/iy4m4myd/production/240fd56a94d21f804a5033309c41e5109d99536c.mp4",
  cttReport: "https://cdn.sanity.io/files/iy4m4myd/production/4c4e415bf34d4eefdbb37a5f291d8f02980dd683.mp4",
  oacaoDashboard: "https://cdn.sanity.io/files/iy4m4myd/production/1349be5789117ba5d1b006798f596e5c094832fd.mp4",
};

const personas = [
  {
    id: "link-worker",
    name: "Brenda, Link Worker",
    avatarLabel: "Link Worker",
    traits: [
      "Manages follow-up across **hundreds of clients** with local spreadsheets, paper notes, and memory",
      "Needs to know **who needs a call next** without rebuilding the whole client list",
      "Loses days at year-end reconstructing what happened across the programme",
    ],
    designConnection:
      "Brenda shaped the Priority Call List and the read-only CTT review: the product had to surface the next best action without turning relationship work into another reporting burden.",
  },
  {
    id: "oacao-admin",
    name: "OACAO Administrator",
    avatarLabel: "OACAO Admin",
    traits: [
      "Needs aggregate outcomes across SALCs to support **funding renewal conversations**",
      "Cannot rely on raw local files when every centre tracks work differently",
      "Needs programme-wide visibility without exposing client identifiers across centres",
    ],
    designConnection:
      "This role forced the service to split into two permission scopes: Link Workers manage identifiable client work locally; OACAO reviews de-identified outcomes across the programme.",
  },
];

export default function ProjectPage() {
  const { playHover, playButtonHover } = useSoundEffects();
  const currentSlug = "linklog";
  const nextProject = getNextProject(currentSlug);

  return (
    <>
      <ProjectLayout projectData={projectData}>
        <ContentBlock
          media={{
            type: "image",
            src: projectData.coverImage,
            alt: "LinkLog Making Reports Easy banner",
            aspectRatio: "video",
            caption: "",
          }}
          priority
        />
      </ProjectLayout>

      <CaseStudyNavigation sections={sections} />

      <CaseStudySection title="" theme={projectData.caseStudy}>
        <CaseStudyTextBlock
          id="problem"
          className="pt-64"
          sectionHeading="The Problem"
          title="10 out of 10 SALCs compile their year-end report by hand."
          text={[
            <>
              Every Seniors Active Living Centre we interviewed told us the same thing:
              reporting to OACAO is a paper chase that runs once a year and eats days at a time.
              Meanwhile, the actual work of{" "}
              <DefinitionCard
                trigger="Social Prescribing"
                shimmerVariant="brown"
                triggerProps={{ onMouseEnter: playButtonHover }}
                content={
                  <>
                    A structured way to route people from a clinical encounter to non-clinical
                    community supports — housing, fitness, food security, social connection.
                    A{" "}
                    <i><TextShimmer variant="brown">Link Worker</TextShimmer></i>{" "}
                    is the human bridge that makes the model work; remove them and it
                    collapses into a referral list.
                  </>
                }
                caption={{
                  text: "Source: WHO Toolkit on Social Prescribing",
                  link: "https://www.who.int/publications/i/item/9789290619765",
                }}
                side="bottom"
                width="w-96"
                sideOffset="1"
              />{" "}
              — calling clients, checking in, building trust — gets squeezed by the work of
              proving that work happened.
            </>,
          ]}
        />

        <CaseStudyTextBlock
          className="pb-64"
          sectionHeading="The Challenge"
          text={[
            <>
              How do you give Link Workers more time to do the relational work that defines their
              role — <strong>while making it easier, not harder, for OACAO to prove the programme
              deserves another year of funding?</strong>
            </>,
          ]}
        />

        <div id="solutions">
          <CaseStudySectionBlock
            sectionHeading="Solutions"
            className="py-16"
            dark
            textStates={[
              {
                title: "Replace the paper chase with a Client Directory.",
                description:
                  "LinkLog imports the spreadsheets Link Workers already keep, normalizes them into a standardized directory, and surfaces who needs a follow-up next.",
              },
              {
                title: "Auto-populate the year-end report.",
                description:
                  "The Common Tracking Tool fields fill themselves from the Client Directory — turning a three-day reconstruction into a review-and-submit.",
              },
              {
                title: "Give OACAO a programme-wide view.",
                description:
                  "OACAO sees aggregated outcomes across every SALC on the platform, exportable as CSV and viewable as charts — ready to use in funding conversations.",
              },
            ]}
          >
            <CaseStudyMediaBlock
              type="video"
              src={media.clientDirectory}
              size="medium"
              aspectRatio="video"
              caption="Normalizing imported CSV data into a structured Client Directory"
              className="max-w-full pt-0 pb-4"
              isFirstVideo
            />
            <CaseStudyMediaBlock
              type="video"
              src={media.cttReport}
              size="medium"
              aspectRatio="video"
              caption="Auto-populating year-end reporting fields from existing client data"
              className="max-w-full pt-0 pb-4"
            />
            <CaseStudyMediaBlock
              type="video"
              src={media.oacaoDashboard}
              size="medium"
              aspectRatio="video"
              caption="Reviewing programme-wide aggregate outcomes in the OACAO dashboard"
              className="max-w-full pt-0 pb-4"
            />
          </CaseStudySectionBlock>
        </div>

        <div id="discovery" className="flex flex-col gutter-sm py-48">
          <CaseStudyTextBlock
            sectionHeading="Discovery"
            title="We listened before we touched the workflow."
            text={[
              <>
                Over Winter 2026, we spoke with 10 SALCs about how Link Workers tracked clients,
                followed up, and reported outcomes back to OACAO. The pattern was consistent:
                the daily work lived locally, but the year-end report demanded a single clean
                story nobody had been collecting in one place.
              </>,
              <div key="brenda-quote" className="flex flex-col mt-2">
                <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">
                    &ldquo;I don&apos;t know if you know all about the reporting process,
                    but it&apos;s, it&apos;s like a three-day event to try and do the final report.&rdquo;
                  </p>
                </blockquote>
              </div>,
              <>
                That quote set the constraint for the service. LinkLog had to reduce the cost
                of reporting without making the everyday client relationship more bureaucratic.
              </>,
            ]}
          />

          <CaseStudyTextBlock
            text={[
              <>
                <DefinitionCard
                  trigger="Inconsistent data practice"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <div className="flex flex-col gap-3">
                      <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4">
                        <p className="text-p text-400 italic opacity-60">
                          &ldquo;Every centre had its own version of the spreadsheet.&rdquo;
                        </p>
                      </blockquote>
                      <p className="text-p text-600">
                        The same data point could live in a paper binder, a local Excel file,
                        and a SurveyMonkey response depending on the SALC.
                      </p>
                    </div>
                  }
                  side="right"
                  width="w-96"
                  sideOffset="1"
                />{" "}
                meant there was no shared starting point;
                <br /><br />
                <DefinitionCard
                  trigger="Reporting overload"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <div className="flex flex-col gap-3">
                      <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4">
                        <p className="text-p text-400 italic opacity-60">
                          &ldquo;It&apos;s like a three-day event to try and do the final report.&rdquo;
                        </p>
                      </blockquote>
                      <p className="text-p text-600">
                        Link Workers absorbed the cost of year-end reporting alone, on top of
                        the relational work that defines the role.
                      </p>
                    </div>
                  }
                  side="right"
                  width="w-96"
                  sideOffset="1"
                />{" "}
                made the annual report a workload spike; and
                <br /><br />
                <DefinitionCard
                  trigger="OACAO data chasing"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <div className="flex flex-col gap-3">
                      <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4">
                        <p className="text-p text-400 italic opacity-60">
                          &ldquo;We need the numbers before we can make the next funding case.&rdquo;
                        </p>
                      </blockquote>
                      <p className="text-p text-600">
                        OACAO had to nudge centres for SurveyMonkey responses because the
                        programme data lived outside any shared system.
                      </p>
                    </div>
                  }
                  side="right"
                  width="w-96"
                  sideOffset="1"
                />{" "}
                turned local tracking gaps into programme-level reporting risk.
              </>,
            ]}
          />

          <CaseStudyTextBlock
            sectionHeading="Constraint"
            text={[
              <>
                <DefinitionCard
                  trigger="PHIPA and PIPEDA"
                  shimmerVariant="brown"
                  triggerProps={{ onMouseEnter: playButtonHover }}
                  content={
                    <div className="flex flex-col gap-3">
                      <p className="text-p text-400">
                        The privacy read shaped the build: identifiable client records stay scoped
                        to SALC work, the live demo sits in AWS ca-central-1, and OACAO&apos;s view
                        aggregates outcomes before they cross centre boundaries.
                      </p>
                      <p className="text-p text-400">
                        Gemini Deep Research helped surface the obligations; we treated it as a
                        research pass to verify, not a policy decision-maker.
                      </p>
                    </div>
                  }
                  caption={{
                    text: "Sources: Ontario PHIPA and Office of the Privacy Commissioner of Canada PIPEDA guidance",
                    link: "https://www.ontario.ca/laws/statute/04p03",
                  }}
                  side="right"
                  width="w-120"
                  sideOffset="1"
                />{" "}
                mattered before a database schema did. The service had to make useful reporting
                possible without turning OACAO into the owner of identifiable client records.
              </>,
            ]}
          />
        </div>

        <CaseStudyPersonas
          personas={personas}
          sectionHeading="Who We're Designing For"
          title="Two roles, two permission scopes."
          text={
            <>
              LinkLog only works if it respects the difference between the person doing the
              follow-up and the organization proving the programme&apos;s value. One needs client-level
              context. The other needs aggregate evidence.
            </>
          }
        />

        <div id="initial-designs" className="flex flex-col gutter-xl bg-(--schemes-surface-container-high) py-16 px-4 md:px-8">
          <div className="flex flex-col gutter-base">
            <CaseStudyTextBlock
              sectionHeading="Initial Designs"
              title="Priority Call List"
              text={[
                <>
                  The dashboard started as a way to make follow-up visible. The important move was
                  sorting the work by{" "}
                  <DefinitionCard
                    trigger="next-action urgency"
                    shimmerVariant="brown"
                    triggerProps={{ onMouseEnter: playButtonHover }}
                    content={
                      <div className="flex flex-col gap-2">
                        <div>
                          The inherited problem-space work showed how hard it was to train intuition
                          for who to call next, so we externalized that judgment into a sort order.
                        </div>
                        <div>
                          Overdue calls, upcoming check-ins, and incomplete outcomes rise before
                          alphabetized client records.
                        </div>
                      </div>
                    }
                    side="right"
                    width="w-96"
                    sideOffset="1"
                  />{" "}
                  instead of making Link Workers scan every client and decide from scratch.
                </>,
              ]}
            />
            <CaseStudyMediaBlock
              type="video"
              src={media.clientDirectory}
              size="large"
              aspectRatio="video"
              caption="The Client Directory becomes a working queue by raising overdue and upcoming follow-ups before the rest of the record set."
              className="pt-0!"
              isFirstVideo
            />
          </div>

          <div className="flex flex-col gutter-base">
            <CaseStudyTextBlock
              title="Year-End Report Auto-Population"
              text={[
                <>
                  The Common Tracking Tool stopped being a separate artifact and became a{" "}
                  <DefinitionCard
                    trigger="view of the data"
                    shimmerVariant="brown"
                    triggerProps={{ onMouseEnter: playButtonHover }}
                    content={
                      <div className="flex flex-col gap-2">
                        <div>
                          If the Client Directory already knows referrals, attendance, barriers,
                          and outcomes, the year-end report should not ask for the same facts again.
                        </div>
                        <div>
                          Generate CTT pulls structured fields forward, then leaves room for the
                          narrative pieces humans still need to write.
                        </div>
                      </div>
                    }
                    side="right"
                    width="w-96"
                    sideOffset="1"
                  />. That changed reporting from reconstruction to review.
                </>,
              ]}
            />
            <CaseStudyMediaBlock
              type="video"
              src={media.cttReport}
              size="large"
              aspectRatio="video"
              caption="The Common Tracking Tool changes from a blank annual form into a review state generated from existing client records."
              className="pt-0!"
            />
          </div>

          <div className="flex flex-col gutter-base">
            <CaseStudyTextBlock
              title="OACAO Reporting Dashboard"
              text={[
                <>
                  OACAO needed a different product than the Link Worker. The dashboard aggregates
                  outcomes across SALCs, exposes CSV export, and keeps raw identifiers out of the
                  programme-wide view. That is{" "}
                  <DefinitionCard
                    trigger="PHIPA in action"
                    shimmerVariant="brown"
                    triggerProps={{ onMouseEnter: playButtonHover }}
                    content={
                      <>
                        The interface does not make privacy a policy paragraph after the fact.
                        It makes privacy a permission boundary in the service itself.
                      </>
                    }
                    side="left"
                    width="w-80"
                    sideOffset="1"
                  />.
                </>,
              ]}
            />
            <CaseStudyMediaBlock
              type="video"
              src={media.oacaoDashboard}
              size="large"
              aspectRatio="video"
              caption="The OACAO view aggregates programme outcomes across SALCs without exposing client identifiers."
              className="pt-0!"
            />
          </div>
        </div>

        <div id="iterations" className="flex flex-col gap-24">
          <CaseStudySectionBlockFixed
            sectionHeading="Co-Design"
            title="From tracking to prioritizing"
            description={[
              "The first dashboard showed every client and every status. It was complete, but it still asked Link Workers to decide what mattered.",
              <div key="quote-1" className="flex flex-col">
                <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;I can see everyone, but I still don&apos;t know who to call first.&rdquo;</p>
                </blockquote>
              </div>,
              <span key="tracking-conclusion"><strong>So I sorted by next-action urgency.</strong> The dashboard became a work queue, not a directory with better styling.</span>,
            ]}
          >
            <CaseStudyMediaBlock
              type="video"
              src={media.clientDirectory}
              size="large"
              aspectRatio="video"
              caption="The Client Directory evolved from a static list into an action-oriented queue."
              className="pt-0!"
            />
          </CaseStudySectionBlockFixed>

          <CaseStudySectionBlockFixed
            title="From report builder to report viewer"
            description={[
              "The first CTT concept still treated the report like a form. That missed the point: Link Workers did not want a nicer form, they wanted the system to remember the year.",
              <div key="quote-2" className="flex flex-col">
                <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;I just want to see what you already know about me and submit it.&rdquo;</p>
                </blockquote>
              </div>,
              <span key="viewer-conclusion"><strong>So I inverted it.</strong> The CTT became a read-only review of derived data with an editable margin for narrative fields.</span>,
            ]}
          >
            <CaseStudyMediaBlock
              type="video"
              src={media.cttReport}
              size="large"
              aspectRatio="video"
              caption="The report flow became a review-and-submit pattern instead of another data-entry surface."
              className="pt-0!"
            />
          </CaseStudySectionBlockFixed>

          <CaseStudySectionBlockFixed
            title="From one role to two roles"
            description={[
              "Mid-sprint, we realized OACAO needed a fundamentally different view than the Link Worker. Codex shortened the build cycle from days to hours, so each co-design session could land a real change in the next version, not a slide deck full of promises.",
              <div key="quote-3" className="flex flex-col">
                <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4 my-1">
                  <p className="text-p text-400 italic text-(--text-color-60)">&ldquo;I don&apos;t need every client record. I need to know what the programme can prove.&rdquo;</p>
                </blockquote>
              </div>,
              <span key="roles-conclusion"><strong>So we split the product.</strong> Link Workers got client-level follow-up tools; OACAO got aggregate reporting and export.</span>,
            ]}
          >
            <CaseStudyMediaBlock
              type="video"
              src={media.oacaoDashboard}
              size="large"
              aspectRatio="video"
              caption="The programme dashboard gives OACAO aggregate evidence while Link Workers keep client-level context local."
              className="pt-0!"
            />
          </CaseStudySectionBlockFixed>
        </div>

        <div id="final-designs">
          <CaseStudyHighlightsBlock
            dark
            sectionHeading="Final Build"
            title="A live product, not a slide deck."
            description={[
              <span key="final-build">
                LinkLog shipped as a hosted AWS demo in <strong>ca-central-1</strong>, with separate Link Worker and OACAO dashboards and a relational schema behind the Client Directory, CTT review, and programme-level reporting loop.
              </span>,
            ]}
            videos={[
              {
                src: media.clientDirectory,
                thumbnail: media.banner,
                caption: "Client Directory and follow-up queue",
              },
              {
                src: media.cttReport,
                thumbnail: media.banner,
                caption: "Auto-populated CTT review",
              },
              {
                src: media.oacaoDashboard,
                thumbnail: media.banner,
                caption: "OACAO aggregate reporting dashboard",
              },
            ]}
          />
        </div>

        <CaseStudyTextBlock
          id="closing"
          sectionHeading="Closing"
          title="Final thoughts and learnings"
          text={[
            <div key="blueprints" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">Service Blueprints Show You Where to Cut</strong>
              <span className="text-p text-400 text-(--text-color-80)">The current-state blueprint surfaced that the most expensive part of the Link Worker&apos;s year wasn&apos;t doing the work — it was reconstructing it for OACAO at year-end. Once we saw that, every design decision served closing that gap.</span>
            </div>,
            <div key="eighty" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">80% Is Good Enough — If The 80% Closes The Loop</strong>
              <span className="text-p text-400 text-(--text-color-80)">We chose end-to-end coverage at lower fidelity over one polished flow, because the question we were testing was whether the whole loop could close, not whether one screen looked perfect.</span>
            </div>,
            <div key="ai" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">AI Is A Force Multiplier On Decisions, Not A Substitute For Them</strong>
              <span className="text-p text-400 text-(--text-color-80)">Codex, Claude Code, and Gemini cut the build time from weeks to days — but they only mattered because the service blueprint, the interviews, and the co-design sessions had already told us what to build. AI didn&apos;t shorten the path to the decision; it shortened the path from the decision to a live product.</span>
            </div>,
            <div key="next" className="flex flex-col mb-2">
              <strong className="text-p text-700 text-(--text-color-100)">What&apos;s Next</strong>
              <span className="text-p text-400 text-(--text-color-80)">Pilot in 2-3 SALCs before the next OACAO funding cycle, finalize the PHIPA-compliant data governance brief, and explore a Link Trainer track to scale onboarding without scaling our team.</span>
            </div>,
          ]}
        />

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
