import localFont from 'next/font/local';

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
