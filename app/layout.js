import "./globals.css";
import { inter, aspekta } from "./fonts";
import SiteShell from "./ui/SiteShell";
import ThemeProvider from "./ui/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/app/ui/sonner"

export const metadata = {
  title: "David Dimalanta",
  description: "Toronto-based Product Designer specializing in product design, UX, and UI. Based in Toronto, Canada. Previously at iHub, currently at Hand Eye Society.",
  metadataBase: new URL('https://daviddim.ca'),
  keywords: [
    "David Dimalanta",
    "product designer",
    "UX designer",
    "UI designer",
    "Toronto",
    "portfolio",
    "interaction design",
    "design systems",
    "web design",
    "case study",
    "University of Toronto",
    "Next.js",
    "Figma",
  ],
  authors: [{ name: "David Dimalanta", url: "https://daviddim.ca" }],
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
    icon: [
      { url: '/assets/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/assets/icon/favicon-32x32.png',
    apple: '/assets/icon/apple-touch-icon.png',
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
    { media: '(prefers-color-scheme: light)', color: 'oklch(0.977 0.003 145.55)' },
    { media: '(prefers-color-scheme: dark)', color: 'oklch(0.185 0.003 145.471)' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${aspekta.variable}`} suppressHydrationWarning>
      <body className="relative antialiased">
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {/* <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script> */}
        <ThemeProvider>
          <SpeedInsights />
          <Analytics/>
          <SiteShell>{children}</SiteShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
