import "./globals.css";
import { inter, aspekta } from "./fonts";
import SiteShell from "./ui/SiteShell";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata = {
  title: "David Dimalanta",
  description: "Toronto-based Product Designer",
  metadataBase: new URL('https://daviddim.ca'),
  openGraph: {
    title: "David Dimalanta",
    description: "Toronto-based Product Designer",
    url: 'https://daviddim.ca',
    siteName: 'David Dimalanta — Toronto-based Product Designer',
    images: [
      {
        url: '/assets/images/web-preview/preview_.png',
        width: 1200,
        height: 630,
        alt: 'David Dimalanta Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "David Dimalanta",
    description: "Toronto-based Product Designer",
    images: ['/assets/images/web-preview/preview_.png'],
  },
  icons: {
    icon: '/assets/icon/tabicon.png',
    shortcut: '/assets/icon/tabicon.png',
    apple: '/assets/icon/tabicon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'David Dimalanta',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${aspekta.variable}`}>
      <body className="relative antialiased">
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {/* <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script> */}
        <SpeedInsights />
        <Analytics/>
<SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
