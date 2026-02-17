"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "./lib/utils";

// Create motion components at module level to avoid creating components during render
const MotionSpan = motion.span;
const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionH3 = motion.h3;

// Map of supported component types to motion components
const motionComponents = {
  span: MotionSpan,
  div: MotionDiv,
  p: MotionP,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
} as const;

export type TextShimmerProps = {
  children: string;
  as?: keyof typeof motionComponents;
  className?: string;
  duration?: number;
  spread?: number;
  variant?: "blue" | "green";
};

/**
 * Text Shimmer Component
 *
 * Creates a continuous shimmer animation effect on text.
 * Based on Motion Primitives text-shimmer with custom color variants.
 *
 * @param children - Text content to animate
 * @param as - HTML element type (default: "span")
 * @param className - Additional CSS classes
 * @param duration - Animation cycle duration in seconds (default: 1.2s)
 * @param spread - Shimmer width multiplier (default: 1.2)
 * @param variant - Color scheme: "blue" or "green" (default: "blue")
 */
function TextShimmerComponent({
  children,
  as: Component = "span",
  className,
  duration = 1.8,
  spread = 2.5,
  variant = "blue",
}: TextShimmerProps) {
  // Look up the motion component from the pre-defined map
  const MotionComponent = motionComponents[Component];

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  // Color configurations matching existing gradients
  const colorConfig = {
    brown: {
      baseColor: "#3A1F1E",
      // gradientColor: "#6CC2FF",
      gradientColor: "#D6CAC8", 
    },
    green: {
      baseColor: "#39FF14",
      gradientColor: "#D0EFDE",
    },
  };

  const colors = colorConfig[variant];

  return (
    <MotionComponent
      className={cn(
        "relative inline bg-size-[250%_100%,auto] bg-clip-text",
        "text-transparent [background-repeat:no-repeat,padding-box]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          "--base-color": colors.baseColor,
          "--gradient-color": colors.gradientColor,
          fontFamily: "var(--font-aspekta), sans-serif",
          paddingRight: "0.05em",
          backgroundImage: `linear-gradient(
            90deg,
            var(--base-color) calc(50% - var(--spread)),
            var(--gradient-color) 50%,
            var(--base-color) calc(50% + var(--spread))
          ), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
}

export const TextShimmer = React.memo(TextShimmerComponent);
