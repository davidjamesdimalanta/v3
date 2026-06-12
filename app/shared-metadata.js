// Centralized social-preview (Open Graph / Twitter) config so every route —
// homepage, work, about, and all case studies — shares the same preview image.

export const SITE_URL = 'https://daviddim.ca';
export const SITE_NAME = 'David Dimalanta — Toronto-based Product Designer';
export const PREVIEW_IMAGE = '/assets/images/web-preview/preview_.png';

// Build the openGraph + twitter blocks for a route. Because Next.js shallow-merges
// metadata (a child's `openGraph`/`twitter` object fully replaces the parent's),
// every route that sets these must include the image — so we always inject it here.
export function buildSocialMetadata({
  title,
  description,
  path = '',
  alt = 'David Dimalanta Portfolio Preview',
} = {}) {
  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      images: [
        {
          url: PREVIEW_IMAGE,
          width: 1200,
          height: 630,
          alt,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [PREVIEW_IMAGE],
    },
  };
}
