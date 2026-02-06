"use client";

import React from "react";
import { CaseStudyThemeProvider } from "./CaseStudyThemeContext";
import CaseStudyNavigation from "./CaseStudyNavigation";

/**
 * Case Study Section Wrapper Component
 *
 * A full-width shared layout wrapper for detailed case study sections that appear after ProjectLayout.
 * ProjectLayout shows high-level overview information, while CaseStudySection contains the detailed process.
 * Inspired by Daybreak Studio's layout pattern with centered text and full-width media.
 *
 * Usage:
 * <CaseStudySection title="Design Process" theme={projectData.caseStudy}>
 *   <CaseStudyTextBlock title="..." text="..." />
 *   <CaseStudyMediaBlock type="image" src="..." size="large" />
 * </CaseStudySection>
 *
 * @param {React.ReactNode} children - CaseStudyTextBlock and CaseStudyMediaBlock components
 * @param {string} title - Optional section title
 * @param {Object} theme - Optional theme object with bgColor and fgColor
 * @param {string} className - Additional custom classes
 */
export default function CaseStudySection({ children, title, theme, className = "" }) {
  // Helper function to convert heading to kebab-case ID
  const headingToId = (heading) => {
    return heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Extract sections from children that have sectionHeading prop
  const sections = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.props?.sectionHeading)
    .map((child) => ({
      id: headingToId(child.props.sectionHeading),
      heading: child.props.sectionHeading,
    }));

  // Clone children and inject IDs into CaseStudyTextBlock components
  const childrenWithIds = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props?.sectionHeading) {
      return React.cloneElement(child, {
        id: headingToId(child.props.sectionHeading),
      });
    }
    return child;
  });

  return (
    <section className={`w-full bg-black/30 ${className}`}>
      {/* Sticky navigation for section headings */}
      <CaseStudyNavigation sections={sections} />

      <div className="mx-auto px-4 md:px-8 py-16 lg:py-24">
        {/* Optional section title */}
        {title && (
          <h2 className="text-h3 text-center mb-12 lg:mb-16">
            {title}
          </h2>
        )}

        {/* Case study content blocks with consistent spacing and theme context */}
        <CaseStudyThemeProvider theme={theme}>
          <div className="flex flex-col">
            {childrenWithIds}
          </div>
        </CaseStudyThemeProvider>
      </div>
    </section>
  );
}
