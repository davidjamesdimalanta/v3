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
  bgColor: "#F9F9F9",  // Default: current gray background
  fgColor: "#F9F9F9",  // Default: neutral gray for captions
});

export function CaseStudyThemeProvider({ children, theme }) {
  const themeValue = {
    bgColor: theme?.bgColor || "#F9F9F9",
    fgColor: theme?.fgColor || "#F9F9F9",
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
