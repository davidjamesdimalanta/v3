"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Global theme provider.
 *
 * Writes `data-theme="light" | "dark"` onto <html>, which is exactly what the
 * Material Theme tokens in globals.css key on ([data-theme="dark"] + the :root
 * light defaults). When `theme` is "system", next-themes resolves
 * prefers-color-scheme and writes the concrete "light"/"dark" value — so the
 * site stays fully driven by the --schemes-* token layer, and consumers like
 * useIsDarkTheme (MutationObserver on data-theme) and sonner (useTheme) react
 * automatically.
 *
 * disableTransitionOnChange prevents every themed property on the page from
 * animating at once during a swap — the flip is instant.
 */
export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
