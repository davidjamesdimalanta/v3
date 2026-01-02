export async function generateMetadata({ params }) {
  return {
    title: 'Project Case Study | David Dimalanta',
    description: 'Detailed case study showcasing design process, challenges, and outcomes',
    metadataBase: new URL('https://daviddim.ca'),
    openGraph: {
      title: 'Project Case Study | David Dimalanta',
      description: 'Detailed case study showcasing design process, challenges, and outcomes',
      url: 'https://daviddim.ca/project',
      siteName: 'David Dimalanta — Toronto-based Product Designer',
      images: [
        {
          url: '/assets/images/web-preview/preview.png',
          width: 1200,
          height: 630,
          alt: 'Project Case Study Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Project Case Study | David Dimalanta',
      description: 'Detailed case study showcasing design process, challenges, and outcomes',
      images: ['/assets/images/web-preview/preview.png'],
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
