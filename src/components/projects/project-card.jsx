import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectLinks } from "@/components/projects/project-links";
import { TagList } from "@/components/ui/tag";
import { PROJECT_CATEGORIES } from "@/data/project-categories";
import { routes } from "@/lib/urls";
import { cn } from "@/lib/utils";

/**
 * A compact project summary card: a short image, the title, a two-line summary and the stack.
 * The highlights live on the project page. `variant="wide"` places the image beside the content and shows them.
 */
export function ProjectCard({
  project,
  variant = "default",
  headingLevel: Heading = "h3",
  showFeaturedBadge = false,
  preloadImage = false,
}) {
  const wide = variant === "wide";
  const highlights = wide ? (project.highlights?.slice(0, 3) ?? []) : [];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:border-border-strong hover:shadow-lift motion-safe:hover:-translate-y-1",
        // The whole card is clickable through the title link, so show its focus ring on the card.
        "has-[[data-card-link]:focus-visible]:outline-2 has-[[data-card-link]:focus-visible]:outline-offset-4 has-[[data-card-link]:focus-visible]:outline-accent",
        wide && "md:grid md:grid-cols-[1.25fr_1fr]",
      )}
    >
      {/* The image runs edge to edge, with a thin line under it. */}
      <ProjectCover
        project={project}
        preload={preloadImage}
        aspect="aspect-[3/1]"
        sizes={wide ? "(min-width: 1152px) 600px, (min-width: 768px) 55vw, 100vw" : "(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"}
        className={cn("rounded-none border-0 border-b", wide && "md:aspect-auto md:h-full md:min-h-80 md:border-r md:border-b-0")}
      />

      <div className="flex flex-1 flex-col">
        <div className={cn("flex flex-1 flex-col p-5", wide && "md:p-8")}>
          <p className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
            <span>
              {PROJECT_CATEGORIES[project.category]} · {project.year}
            </span>
            {showFeaturedBadge && project.featured && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">Featured</span>
            )}
          </p>

          <Heading className={cn("mt-2.5 font-medium tracking-tight", wide ? "text-2xl sm:text-[1.75rem]" : "text-lg")}>
            <Link
              href={routes.project(project.slug)}
              data-card-link=""
              className="outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']"
            >
              {project.title}
            </Link>
          </Heading>

          <p className={cn("mt-1.5 text-[15px] leading-relaxed text-muted", !wide && "line-clamp-2")}>{project.summary}</p>

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

          <div className="mt-auto pt-4">
            <TagList items={project.stack} label="Technologies" limit={wide ? 5 : 4} />
          </div>
        </div>

        {/* Links bar. Sits above the card's stretched link so the buttons stay clickable on their own. */}
        <div className={cn("relative z-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t bg-surface-muted/50 px-5 py-3", wide && "md:px-8")}>
          <ProjectLinks project={project} variant="card" />
          <Link
            href={routes.project(project.slug)}
            tabIndex={-1}
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors group-hover:text-accent"
          >
            Case study
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
