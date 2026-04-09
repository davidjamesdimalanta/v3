import AboutLanding from "../sections/about-landing";

export const metadata = {
  title: "About - David Dimalanta",
  description: "Learn more about David Dimalanta — a Toronto-based product designer with a background in math, code, and interaction design.",
};

export default function AboutPage() {
  return (
    <main>
      <section data-label="about" aria-label="About David Dimalanta">
        <AboutLanding />
      </section>
    </main>
  );
}
