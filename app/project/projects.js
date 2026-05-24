import { getAllCaseStudySummaries, getCaseStudyBySlug, getNextCaseStudy } from "./_lib/caseStudies";

export const projectsRegistry = getAllCaseStudySummaries().map((project) => ({
  slug: project.slug,
  title: project.title,
  nextProject: project.nextProject,
}));

export function getProjectBySlug(slug) {
  return getCaseStudyBySlug(slug);
}

export function getNextProject(currentSlug) {
  return getNextCaseStudy(currentSlug);
}
