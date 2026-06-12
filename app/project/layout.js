import { buildSocialMetadata, SITE_URL } from "@/app/shared-metadata";

export async function generateMetadata({ params }) {
  const title = 'Project Case Study | David Dimalanta';
  const description = 'Detailed case study showcasing design process, challenges, and outcomes';

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    ...buildSocialMetadata({ title, description, path: '/project' }),
  };
}

export default function ProjectLayout({ children }) {
  return (
    <div className="relative w-full min-h-screen" data-label="case-study">
      {children}
    </div>
  );
}
