import { projectData } from "./data";

export async function generateMetadata() {
  return {
    title: `${projectData.name} | David Dimalanta`,
    description: projectData.description[0],
    openGraph: {
      title: `${projectData.name} | David Dimalanta`,
      description: projectData.description[0],
      type: "website",
    },
  };
}

export default function Layout({ children }) {
  return children;
}
