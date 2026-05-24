import WorkGrid from "../sections/WorkGrid";
import { getAllCaseStudySummaries } from "../project/_lib/caseStudies";
import { renderCaseStudyFilesDynamicallyInDevelopment } from "../project/_lib/devRendering";

export const metadata = {
  title: "Work — David Dimalanta",
  description: "Selected projects by David Dimalanta — product design, agentic workflows, and web development.",
};

export default async function WorkPage() {
  await renderCaseStudyFilesDynamicallyInDevelopment();

  const projects = getAllCaseStudySummaries();

  return (
    <main className="flex flex-col w-full pt-24">
      <WorkGrid projects={projects} />
    </main>
  );
}
