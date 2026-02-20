import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = (localStorage.getItem("theme") as ThemeMode | null) || null;
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme; // <html data-theme="dark">
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, setTheme, toggleTheme };
}