import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const aspekta = localFont({
  src: [
    {
      path: '../public/fonts/Aspekta/Aspekta-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-550.woff2',
      weight: '550',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aspekta',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});


