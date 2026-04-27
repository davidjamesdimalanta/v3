"use client";

import { useState } from "react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import BentoCell from "./organisms/BentoCell";
import ProjectDrawer from "./organisms/ProjectDrawer";
import { projectData as goableData } from "../project/goable/data";
import { projectData as socraticData } from "../project/socratic/data";
import { projectData as ihubData } from "../project/ihub/data";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Cell-to-project mapping with hardcoded category labels (per §7 of plan)
const CELLS = [
  {
    variant: "hero",
    slug: "goable",
    data: goableData,
    category: "PRODUCT DESIGN",
  },
  {
    variant: "r1",
    slug: "socratic",
    data: socraticData,
    category: "AGENTIC WORKFLOWS",
  },
  {
    variant: "r2",
    slug: "ihub",
    data: ihubData,
    category: "GAME DESIGN",
  },
];

export default function BentoGrid({ animate = "visible", prefersReducedMotion = false }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const activeCell = CELLS.find((c) => c.slug === activeSlug) ?? null;
  const activeProject = activeCell
    ? { slug: activeCell.slug, ...activeCell.data }
    : null;

  const heroCell = CELLS[0];
  const r1Cell = CELLS[1];
  const r2Cell = CELLS[2];

  const renderHero = () => (
    <BentoCell
      variant="hero"
      category={heroCell.category}
      title={heroCell.data.name}
      subtitle={heroCell.data.title}
      thumbnail={heroCell.data.coverImage}
      videoSrc={heroCell.data.coverVideo}
      onOpen={() => setActiveSlug(heroCell.slug)}
    />
  );

  const renderRightColumn = () => (
    <div className="flex flex-col gutter-sm flex-1 md:max-w-[400px]">
      <BentoCell
        variant="r1"
        category={r1Cell.category}
        title={r1Cell.data.name}
        thumbnail={r1Cell.data.coverImage}
        onOpen={() => setActiveSlug(r1Cell.slug)}
      />
      <BentoCell
        variant="r2"
        category={r2Cell.category}
        title={r2Cell.data.name}
        thumbnail={r2Cell.data.coverImage}
        onOpen={() => setActiveSlug(r2Cell.slug)}
      />
    </div>
  );

  return (
    <>
      {prefersReducedMotion ? (
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-5 pb-6 flex flex-col md:flex-row gutter-sm md:h-[600px]">
          {renderHero()}
          {renderRightColumn()}
        </div>
      ) : (
        <AnimatedGroup
          as="div"
          asChild="div"
          className="max-w-[1200px] w-full mx-auto px-4 md:px-5 pb-6 flex flex-col md:flex-row gutter-sm md:h-[600px]"
          animate={animate}
          variants={{
            container: {
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0 } },
            },
            item: ITEM_VARIANTS,
          }}
        >
          {renderHero()}
          {renderRightColumn()}
        </AnimatedGroup>
      )}

      <ProjectDrawer
        open={!!activeSlug}
        onOpenChange={(open) => { if (!open) setActiveSlug(null); }}
        project={activeProject}
      />
    </>
  );
}
