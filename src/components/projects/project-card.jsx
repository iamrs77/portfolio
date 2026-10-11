import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectLinks } from "@/components/projects/project-links";
import { TagList } from "@/components/ui/tag";
import { PROJECT_CATEGORIES } from "@/data/project-categories";
import { routes } from "@/lib/urls";
import { cn } from "@/lib/utils";

/** A project summary card. `variant="wide"` places the image beside the content on tablets and up. */
export function ProjectCard({
  project,
  variant = "default",
  headingLevel: Heading = "h3",
  showFeaturedBadge = false,
  preloadImage = false,
}) {
  const wide = variant === "wide";
  const highlights = project.highlights?.slice(0, wide ? 3 : 2) ?? [];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-surface p-2 shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:border-border-strong hover:shadow-lift motion-safe:hover:-translate-y-1",
        // The whole card is clickable through the title link, so show its focus ring on the card.
        "has-[[data-card-link]:focus-visible]:outline-2 has-[[data-card-link]:focus-visible]:outline-offset-4 has-[[data-card-link]:focus-visible]:outline-accent",
        wide && "md:grid md:grid-cols-[1.25fr_1fr]",
      )}
    >
      <ProjectCover
        project={project}
        preload={preloadImage}
        sizes={wide ? "(min-width: 1152px) 600px, (min-width: 768px) 55vw, 100vw" : "(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"}
        className={cn(wide && "md:aspect-auto md:h-full md:min-h-80")}
      />

      <div className={cn("flex flex-1 flex-col p-4 sm:p-5", wide && "md:p-8")}>
        <p className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
          <span>
            {PROJECT_CATEGORIES[project.category]} · {project.year}
          </span>
          {showFeaturedBadge && project.featured && <span className="text-accent">Featured</span>}
        </p>

        <Heading className={cn("mt-3 font-medium tracking-tight", wide ? "text-2xl sm:text-[1.75rem]" : "text-xl")}>
          <Link
            href={routes.project(project.slug)}
            data-card-link=""
            className="outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          >
            {project.title}
          </Link>
          <ArrowUpRight
            aria-hidden="true"
            className="ml-1.5 inline size-5 -translate-y-px text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
          />
        </Heading>

        <p className="mt-2.5 leading-relaxed text-muted">{project.summary}</p>

        {highlights.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <TagList items={project.stack} label="Technologies" limit={wide ? 5 : 4} />
          {/* Sits above the card's stretched link so these stay independently clickable. */}
          <ProjectLinks project={project} variant="icon" className="relative z-10" />
        </div>
      </div>
    </article>
  );
}
