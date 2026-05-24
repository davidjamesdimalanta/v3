"use client";

import Link from "next/link";
import ProjectLayout from "../_shared/ProjectLayout";
import ContentBlock from "../components/contentTypes/ContentBlock";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import CaseStudySection from "../_shared/CaseStudySection";
import CaseStudyNavigation from "../_shared/CaseStudyNavigation";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

export default function ProjectCaseStudyPage({ caseStudy, children }) {
  const { playHover } = useSoundEffects();
  const nextProject = caseStudy.nextProjectSummary;
  const hasCaseStudyBody = Boolean(children);
  const isComingSoon = Boolean(caseStudy.comingSoon);

  return (
    <>
      <ProjectLayout projectData={caseStudy.projectData}>
        {caseStudy.heroMedia.map((media, index) => (
          <ContentBlock
            key={`${media.src}-${index}`}
            media={media}
            thumbnail={media.thumbnail}
            isFirstVideo={media.isFirstVideo}
            priority={media.priority || index === 0}
          />
        ))}
      </ProjectLayout>

      {(hasCaseStudyBody || isComingSoon) && (
        <>
          {hasCaseStudyBody && <CaseStudyNavigation sections={caseStudy.nav} />}

          <CaseStudySection title="" theme={caseStudy.projectData.caseStudy}>
            {isComingSoon ? (
              <CaseStudyTextBlock
                className="pt-48 pb-48"
                sectionHeading="Coming Soon"
                title="This case study is being documented."
                text="Check back soon for the full process, decisions, and outcomes behind this project."
              />
            ) : (
              children
            )}

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
      )}
    </>
  );
}
