'use client';

import { motion, Transition, useInView, UseInViewOptions, Variants } from 'motion/react';
import { useRef } from 'react';

type InViewProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  transition?: Transition;
  viewOptions?: UseInViewOptions;
};

export function InView({
  children,
  className,
  variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  transition = { duration: 0.3, ease: 'easeOut' },
  viewOptions = { once: true, margin: '0px 0px -350px 0px' },
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
