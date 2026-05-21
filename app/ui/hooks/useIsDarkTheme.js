"use client";

import { useEffect, useState } from "react";

function getIsDarkTheme() {
  if (typeof window === "undefined") return false;

  const root = document.documentElement;
  const theme = root.getAttribute("data-theme");

  if (theme) return theme.startsWith("dark");
  if (root.classList.contains("dark")) return true;
  if (root.classList.contains("light")) return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useIsDarkTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const updateTheme = () => setIsDarkTheme(getIsDarkTheme());
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    mediaQuery.addEventListener("change", updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
      observer.disconnect();
    };
  }, []);

  return isDarkTheme;
}
