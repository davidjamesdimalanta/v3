"use client";

import { CaseStudyThemeProvider } from "./CaseStudyThemeContext";

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
 *   <CaseStudyMediaBlock type="image" src="..." />
 * </CaseStudySection>
 *
 * @param {React.ReactNode} children - CaseStudyTextBlock and CaseStudyMediaBlock components
 * @param {string} title - Optional section title
 * @param {Object} theme - Optional theme object with bgColor and fgColor
 * @param {string} className - Additional custom classes
 */
export default function CaseStudySection({ children, title, theme, className = "" }) {
  return (
    <section className={`w-full bg-black/80 ${className}`}>
      <div className="mx-auto px-4 py-16 lg:py-24">
        {/* Optional section title */}
        {title && (
          <h2 className="text-h3 text-center mb-12 lg:mb-16">
            {title}
          </h2>
        )}

        {/* Case study content blocks with consistent spacing and theme context */}
        <CaseStudyThemeProvider theme={theme}>
          <div className="flex flex-col gap-12 lg:gap-16">
            {children}
          </div>
        </CaseStudyThemeProvider>
      </div>
    </section>
  );
}
