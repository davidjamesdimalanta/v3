import Landing from "./sections/landing";
import Projects from "./sections/projects";

export default function Home() {
  return (
    <main>
    <section data-label="hero" aria-label="Hero introduction">
      <Landing />
    </section>
    <section id="projects" data-label="selected-work" aria-label="Selected work and case studies">
      <Projects />
    </section>
    </main>
  );
}

