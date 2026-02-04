"use client";

import { useState, useEffect } from "react";

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

  useEffect(() => {
    // Don't run if no sections
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      // Create hysteresis: sections must enter upper-middle 35% of viewport to become active
      // This prevents rapid switching when sections are near boundaries
      rootMargin: "-20% 0px -45% 0px",
      // Use only 5 thresholds instead of 101 to reduce callback frequency by 95%
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
    };

    const observerCallback = (entries) => {
      // Filter only intersecting entries (visible in viewport)
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);

      if (intersectingEntries.length === 0) return;

      // Find the section with highest intersectionRatio (most visible in active zone)
      let mostVisible = intersectingEntries[0];
      intersectingEntries.forEach((entry) => {
        if (entry.intersectionRatio > mostVisible.intersectionRatio) {
          mostVisible = entry;
        }
      });

      const newSection = mostVisible.target.id;

      // Only update if different from current (prevents unnecessary re-renders)
      if (newSection !== activeSection) {
        setActiveSection(newSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const handleNavigationClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Don't render if no sections
  if (sections.length === 0) return null;

  return (
    <nav className="sticky top-0 z-60 w-full bg-black/95 backdrop-blur-md border-b border-white/10 hidden lg:block">
      <div className="mx-auto px-4 md:px-8 py-4">
        <ul className="flex flex-wrap justify-center items-center gap-6">
          {sections.map(({ id, heading }) => (
            <li key={id}>
              <button
                onClick={() => handleNavigationClick(id)}
                className={`
                  text-button uppercase tracking-wider
                  transition-all duration-300 ease-in-out
                  hover:opacity-100 cursor-pointer
                  ${
                    activeSection === id
                      ? "text-gradient-blue opacity-100 scale-105"
                      : "text-white/60 hover:text-white/80"
                  }
                `}
              >
                {heading}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
