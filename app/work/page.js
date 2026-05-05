import WorkGrid from "../sections/WorkGrid";

export const metadata = {
  title: "Work — David Dimalanta",
  description: "Selected projects by David Dimalanta — product design, agentic workflows, and web development.",
};

export default function WorkPage() {
  return (
    <main className="flex flex-col w-full pt-24">
      <WorkGrid />
    </main>
  );
}
