"use client";

import { CaseStudyThemeProvider } from "./CaseStudyThemeContext";

export default function CaseStudySection({ children, title, theme, className = "" }) {
  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto pb-16 lg:pb-24">
        {title && (
          <h2 className="text-h3 text-center mb-12 lg:mb-16 text-(--text-color-100)">
            {title}
          </h2>
        )}

        <CaseStudyThemeProvider theme={theme}>
          <div className="flex flex-col gutter-lg lg:gutter-xl">
            {children}
          </div>
        </CaseStudyThemeProvider>
      </div>
    </section>
  );
}
