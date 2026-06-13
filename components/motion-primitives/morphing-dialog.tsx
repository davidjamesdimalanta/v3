'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
  type Variant,
} from 'motion/react';
import { createPortal } from 'react-dom';
import { cn } from '@/app/ui/lib/utils';

type MorphingDialogContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
};

const MorphingDialogContext =
  React.createContext<MorphingDialogContextType | null>(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error('useMorphingDialog must be used within a MorphingDialog');
  }
  return context;
}

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
}

type MorphingDialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function MorphingDialog({ children, transition }: MorphingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      uniqueId,
      triggerRef,
    }),
    [isOpen, uniqueId]
  );

  return (
    <MorphingDialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphingDialogContext.Provider>
  );
}

type MorphingDialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

function MorphingDialogTrigger({
  children,
  className,
  style,
  ariaLabel = 'Open dialog',
}: MorphingDialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog();

  const handleClick = useCallback(() => {
    setIsOpen((current) => !current);
  }, [setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen((current) => !current);
      }
    },
    [setIsOpen]
  );

  return (
    <motion.div
      ref={triggerRef}
      role='button'
      tabIndex={0}
      className={cn('relative cursor-pointer', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      aria-haspopup='dialog'
      aria-expanded={isOpen}
      aria-controls={`motion-ui-morphing-dialog-content-${uniqueId}`}
      aria-label={ariaLabel}
    >
      {children}
    </motion.div>
  );
}

type MorphingDialogContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogContent({
  children,
  className,
  style,
}: MorphingDialogContentProps) {
  const { setIsOpen, uniqueId } = useMorphingDialog();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen]);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  return (
    <motion.div
      ref={containerRef}
      id={`motion-ui-morphing-dialog-content-${uniqueId}`}
      className={cn('overflow-hidden', className)}
      style={style}
      role='dialog'
      aria-modal='true'
      aria-labelledby={`motion-ui-morphing-dialog-title-${uniqueId}`}
      aria-describedby={`motion-ui-morphing-dialog-description-${uniqueId}`}
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
      }}
      exit={{
        opacity: 0,
        y: 12,
        filter: 'blur(4px)',
        transition: { duration: 0.16, ease: 'easeInOut' },
      }}
    >
      {children}
    </motion.div>
  );
}

type MorphingDialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogContainer({
  children,
  className,
  style,
}: MorphingDialogContainerProps) {
  const { isOpen, uniqueId } = useMorphingDialog();

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence initial={false} mode='sync'>
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className='fixed inset-0 z-50 h-full w-full bg-(--bg-color)/80 backdrop-blur-xs'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.16, duration: 0.18 } }}
          />
          <motion.div
            key={`content-${uniqueId}`}
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center p-4',
              className
            )}
            style={style}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0.16 } }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

type MorphingDialogTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogTitle({
  children,
  className,
  style,
}: MorphingDialogTitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      id={`motion-ui-morphing-dialog-title-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

type MorphingDialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphingDialogDescription({
  children,
  className,
  variants,
}: MorphingDialogDescriptionProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      id={`motion-ui-morphing-dialog-description-${uniqueId}`}
      variants={variants}
      className={className}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {children}
    </motion.div>
  );
}

type MorphingDialogImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogImage({
  src,
  alt,
  className,
  style,
}: MorphingDialogImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(className)}
      style={style}
    />
  );
}

type MorphingDialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphingDialogClose({
  children,
  className,
  variants,
}: MorphingDialogCloseProps) {
  const { setIsOpen, uniqueId } = useMorphingDialog();

  return (
    <motion.button
      onClick={() => setIsOpen(false)}
      type='button'
      aria-label='Close dialog'
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute right-6 top-6', className)}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      {children || (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path
            d='M6 6L18 18M18 6L6 18'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      )}
    </motion.button>
  );
}

export {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogTitle,
  MorphingDialogDescription,
  MorphingDialogImage,
};
