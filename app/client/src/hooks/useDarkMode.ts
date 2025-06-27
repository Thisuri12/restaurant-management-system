import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.theme;

    if (
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      html.classList.add("dark");
      setIsDark(true);
    } else {
      html.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return { isDark, toggleDarkMode };
}
