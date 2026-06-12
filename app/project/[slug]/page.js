import { notFound } from "next/navigation";
import { caseStudyMdxComponents } from "@/mdx-components";
import ProjectCaseStudyPage from "../_components/ProjectCaseStudyPage";
import { CaseStudyMdxProvider } from "../_components/CaseStudyMdxComponents";
import { getAllCaseStudySummaries, getCaseStudyBySlug } from "../_lib/caseStudies";
import { renderCaseStudyFilesDynamicallyInDevelopment } from "../_lib/devRendering";
import { buildSocialMetadata } from "@/app/shared-metadata";

export function generateStaticParams() {
  return getAllCaseStudySummaries().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  await renderCaseStudyFilesDynamicallyInDevelopment();

  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    const title = "Project Case Study | David Dimalanta";
    const description = "Detailed case study showcasing design process, challenges, and outcomes";
    return {
      title,
      description,
      ...buildSocialMetadata({ title, description, path: '/project' }),
    };
  }

  const title = `${caseStudy.name} | David Dimalanta`;
  const description = caseStudy.description[0];

  return {
    title,
    description,
    ...buildSocialMetadata({ title, description, path: `/project/${slug}` }),
  };
}

export default async function ProjectPage({ params }) {
  await renderCaseStudyFilesDynamicallyInDevelopment();

  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const MdxContent = caseStudy.content && !caseStudy.comingSoon
    ? (await import(`../_content/${slug}.mdx`)).default
    : null;

  return (
    <ProjectCaseStudyPage caseStudy={caseStudy}>
      {MdxContent && (
        <CaseStudyMdxProvider caseStudy={caseStudy}>
          <MdxContent components={caseStudyMdxComponents} />
        </CaseStudyMdxProvider>
      )}
    </ProjectCaseStudyPage>
  );
}
