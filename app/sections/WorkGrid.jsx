"use client";

import { useState } from "react";
import { motion } from "motion/react";
import BentoCell from "./organisms/BentoCell";
import ProjectDrawer from "./organisms/ProjectDrawer";
import { projectData as linklogData } from "../project/linklog/data";
import { projectData as goableData } from "../project/goable/data";
import { projectData as figmaBallData } from "../project/figma-ball-knowledge/data";
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

const PROJECTS = [
  { slug: "linklog",             data: linklogData, offset: false },
  { slug: "goable",              data: goableData,   offset: false },
  { slug: "figma-ball-knowledge", data: figmaBallData, offset: false },
  { slug: "socratic",            data: socraticData, offset: false },
  { slug: "ihub",                data: ihubData,     offset: false },
];

export default function WorkGrid({ animate = "visible", prefersReducedMotion = false }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const activeProject = PROJECTS.find((p) => p.slug === activeSlug) ?? null;
  const renderProject = activeProject ? { slug: activeProject.slug, ...activeProject.data } : null;

  const cards = PROJECTS.map((project) => {
    const card = (
      <BentoCell
        variant="hero"
        category={project.data.featuredCategory}
        title={project.data.name}
        subtitle={project.data.title}
        thumbnail={project.data.coverImage}
        videoSrc={project.data.coverVideo}
        darkVideoSrc={project.data.coverVideoDark}
        onOpen={() => setActiveSlug(project.slug)}
      />
    );

    return { ...project, card };
  });

  if (prefersReducedMotion) {
    return (
      <>
        <div className="work-grid max-w-[1200px] w-full mx-auto px-4 xl:px-0 pb-6">
          {cards.map(({ slug, card, offset }) => (
            <div key={slug} className={`min-h-[480px] h-full ${offset ? "md:pt-16" : ""}`}>
              {card}
            </div>
          ))}
        </div>
        <ProjectDrawer
          open={!!activeSlug}
          onOpenChange={(open) => { if (!open) setActiveSlug(null); }}
          project={renderProject}
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        className="work-grid max-w-[1200px] w-full mx-auto px-4 xl:px-0 pb-6"
        initial="hidden"
        animate={animate}
        variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0 } } }}
      >
        {cards.map(({ slug, card, offset }) => (
          <motion.div
            key={slug}
            className={`min-h-[480px] h-full ${offset ? "md:pt-16" : ""}`}
            variants={ITEM_VARIANTS}
          >
            {card}
          </motion.div>
        ))}
      </motion.div>

      <ProjectDrawer
        open={!!activeSlug}
        onOpenChange={(open) => { if (!open) setActiveSlug(null); }}
        project={renderProject}
      />
    </>
  );
}
