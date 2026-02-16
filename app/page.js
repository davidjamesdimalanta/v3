import Closing from "./sections/closing";
import Landing from "./sections/landing";
import Projects from "./sections/projects";
import WaveBackground from "./ui/WaveBackground";

export default function Home() {
  return (
    <main>
    <Landing />
    <div id="projects">
      <Projects />
    </div>
    </main>
  );
}

