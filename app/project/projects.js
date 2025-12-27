/**
 * Project Registry
 *
 * Central registry for all case study projects
 * Used for navigation, metadata, and project ordering
 *
 * To add a new project:
 * 1. Copy the _template/ directory to your-project-name/
 * 2. Add an entry here with the project slug, title, and next project
 * 3. Access your project at /project/your-project-name
 *
 * Example:
 * {
 *   slug: 'spotify-redesign',
 *   title: 'Spotify Mobile Redesign',
 *   nextProject: 'figma-plugin'  // slug of the next project in sequence
 * }
 */
export const projectsRegistry = [
  {
    slug: 'goable',
    title: 'Unearthing Hidden Barriers in Accessible Washrooms',
    nextProject: null
  },
];

/**
 * Helper function to get project by slug
 */
export function getProjectBySlug(slug) {
  return projectsRegistry.find(project => project.slug === slug);
}

/**
 * Helper function to get next project
 */
export function getNextProject(currentSlug) {
  const currentProject = getProjectBySlug(currentSlug);
  if (!currentProject || !currentProject.nextProject) return null;
  return getProjectBySlug(currentProject.nextProject);
}
