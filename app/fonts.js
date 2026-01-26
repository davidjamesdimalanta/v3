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
      path: '../public/fonts/Aspekta/Aspekta-50.woff2',
      weight: '50',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-100.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-150.woff2',
      weight: '150',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-200.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-250.woff2',
      weight: '250',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-350.woff2',
      weight: '350',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-450.woff2',
      weight: '450',
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
      path: '../public/fonts/Aspekta/Aspekta-650.woff2',
      weight: '650',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-750.woff2',
      weight: '750',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-800.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-850.woff2',
      weight: '850',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-900.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-950.woff2',
      weight: '950',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta/Aspekta-1000.woff2',
      weight: '1000',
      style: 'normal',
    },
  ],
  variable: '--font-aspekta',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

export const newRodinPro = localFont({
  src: [
    {
      path: '../public/fonts/New Rodin Pro/NewRodin Pro L.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/New Rodin Pro/NewRodin Pro M.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/New Rodin Pro/NewRodin Pro DB.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/New Rodin Pro/NewRodin Pro B.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-new-rodin-pro',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});


