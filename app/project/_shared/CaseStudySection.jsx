"use client";

import { CaseStudyThemeProvider } from "./CaseStudyThemeContext";

export default function CaseStudySection({ children, title, theme, className = "" }) {
  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto py-16 lg:py-24">
        {title && (
          <h2 className="text-h3 text-center mb-12 lg:mb-16 text-(--text-color-100)">
            {title}
          </h2>
        )}

        <CaseStudyThemeProvider theme={theme}>
          <div className="flex flex-col gap-0 lg:gap-56">
            {children}
          </div>
        </CaseStudyThemeProvider>
      </div>
    </section>
  );
}
