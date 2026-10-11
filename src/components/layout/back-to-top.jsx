"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Floating button in the bottom-right corner. Shows up once the visitor has scrolled past the first screen.
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    // Smooth or instant scrolling comes from the `scroll-behavior` rule in globals.css (off for reduced motion).
    window.scrollTo({ top: 0 });
    // Keyboard users continue from the top of the page instead of a button that just disappeared.
    document.querySelector("header a")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed right-5 bottom-5 z-30 grid size-11 place-items-center rounded-full border bg-surface/90 text-foreground shadow-lift backdrop-blur-sm transition-[opacity,transform,visibility,border-color] duration-300 hover:border-border-strong sm:right-8 sm:bottom-8",
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
      )}
    >
      <ArrowUp aria-hidden="true" className="size-[18px]" />
    </button>
  );
}
