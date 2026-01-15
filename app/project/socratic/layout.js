import ProjectLayout from "../_shared/ProjectLayout";
import { projectData } from "./data";

/**
 * Project-specific layout
 *
 * This layout wraps your project page with the shared ProjectLayout component
 * and provides project-specific metadata for SEO
 */

export async function generateMetadata() {
  return {
    title: `${projectData.name} | David Dimalanta`,
    description: projectData.description[0], // First paragraph as meta description
    openGraph: {
      title: `${projectData.name} | David Dimalanta`,
      description: projectData.description[0],
      type: "website",
    },
  };
}

export default function Layout({ children }) {
  return (
    <ProjectLayout projectData={projectData}>
      {children}
    </ProjectLayout>
  );
}
