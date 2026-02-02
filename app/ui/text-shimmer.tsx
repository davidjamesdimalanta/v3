"use client";

import React, { useMemo, type JSX } from "react";
import { motion } from "framer-motion";
import { cn } from "./lib/utils";

export type TextShimmerProps = {
  children: string;
  as?: React.ElementType;
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
  duration = 2,
  spread = 1.5,
  variant = "blue",
}: TextShimmerProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  // Color configurations matching existing gradients
  const colorConfig = {
    blue: {
      baseColor: "#0B99FF",
      gradientColor: "#6CC2FF",
    },
    green: {
      baseColor: "#39FF14",
      gradientColor: "#71CF88",
    },
  };

  const colors = colorConfig[variant];

  return (
    <MotionComponent
      className={cn(
        "relative inline bg-[length:250%_100%,auto] bg-clip-text",
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
