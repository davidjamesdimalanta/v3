import HomepageHero from "./sections/HomepageHero";
import AllProjects from "./sections/AllProjects";
import { getAllCaseStudySummaries } from "./project/_lib/caseStudies";
import { renderCaseStudyFilesDynamicallyInDevelopment } from "./project/_lib/devRendering";

export default async function Home() {
  await renderCaseStudyFilesDynamicallyInDevelopment();

  const projects = getAllCaseStudySummaries();

  return (
    <main className="flex flex-col w-full">
      <section data-label="hero-and-work" aria-label="Hero introduction and selected work" className="w-full">
        <HomepageHero projects={projects} />
        <AllProjects projects={projects} />
      </section>
    </main>
  );
}
