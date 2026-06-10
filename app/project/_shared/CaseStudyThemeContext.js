"use client";

import { createContext, useContext } from "react";

/**
 * Case Study Theme Context
 *
 * Provides theme colors (bgColor, fgColor) to all CaseStudyMediaBlock components
 * within a CaseStudySection, avoiding prop drilling.
 *
 * Default colors match current gray background if no theme is provided.
 */

const CaseStudyThemeContext = createContext({
  bgColor: "var(--primary-50)",
  fgColor: "var(--primary-700)",
});

export function CaseStudyThemeProvider({ children, theme }) {
  const themeValue = {
    bgColor: theme?.bgColor || "var(--primary-50)",
    fgColor: theme?.fgColor || "var(--primary-700)",
  };

  return (
    <CaseStudyThemeContext.Provider value={themeValue}>
      {children}
    </CaseStudyThemeContext.Provider>
  );
}

export function useCaseStudyTheme() {
  return useContext(CaseStudyThemeContext);
}
