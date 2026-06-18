"use client";

import { useState, useEffect } from "react";
import { useLenis } from "../../ui/hooks/useLenis";

/**
 * Case Study Navigation Component
 *
 * A horizontal sticky navigation bar that provides wayfinding for case study sections.
 * Highlights the most visible section in the upper-middle viewport zone and supports smooth scrolling.
 * Optimized for Lenis smooth scrolling with reduced thresholds and rootMargin hysteresis.
 *
 * Usage:
 * <CaseStudyNavigation sections={[{ id: "tldr", heading: "TL;DR" }, ...]} />
 *
 * @param {Array} sections - Array of section objects with { id, heading }
 */
export default function CaseStudyNavigation({ sections = [] }) {
  const [activeSection, setActiveSection] = useState(null);
  const lenis = useLenis();

  useEffect(() => {
    if (sections.length === 0) return;

    let rafId = null;

    const determineActiveSection = () => {
      const activeZoneTop = window.innerHeight * 0.20;
      const activeZoneBottom = window.innerHeight * 0.55;
      const activeZoneCenter = (activeZoneTop + activeZoneBottom) / 2;

      let bestSection = null;
      let minDistance = Infinity;

      sections.forEach(({ id }) => {
        // Check for an explicit data-id marker first, fallback to the main container id
        const element = document.querySelector(`[data-id="${id}"]`) || document.getElementById(id);
        
        if (!element) return;

        const rect = element.getBoundingClientRect();
        
        // Calculate how much the element overlaps with the active zone
        const overlapTop = Math.max(rect.top, activeZoneTop);
        const overlapBottom = Math.min(rect.bottom, activeZoneBottom);
        const overlap = Math.max(0, overlapBottom - overlapTop);
        
        if (overlap > 0) {
          // If the element is intersecting the active zone, find its distance to the center
          // We prioritize elements whose center is closest to the active zone center
          const elementCenter = rect.top + (rect.height / 2);
          const distance = Math.abs(elementCenter - activeZoneCenter);
          
          // Give a priority boost to elements that occupy a large portion of the zone
          // or are fully contained within it
          const adjustedDistance = distance - (overlap * 2);

          if (adjustedDistance < minDistance) {
            minDistance = adjustedDistance;
            bestSection = id;
          }
        }
      });

      if (bestSection && bestSection !== activeSection) {
        setActiveSection(bestSection);
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        determineActiveSection();
      });
    };

    // Initial check
    determineActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [sections, activeSection]);

  const handleNavigationClick = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element && lenis) {
      // Use Lenis for smooth scrolling with custom easing
      // Negative offset accounts for sticky nav height (~72px) + extra spacing (~40px)
      lenis.scrollTo(element, {
        offset: -112,
        duration: 1.2,
      });
    } else if (element) {
      // Fallback to native scroll if Lenis isn't available
      // Calculate offset for native scroll
      const navHeight = 72; // Approximate nav height
      const extraSpace = 40; // Extra breathing room
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight - extraSpace;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Don't render if no sections
  if (sections.length === 0) return null;

  return (
    <nav aria-label="Case study sections" className="sticky top-0 z-60 hidden w-full border-b border-(--schemes-outline-variant) px-4 py-4 md:px-5 lg:block" style={{ backgroundColor: 'color-mix(in oklch, var(--schemes-surface) 72%, transparent)', backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }}>
      <div className="mx-auto w-full max-w-[1200px]">
        <ul className="flex w-full items-center justify-between">
          {sections.map(({ id, heading }) => (
            <li key={id} className="w-hug">
              <a
                href={`#${id}`}
                onClick={(event) => handleNavigationClick(event, id)}
                aria-current={activeSection === id ? "location" : undefined}
                className={`
                  inline-flex w-hug whitespace-nowrap
                  text-button uppercase tracking-wider
                  transition-all duration-300 ease-in-out
                  hover:bd-text cursor-pointer
                  ${
                    activeSection === id
                      ? "text-700 opacity-100 scale-105"
                      : "text-(--text-color)"
                  }
                `}
              >
                {heading}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
