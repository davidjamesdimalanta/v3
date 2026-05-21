"use client";

import { useState } from "react";
import { motion } from "motion/react";
import BentoCell from "./organisms/BentoCell";
import ProjectDrawer from "./organisms/ProjectDrawer";
import { projectData as linklogData } from "../project/linklog/data";
import { projectData as goableData } from "../project/goable/data";
import { projectData as figmaBallData } from "../project/figma-ball-knowledge/data";

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

const CELLS = [
  { variant: "hero", slug: "linklog",               data: linklogData    },
  { variant: "r1",  slug: "figma-ball-knowledge",   data: figmaBallData  },
  { variant: "r2",  slug: "goable",                 data: goableData     },
];

const GOABLE_BENTO_IMAGE =
  "https://cdn.sanity.io/images/iy4m4myd/production/4a073462f97b49f4528d514b5bae239373eaf5b0-2048x1508.png";

export default function BentoGrid({ animate = "visible", prefersReducedMotion = false }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const activeCell = CELLS.find((c) => c.slug === activeSlug) ?? null;
  const activeProject = activeCell
    ? { slug: activeCell.slug, ...activeCell.data }
    : null;

  const heroCell = CELLS[0];
  const r1Cell = CELLS[1];
  const r2Cell = CELLS[2];

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
              thumbnail={heroCell.data.coverImage}
              videoSrc={heroCell.data.coverVideo}
              darkVideoSrc={heroCell.data.coverVideoDark}
              onOpen={() => setActiveSlug(heroCell.slug)}
            />
          </div>
          <div className="flex flex-col gutter-sm flex-1 min-w-0">
            <div className="flex flex-col flex-none h-[180px] md:flex-1 md:h-auto">
            <BentoCell
              variant="r1"
              category={r1Cell.data.featuredCategory}
              title={r1Cell.data.name}
              thumbnail="/assets/images/bento/Figma.png"
              onOpen={() => setActiveSlug(r1Cell.slug)}
            />
            </div>
            <div className="flex flex-col flex-none h-[180px] md:flex-1 md:h-auto">
            <BentoCell
              variant="r2"
              category={r2Cell.data.featuredCategory}
              title={r2Cell.data.name}
              thumbnail={GOABLE_BENTO_IMAGE}
              onOpen={() => setActiveSlug(r2Cell.slug)}
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
              thumbnail={heroCell.data.coverImage}
              videoSrc={heroCell.data.coverVideo}
              darkVideoSrc={heroCell.data.coverVideoDark}
              onOpen={() => setActiveSlug(heroCell.slug)}
            />
          </motion.div>
          <motion.div className="flex flex-col gutter-sm flex-1 min-w-0" variants={RIGHT_COLUMN_VARIANTS}>
            <motion.div className="flex flex-col flex-none h-[180px] md:flex-1 md:h-auto" variants={ITEM_VARIANTS}>
              <BentoCell
                variant="r1"
                category={r1Cell.data.featuredCategory}
                title={r1Cell.data.name}
                thumbnail="/assets/images/bento/Figma.png"
                onOpen={() => setActiveSlug(r1Cell.slug)}
              />
            </motion.div>
            <motion.div className="flex flex-col flex-none h-[180px] md:flex-1 md:h-auto" variants={ITEM_VARIANTS}>
              <BentoCell
                variant="r2"
                category={r2Cell.data.featuredCategory}
                title={r2Cell.data.name}
                thumbnail={GOABLE_BENTO_IMAGE}
                onOpen={() => setActiveSlug(r2Cell.slug)}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <ProjectDrawer
        open={!!activeSlug}
        onOpenChange={(open) => { if (!open) setActiveSlug(null); }}
        project={activeProject}
      />
    </>
  );
}
