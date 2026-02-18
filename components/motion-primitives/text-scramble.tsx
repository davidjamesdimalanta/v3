'use client';
import { type JSX, useEffect, useRef, useState } from 'react';
import { motion, MotionProps } from 'motion/react';

export type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );
  const [displayText, setDisplayText] = useState(children);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const targetTextRef = useRef(children);
  const hasBeenTriggeredRef = useRef(false);

  // Always keep the target text ref in sync with children
  targetTextRef.current = children;

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Cancel any in-progress animation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const target = targetTextRef.current;

    if (!hasBeenTriggeredRef.current && !trigger) {
      // On first mount with trigger=false, just sync the display text (no animation)
      setDisplayText(target);
      return;
    }
    hasBeenTriggeredRef.current = true;

    const steps = duration / speed;
    let step = 0;

    intervalRef.current = setInterval(() => {
      const currentTarget = targetTextRef.current;
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < currentTarget.length; i++) {
        if (currentTarget[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * currentTarget.length > i) {
          scrambled += currentTarget[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setDisplayText(currentTarget);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  }, [trigger, children]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}
