import Image from "next/image";
import { PROJECT_CATEGORIES } from "@/data/project-categories";
import { assetPath } from "@/lib/urls";
import { cn } from "@/lib/utils";

/**
 * The project image, or a generated typographic cover when the project has none.
 * `sizes` is the responsive hint that lets the browser download an appropriately sized image.
 */
export function ProjectCover({ project, sizes, preload = false, className }) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-xl border bg-surface-muted", className)}>
      {project.cover ? (
        <Image
          src={assetPath(project.cover.src)}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-[1.03]"
        />
      ) : (
        <CoverFallback title={project.title} category={PROJECT_CATEGORIES[project.category]} />
      )}
    </div>
  );
}

function CoverFallback({ title, category }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="absolute -right-14 -bottom-14 size-56 rounded-full border border-accent/25 transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-110" />
      <span className="absolute -right-2 -bottom-2 size-28 rounded-full border border-accent/20" />
      <span className="relative font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{category}</span>
      <span className="relative max-w-[80%] font-serif text-3xl leading-[1.05] italic sm:text-4xl">{title}</span>
    </div>
  );
}
