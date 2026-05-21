import { projectData } from "./data";

/**
 * Project-specific layout
 *
 * This layout provides project-specific metadata for SEO.
 * The page.js file controls the actual layout composition.
 */

export async function generateMetadata() {
  return {
    title: "LinkLog — David Dimalanta",
    description: projectData.description[0],
    openGraph: {
      title: "LinkLog — David Dimalanta",
      description: projectData.description[0],
      type: "website",
    },
  };
}

export default function Layout({ children }) {
  return children;
}
