"use client"

import { useState, useEffect, useRef } from "react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/app/ui/hover-card"
import { Popover, PopoverTrigger, PopoverContent } from "@/app/ui/popover"
import { cn } from "@/app/ui/lib/utils"
import Image from "next/image"
import { TextShimmer } from "@/app/ui/text-shimmer"

/**
 * DefinitionCard Component
 *
 * A hybrid component that uses HoverCard on desktop (hover) and Popover on mobile (tap).
 * Combines text, optional images, and citations in a reusable package.
 *
 * DESKTOP: Uses HoverCard with the specified `side` prop (e.g., "left")
 * MOBILE: Automatically positions Popover above or below based on viewport position
 *
 * @param {string|JSX.Element} trigger - The highlighted text/term to display (can include JSX for styling)
 * @param {"blue"|"green"} shimmerVariant - Shimmer animation color variant (default: "blue")
 * @param {string} triggerClassName - [DEPRECATED] Optional className for trigger styling. Use shimmerVariant instead.
 * @param {Object} triggerProps - Optional additional props for the trigger element (e.g., onMouseEnter)
 * @param {JSX.Element|string} content - Main content displayed in the card
 * @param {Object} image - Optional image object { src, alt }
 * @param {Object} caption - Optional caption object { text, link }
 * @param {string} side - Position of HoverCard on desktop (default: "left"). Ignored on mobile.
 * @param {string} width - Width class for card content (default: "w-80")
 * @param {string|number} sideOffset - Offset distance from trigger (default: "1")
 *
 * @example
 * <DefinitionCard
 *   trigger="Washroom access"
 *   shimmerVariant="blue"
 *   triggerProps={{ onMouseEnter: handleHover }}
 *   content={<>involves both physical and emotional barriers</>}
 *   caption={{ text: "DOI : 10.17577/IJERTV9IS070564", link: "https://doi.org/..." }}
 *   side="left"
 * />
 */
export default function DefinitionCard({
  trigger,
  shimmerVariant = "blue",
  triggerClassName,
  triggerProps = {},
  content,
  image,
  caption,
  side = "left",
  width = "w-80",
  sideOffset = "1"
}) {
  const [hasHover, setHasHover] = useState(true) // Default to hover for SSR
  const [popoverSide, setPopoverSide] = useState("bottom") // Dynamic side for mobile
  const triggerRef = useRef(null) // Ref to track trigger element

  useEffect(() => {
    // Detect if device has hover capability
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setHasHover(mediaQuery.matches)

    // Listen for changes (e.g., device rotation, external display)
    const handleChange = (e) => setHasHover(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Calculate optimal popover position on mobile
  const calculatePopoverPosition = (triggerElement) => {
    if (!triggerElement) return "bottom"

    const rect = triggerElement.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const triggerMiddle = rect.top + rect.height / 2

    // If trigger is in top half of viewport, show popover below
    // If trigger is in bottom half, show popover above
    return triggerMiddle < viewportHeight / 2 ? "bottom" : "top"
  }

  // Shared content component
  const cardContent = (
    <div className="flex flex-col gap-3">
      {/* Main content */}
      {content && (
        <div className="text-p">
          {content}
        </div>
      )}

      {/* Optional image */}
      {image && (
        <div className="w-full rounded-sm overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt || ""}
            width={320}
            height={180}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Optional caption with link */}
      {caption && (
        <>
          {caption.link ? (
            <a
              href={caption.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-sm opacity-60 hover:bd-text transition-all duration-150",
                !hasHover && "underline underline-offset-2" // Underline on mobile
              )}
            >
              {caption.text}
            </a>
          ) : (
            <p className="text-sm opacity-60">
              {caption.text}
            </p>
          )}
        </>
      )}
    </div>
  )

  // Render HoverCard on desktop (hover devices)
  if (hasHover) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <i
            className={cn("pr-[2px] cursor-help", triggerClassName)}
            {...triggerProps}
          >
            <TextShimmer variant={shimmerVariant} as="span">
              {typeof trigger === 'string' ? trigger : String(trigger)}
            </TextShimmer>
          </i>
        </HoverCardTrigger>
        <HoverCardContent
          className={width}
          sideOffset={sideOffset}
          side={side}
        >
          {cardContent}
        </HoverCardContent>
      </HoverCard>
    )
  }

  // Render Popover on mobile (touch devices)
  return (
    <Popover
      onOpenChange={(open) => {
        if (open && triggerRef.current) {
          setPopoverSide(calculatePopoverPosition(triggerRef.current))
        }
      }}
    >
      <PopoverTrigger asChild>
        <i
          ref={triggerRef}
          className={cn("pr-[2px] cursor-help", triggerClassName)}
          {...triggerProps}
        >
          <TextShimmer variant={shimmerVariant} as="span">
            {typeof trigger === 'string' ? trigger : String(trigger)}
          </TextShimmer>
        </i>
      </PopoverTrigger>
      <PopoverContent
        className={cn(width, "max-w-[calc(100vw-2rem)]")}
        sideOffset={sideOffset}
        side={popoverSide}
      >
        {cardContent}
      </PopoverContent>
    </Popover>
  )
}
