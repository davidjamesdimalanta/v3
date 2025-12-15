import "./globals.css";
import Nav from "./ui/nav";
import SmoothScroll from "./ui/SmoothScroll";
import WaveBackground from "./ui/WaveBackground";


export const metadata = {
  title: "David Dimalanta",
  description: "Toronto-based Product Designer",
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
