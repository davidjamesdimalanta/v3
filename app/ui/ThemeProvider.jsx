"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Global theme provider.
 *
 * Defaults to `system`, so first-time visitors follow prefers-color-scheme.
 * Once a visitor clicks the toggle, next-themes stores that manual choice and
 * writes the resolved `data-theme="light" | "dark"` onto <html>. The custom
 * storage key keeps older `theme` and `portfolio-theme` values from pinning the
 * site away from the system default.
 *
 * disableTransitionOnChange prevents every themed property on the page from
 * animating at once during a swap — the flip is instant.
 */
export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      storageKey="portfolio-theme-preference"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
