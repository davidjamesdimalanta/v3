"use client";

import { motion } from "motion/react";
import BentoCell from "./organisms/BentoCell";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function WorkGrid({ projects = [], animate = "visible", prefersReducedMotion = false }) {
  const cards = projects.map((project, index) => {
    const card = (
      <BentoCell
        variant="hero"
        category={project.featuredCategory}
        title={project.title}
        thumbnail={project.coverImage}
        darkThumbnail={project.coverImageDark}
        videoSrc={project.coverVideo}
        hevcVideoSrc={project.coverVideoHevc}
        darkVideoSrc={project.coverVideoDark}
        darkHevcVideoSrc={project.coverVideoDarkHevc}
        priority={index === 0}
        href={`/project/${project.slug}`}
        comingSoon={project.comingSoon}
      />
    );

    return { slug: project.slug, offset: false, card };
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
    </>
  );
}
