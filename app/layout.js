import Script from "next/script";
import "./globals.css";
import Nav from "./ui/nav";


export const metadata = {
  title: "David Dimalanta",
  description: "Toronto-based Product Designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative antialiased">
        <Nav />
        {children}
        <Script src="/scripts/wave.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
