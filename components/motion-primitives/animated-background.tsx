'use client';

import { cn } from '@/app/ui/lib/utils';
import { AnimatePresence, type Transition, motion } from 'motion/react';
import {
  Children,
  cloneElement,
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from 'react';

type AnimatedBackgroundChildProps = {
  'data-id': string;
  'data-checked'?: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export type AnimatedBackgroundProps = {
  children: ReactElement<AnimatedBackgroundChildProps>[] | ReactElement<AnimatedBackgroundChildProps>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [localActiveId, setLocalActiveId] = useState<string | null>(null);
  const uniqueId = useId();
  const activeId = defaultValue ?? localActiveId;

  const handleSetActiveId = (id: string | null) => {
    setLocalActiveId(id);
    onValueChange?.(id);
  };

  return Children.map(children, (child, index) => {
    const id = child.props['data-id'];
    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id),
        };

    return cloneElement(
      child,
      {
        key: index,
        className: cn('relative inline-flex', child.props.className),
        'data-checked': activeId === id ? 'true' : 'false',
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn('absolute inset-0', className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <div className="z-10">{child.props.children}</div>
      </>
    );
  });
}
