"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

function readStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle({ className }) {
  // Follow OS theme changes until the visitor picks a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      if (!readStoredTheme()) applyTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    const update = () => applyTheme(next);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Cross-fade between themes where the View Transitions API is available.
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(update);
    else update();

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }

  // The icon and label are switched with CSS, so the markup is identical on server and client.
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground",
        className,
      )}
    >
      <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
