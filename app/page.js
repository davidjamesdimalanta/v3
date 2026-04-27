import HomepageHero from "./sections/HomepageHero";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <section data-label="hero-and-work" aria-label="Hero introduction and selected work" className="w-full">
        <HomepageHero />
      </section>
    </main>
  );
}
