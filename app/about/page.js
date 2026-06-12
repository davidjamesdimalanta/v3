import AboutLanding from "../sections/about-landing";
import { buildSocialMetadata } from "@/app/shared-metadata";

export const metadata = {
  title: "About - David Dimalanta",
  description: "Learn more about David Dimalanta — a Toronto-based product designer with a background in math, code, and interaction design.",
  ...buildSocialMetadata({
    title: "About - David Dimalanta",
    description: "Learn more about David Dimalanta — a Toronto-based product designer with a background in math, code, and interaction design.",
    path: '/about',
  }),
};

export default function AboutPage() {
  return (
    <main>
      <section data-label="about" aria-label="About David Dimalanta" className="w-full max-w-[1200px] mx-auto">
        <AboutLanding />
      </section>
    </main>
  );
}
