import "./globals.css";
import Nav from "./ui/nav";
import SmoothScroll from "./ui/SmoothScroll";
import WaveBackground from "./ui/WaveBackground";


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
        url: '/assets/images/web-preview/preview.png',
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
    images: ['/assets/images/web-preview/preview.png'],
  },
  icons: {
    icon: '/assets/icon/Logo.svg',
    apple: '/assets/icon/Logo-dark.png',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative antialiased">
        <SmoothScroll />
        <WaveBackground />
        <Nav />
        {children}
      </body>
    </html>
  );
}
