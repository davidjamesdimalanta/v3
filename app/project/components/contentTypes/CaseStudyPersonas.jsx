"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/app/ui/hover-card"
import { Popover, PopoverTrigger, PopoverContent } from "@/app/ui/popover"
import { cn } from "@/app/ui/lib/utils"
import CaseStudyTextBlock from "./CaseStudyTextBlock"

const PERSONAS = [
  {
    id: "access-advocate",
    name: "Access Advocate",
    avatarSrc: "/assets/images/goAble/access-advocate.svg",
    avatarAlt: "Illustration of Access Advocate — a caregiver navigating washroom access for a dependent",
    traits: [
      "Has a dependent who requires an adult-sized change table",
      "Outspoken about physical and emotional barriers to washroom access",
      "Every outing involves navigating multiple washrooms — each one a logistical decision",
    ],
    designConnection:
      "The vagueness of \"accessible\" labels directly failed caregivers like this persona — and drove the personalized onboarding filters so users can specify exact needs like adult change table availability.",
  },
  {
    id: "shy-pooper",
    name: "Shy Pooper",
    avatarSrc: "/assets/images/goAble/shy-pooper.svg",
    avatarAlt: "Illustration of Shy Pooper — a person with IBS who scouts washrooms discreetly before committing",
    traits: [
      "Lives with IBS and manages washroom anxiety privately",
      "Scouts washrooms discreetly before committing — arrival anxiety is real",
      "Won't enter if cleanliness is in doubt; smell is a dealbreaker",
    ],
    designConnection:
      "Unreliable sources and the absence of real-time cleanliness data were dealbreakers — and drove community-driven status updates and upfront amenity display.",
  },
]

function PersonaCardContent({ persona }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-600">{persona.name}</p>
      <hr className="border-[#D6CAC8]" />
      <ul className="flex flex-col gap-2">
        {persona.traits.map((trait, i) => (
          <li key={i} className="text-small text-400 flex gap-2">
            <span className="opacity-50 shrink-0">—</span>
            <span>{trait}</span>
          </li>
        ))}
      </ul>
      <hr className="border-[#D6CAC8]" />
      {/* <p className="text-tiny uppercase tracking-wide opacity-60">Design connection</p> */}
      <p className="text-small text-400 italic">{persona.designConnection}</p>
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
      className="cursor-pointer select-none w-[140px] h-[180px] sm:w-[160px] sm:h-[200px] flex items-end justify-center"
    >
      <img
        src={persona.avatarSrc}
        alt={persona.avatarAlt}
        className="w-full h-full object-contain"
      />
    </motion.div>
  )

  if (isDesktop) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer">
            {avatar}
          </div>
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
        <div ref={triggerRef} className="cursor-pointer">
          {avatar}
        </div>
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

export default function CaseStudyPersonas() {
  const groupRef = useRef(null)
  const isInView = useInView(groupRef, { once: true, margin: "0px 0px -100px 0px" })

  return (
    <div id="personas" className="flex flex-col gutter-lg py-64 px-4">
      <CaseStudyTextBlock
        sectionHeading="Personas"
        title="Two people, two kinds of blocked."
        text="Two things kept coming up in the research: people couldn't find the specific details they needed, and even when they could, they didn't trust them. These personas put a face to both of those problems, and shaped everything that came next."
      />

      <div ref={groupRef} className="flex justify-center">
        <AnimatedGroup
          preset="blur-slide"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-row gap-6 sm:gap-10 justify-center"
        >
          {PERSONAS.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </AnimatedGroup>
      </div>
    </div>
  )
}
