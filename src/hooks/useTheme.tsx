"use client";

import { useEffect, useState } from "react";

type ThemeType = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>("system");

  useEffect(() => {
    if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark").matches) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add("light");
      }
    } else {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}
