"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useInView } from "motion/react"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/app/ui/hover-card"
import { Popover, PopoverTrigger, PopoverContent } from "@/app/ui/popover"
import { cn } from "@/app/ui/lib/utils"
import CaseStudyTextBlock from "./CaseStudyTextBlock"

// Use **text** syntax to mark bold segments within strings
const PERSONAS = [
  {
    id: "access-advocate",
    name: "Access Advocate",
    avatarSrc: "/assets/images/goAble/access-advocate.svg",
    avatarAlt: "Illustration of Access Advocate — a caregiver navigating washroom access for a dependent",
    traits: [
      "Has a dependent who requires an **adult-sized change table**",
      "Outspoken about **physical and emotional barriers** to washroom access",
      "Every outing involves **navigating multiple washrooms**, and each one a logistical decision",
    ],
    designConnection:
      "The vagueness of **\"accessible\" labels** directly failed caregivers like the access advocate, influencing the **personalized onboarding filters** so users can specify exact needs like adult change table availability.",
  },
  {
    id: "shy-pooper",
    name: "Shy Pooper",
    avatarSrc: "/assets/images/goAble/shy-pooper.svg",
    avatarAlt: "Illustration of Shy Pooper — a person with IBS who scouts washrooms discreetly before committing",
    traits: [
      "Lives with **IBS** and manages **washroom anxiety** privately",
      "Scouts washrooms **discreetly before committing**, arrival anxiety is real",
      "Won't enter if **cleanliness is in doubt**; smell is a dealbreaker",
    ], 
    designConnection:
      "**Unreliable sources** and the absence of **real-time cleanliness data** were dealbreakers to the shy pooper, driving the **community-driven status updates** and upfront amenity display.",
  },
]

// Renders a string with **bold** markers as React nodes
function BoldText({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-600">{part}</strong> : part
  )
}

function PersonaCardContent({ persona }) {
  return (
    <div className="flex flex-col gutter-xs">
      <p className="text-small text-600">{persona.name}</p>
      <hr className="border-(--schemes-outline-variant)" />
      <ul className="flex flex-col gutter-xs">
        {persona.traits.map((trait, i) => (
          <li key={i} className="text-small text-400 flex gutter-xs">
            <span className="opacity-50 shrink-0">—</span>
            <span><BoldText text={trait} /></span>
          </li>
        ))}
      </ul>
      <hr className="border-(--schemes-outline-variant)" />
      {/* <p className="text-tiny uppercase tracking-wide opacity-60">Design connection</p> */}
      <p className="text-small text-400 italic"><BoldText text={persona.designConnection} /></p>
    </div>
  )
}

function PersonaCard({ persona }) {
  const prefersReducedMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(true)
  const [popoverSide, setPopoverSide] = useState("top")
  const triggerRef = useRef(null)

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 810)
    checkViewport()
    window.addEventListener("resize", checkViewport)
    return () => window.removeEventListener("resize", checkViewport)
  }, [])

  const calculatePopoverPosition = (el) => {
    if (!el) return "top"
    const rect = el.getBoundingClientRect()
    const triggerMiddle = rect.top + rect.height / 2
    return triggerMiddle < window.innerHeight / 2 ? "bottom" : "top"
  }

  const jiggle = (!prefersReducedMotion && isDesktop)
    ? {
        rotate: [0, -4, 4, -3, 3, -1.5, 1.5, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      }
    : {}

  const avatar = (
    <motion.div
      whileHover={jiggle}
      className="relative select-none w-[140px] h-[180px] sm:w-[160px] sm:h-[200px]"
      aria-hidden="true"
    >
      {persona.avatarSrc ? (
        <Image
          src={persona.avatarSrc}
          alt={persona.avatarAlt}
          fill
          className="object-contain"
        />
      ) : (
        <div className="w-full h-full rounded-2xl border border-outline-variant bg-surface-container-high flex items-center justify-center px-4">
          <span className="text-h6 text-600 text-center text-(--text-color-80)">
            {persona.avatarLabel || persona.name}
          </span>
        </div>
      )}
    </motion.div>
  )

  if (isDesktop) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <button
            type="button"
            className="cursor-pointer appearance-none border-0 bg-transparent p-0 [font:inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--schemes-primary)"
            aria-label={`Learn more about ${persona.name}`}
          >
            {avatar}
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-120" sideOffset={8}>
          <PersonaCardContent persona={persona} />
        </HoverCardContent>
      </HoverCard>
    )
  }

  return (
    <Popover
      onOpenChange={(open) => {
        if (open && triggerRef.current) {
          setPopoverSide(calculatePopoverPosition(triggerRef.current))
        }
      }}
    >
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className="cursor-pointer appearance-none border-0 bg-transparent p-0 [font:inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--schemes-primary)"
          aria-label={`Learn more about ${persona.name}`}
        >
          {avatar}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side={popoverSide}
        sideOffset={8}
        className="w-80 max-w-[calc(100vw-2rem)]"
      >
        <PersonaCardContent persona={persona} />
      </PopoverContent>
    </Popover>
  )
}

export default function CaseStudyPersonas({
  id = "personas",
  personas = PERSONAS,
  sectionHeading = "Personas",
  title = "Two people, two kinds of blocked.",
  text = <>Two things kept coming up in the research: people <strong className="text-600">couldn&apos;t find the specific details</strong> they needed, and even when they could, they <strong className="text-600">didn&apos;t trust them</strong>. These personas put a face to both of those problems, and shaped everything that came next.</>,
  hint,
  spacingClassName = "py-64",
}) {
  const groupRef = useRef(null)
  const isInView = useInView(groupRef, { once: true, margin: "0px 0px -100px 0px" })
  const [isDesktopHint, setIsDesktopHint] = useState(true)

  useEffect(() => {
    const check = () => setIsDesktopHint(window.innerWidth >= 810)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div id={id} className={`flex flex-col gutter-lg ${spacingClassName} px-4`}>
      <CaseStudyTextBlock
        sectionHeading={sectionHeading}
        title={title}
        text={text}
      />

      <div ref={groupRef} className="flex flex-col items-center gutter-xs">
        <AnimatedGroup
          preset="blur-slide"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-row gutter-base sm:gutter-lg justify-center"
        >
          {personas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </AnimatedGroup>
        <p className="text-small text-400 italic opacity-50 text-center">
          {hint || `${isDesktopHint ? "Hover" : "Tap"} to learn more`}
        </p>
      </div>
    </div>
  )
}
