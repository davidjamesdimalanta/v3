export async function generateMetadata({ params }) {
  return {
    title: 'Project Case Study | David Dimalanta',
    description: 'Detailed case study showcasing design process, challenges, and outcomes',
    openGraph: {
      title: 'Project Case Study | David Dimalanta',
      description: 'Detailed case study showcasing design process, challenges, and outcomes',
      type: 'website',
    },
  };
}

export default function ProjectLayout({ children }) {
  return (
    <div className="relative w-full min-h-screen">
      {children}
    </div>
  );
}
