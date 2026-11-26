import Link from "next/link";
import { ProjectIllustration } from "@/components/projects/project-illustrations";
import { ProjectLinks } from "@/components/projects/project-links";
import { PROJECT_CATEGORIES } from "@/data/project-categories";
import { routes } from "@/lib/urls";

/**
 * The projects as an editorial index: one numbered card each, with a big serif title, a one-line summary
 * and the stack, links to the code and the live site, a bar in the project's own colour (`accent`) down
 * its left edge, and a small drawing of the project (project-illustrations.jsx) in that colour.
 */
export function ProjectIndex({ projects, headingLevel = "h3" }) {
  return (
    <ol className="space-y-4">
      {projects.map((project, index) => (
        <IndexCard key={project.slug} project={project} number={index + 1} headingLevel={headingLevel} />
      ))}
    </ol>
  );
}

function IndexCard({ project, number, headingLevel: Heading }) {
  const category = PROJECT_CATEGORIES[project.category];

  return (
    <li
      className="group/row relative overflow-hidden rounded-2xl border bg-surface shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:border-(--project)/40 hover:shadow-lift motion-safe:hover:-translate-y-0.5 has-[[data-row-link]:focus-visible]:outline-2 has-[[data-row-link]:focus-visible]:outline-offset-2 has-[[data-row-link]:focus-visible]:outline-accent"
      style={{ "--project": project.accent ?? "var(--accent)" }}
    >
      {/* a soft fill in the project's colour that sweeps in from the left on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-(--project)/5 transition-transform duration-500 ease-out-expo group-hover/row:scale-x-100"
      />
      {/* the project's colour, down the left edge; it grows to full height on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-center scale-y-50 bg-(--project) transition-transform duration-500 ease-out-expo group-hover/row:scale-y-100"
      />

      <div className="relative grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-4 px-5 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-x-6 sm:px-8 sm:py-8">
        <span className="self-start font-serif text-2xl leading-none text-muted italic transition-colors duration-300 group-hover/row:text-(--project) sm:text-4xl">
          {String(number).padStart(2, "0")}
        </span>

        {/*
         * Slides with padding, not a transform: a transform would make this column the box the title's
         * stretched link fills, and the rest of the card would stop opening the case study.
         */}
        <div className="min-w-0 transition-[padding] duration-500 ease-out-expo motion-safe:group-hover/row:pl-1.5">
          <p className="font-mono text-[11px] tracking-wider text-muted uppercase">
            {category} · {project.year}
          </p>
          <Heading className="mt-1.5 font-serif text-3xl leading-[1.05] tracking-tight sm:text-[2.75rem]">
            <Link
              href={routes.project(project.slug)}
              data-row-link=""
              className="outline-none after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </Heading>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted sm:line-clamp-1 sm:text-[15px]">
            {project.summary}
          </p>
          <p className="mt-3 hidden truncate font-mono text-xs text-muted/80 sm:block">
            <span className="sr-only">Built with: </span>
            {project.stack.slice(0, 5).join(" · ")}
          </p>
          {/* Above the card's stretched link, so these stay clickable on their own. */}
          <ProjectLinks project={project} variant="icon" className="relative z-10 mt-4" />
        </div>

        {/* a fine-line glimpse of the project, on a dotted tile with a glow of its colour */}
        <div
          aria-hidden="true"
          className="ill-tile h-[72px] w-[116px] shrink-0 overflow-hidden rounded-xl border transition-transform duration-500 ease-out-expo sm:h-[150px] sm:w-60 motion-safe:group-hover/row:scale-[1.02]"
        >
          <ProjectIllustration slug={project.slug} className="size-full" />
        </div>
      </div>
    </li>
  );
}
