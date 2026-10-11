"use client";

import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

export function TableOfContents({ sections }) {
  const active = useActiveSection(sections.map((section) => section.id));

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">On this page</p>
      <ul className="mt-4 border-l">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-200",
                  isActive ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground",
                )}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
