"use client";

import { useState } from "react";
import { motion } from "motion/react";
import BentoCell from "./organisms/BentoCell";
import ProjectDrawer from "./organisms/ProjectDrawer";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Right column acts as both an animated child AND a stagger container
const RIGHT_COLUMN_VARIANTS = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const CELL_CONFIG = [
  { variant: "hero", slug: "linklog" },
  { variant: "r1", slug: "figma-ball-knowledge" },
  { variant: "r2", slug: "goable" },
];

export default function BentoGrid({ projects = [], animate = "visible", prefersReducedMotion = false }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const projectMap = new Map(projects.map((project) => [project.slug, project]));
  const cells = CELL_CONFIG.map((config) => ({
    ...config,
    data: projectMap.get(config.slug),
  })).filter((cell) => cell.data);
  const activeProject = projectMap.get(activeSlug) ?? null;
  const drawerActive = drawerOpen || Boolean(activeSlug);

  const openProject = (slug) => {
    setActiveSlug(slug);
    setDrawerOpen(true);
  };

  const heroCell = cells[0];
  const r1Cell = cells[1];
  const r2Cell = cells[2];

  if (!heroCell || !r1Cell || !r2Cell) return null;

  return (
    <>
      {prefersReducedMotion ? (
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-5 pb-6 flex flex-col md:flex-row gutter-sm md:h-[600px]">
          <div className="flex-none h-[420px] w-full md:flex-2 md:h-full min-w-0">
            <BentoCell
              variant="hero"
              category={heroCell.data.featuredCategory}
              title={heroCell.data.name}
              subtitle={heroCell.data.title}
              thumbnail={heroCell.data.bento?.thumbnail || heroCell.data.coverImage}
              videoSrc={heroCell.data.coverVideo}
              darkVideoSrc={heroCell.data.coverVideoDark}
              paused={drawerActive}
              onOpen={() => openProject(heroCell.slug)}
            />
          </div>
          <div className="flex flex-col gutter-sm flex-1 min-w-0">
            <div className="flex flex-col flex-none h-[180px] md:flex-1 md:h-auto">
            <BentoCell
              variant="r1"
              category={r1Cell.data.featuredCategory}
              title={r1Cell.data.name}
              thumbnail={r1Cell.data.bento?.thumbnail || r1Cell.data.coverImage}
              onOpen={() => openProject(r1Cell.slug)}
            />
            </div>
            <div className="flex flex-col flex-none h-[180px] md:flex-1 md:h-auto">
            <BentoCell
              variant="r2"
              category={r2Cell.data.featuredCategory}
              title={r2Cell.data.name}
              thumbnail={r2Cell.data.bento?.thumbnail || r2Cell.data.coverImage}
              onOpen={() => openProject(r2Cell.slug)}
            />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className="max-w-[1200px] w-full mx-auto px-4 xl:px-0 pb-6 flex flex-col md:flex-row gutter-sm md:h-[600px]"
          initial="hidden"
          animate={animate}
          variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0 } } }}
        >
          <motion.div className="flex-none h-[420px] w-full md:flex-2 md:h-full min-w-0" variants={ITEM_VARIANTS}>
            <BentoCell
              variant="hero"
              category={heroCell.data.featuredCategory}
              title={heroCell.data.name}
              subtitle={heroCell.data.title}
              thumbnail={heroCell.data.bento?.thumbnail || heroCell.data.coverImage}
              videoSrc={heroCell.data.coverVideo}
              darkVideoSrc={heroCell.data.coverVideoDark}
              paused={drawerActive}
              onOpen={() => openProject(heroCell.slug)}
            />
          </motion.div>
          <motion.div className="flex flex-col gutter-sm flex-1 min-w-0" variants={RIGHT_COLUMN_VARIANTS}>
            <motion.div className="flex flex-col flex-none h-[180px] md:flex-1 md:h-auto" variants={ITEM_VARIANTS}>
              <BentoCell
                variant="r1"
                category={r1Cell.data.featuredCategory}
                title={r1Cell.data.name}
                thumbnail={r1Cell.data.bento?.thumbnail || r1Cell.data.coverImage}
                onOpen={() => openProject(r1Cell.slug)}
              />
            </motion.div>
            <motion.div className="flex flex-col flex-none h-[180px] md:flex-1 md:h-auto" variants={ITEM_VARIANTS}>
              <BentoCell
                variant="r2"
                category={r2Cell.data.featuredCategory}
                title={r2Cell.data.name}
                thumbnail={r2Cell.data.bento?.thumbnail || r2Cell.data.coverImage}
                onOpen={() => openProject(r2Cell.slug)}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <ProjectDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onCloseAnimationEnd={() => setActiveSlug(null)}
        project={activeProject}
      />
    </>
  );
}
