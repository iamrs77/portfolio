import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { renderProjectSection } from "@/components/projects/case-study-sections";
import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectLinks } from "@/components/projects/project-links";
import { TableOfContents } from "@/components/projects/table-of-contents";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/scroll-reveal";
import { TagList } from "@/components/ui/tag";
import { PROJECT_CATEGORIES } from "@/data/project-categories";
import { routes } from "@/lib/urls";
import { cn, displayUrl } from "@/lib/utils";

const delay = (ms) => ({ "--enter-delay": `${ms}ms` });

export function CaseStudy({ project, sections, previous, next }) {
  return (
    <article>
      <header className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <Container className="pt-10 pb-12 sm:pt-14 sm:pb-16">
          <Link
            href={routes.projects}
            className="group inline-flex items-center gap-2 rounded-full text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            All projects
          </Link>

          <p className="enter mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs tracking-[0.16em] text-muted uppercase">
            <span>{PROJECT_CATEGORIES[project.category]}</span>
            <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
            <span>{project.year}</span>
            {project.featured && (
              <>
                <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
                <span className="text-accent">Featured</span>
              </>
            )}
          </p>
          <h1
            className="enter mt-5 max-w-4xl text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.03] font-medium tracking-[-0.045em]"
            style={delay(80)}
          >
            {project.title}
          </h1>
          <p className="enter mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" style={delay(160)}>
            {project.summary}
          </p>
          <div className="enter" style={delay(240)}>
            <ProjectLinks project={project} className="mt-9" />
          </div>
        </Container>
      </header>

      {project.cover && (
        <Container className="enter" style={delay(320)}>
          <ProjectCover project={project} preload sizes="(min-width: 1152px) 1088px, 100vw" className="rounded-2xl shadow-lift" />
        </Container>
      )}

      <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="space-y-12 lg:sticky lg:top-24">
            <ProjectFacts project={project} />
            {sections.length > 1 && (
              <div className="hidden lg:block">
                <TableOfContents sections={sections} />
              </div>
            )}
          </div>
        </aside>

        <div className="min-w-0 space-y-20 lg:col-span-8 xl:col-span-9">
          {sections.length === 0 && (
            <p className="text-lg leading-relaxed text-muted">A detailed case study for this project is coming soon.</p>
          )}
          {sections.map((section, index) => (
            <Reveal key={section.id}>
              <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24">
                <p aria-hidden="true" className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${section.id}-title`} className="mt-2 text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-7">{renderProjectSection(section.id, project)}</div>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>

      <ProjectPager previous={previous} next={next} />
    </article>
  );
}

function ProjectFacts({ project }) {
  const links = [
    project.links?.live && { label: "Live demo", href: project.links.live },
    project.links?.repo && { label: "Source", href: project.links.repo },
  ].filter((link) => Boolean(link));

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl border bg-surface p-6 lg:grid-cols-1 lg:border-0 lg:bg-transparent lg:p-0">
      {project.caseStudy?.role && <Fact label="Role">{project.caseStudy.role.title}</Fact>}
      <Fact label="Year">{project.year}</Fact>
      <Fact label="Category">{PROJECT_CATEGORIES[project.category]}</Fact>
      <Fact label="Stack" className="col-span-2 lg:col-span-1">
        <div className="pt-1">
          <TagList items={project.stack} label={`${project.title} technologies`} />
        </div>
      </Fact>
      {links.length > 0 && (
        <Fact label="Links" className="col-span-2 lg:col-span-1">
          <ul className="space-y-1.5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {displayUrl(link.href)}
                </a>
                <span className="sr-only"> ({link.label}, opens in a new tab)</span>
              </li>
            ))}
          </ul>
        </Fact>
      )}
    </dl>
  );
}

function Fact({ label, className, children }) {
  return (
    <div className={className}>
      <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{label}</dt>
      <dd className="mt-2 text-[0.9375rem]">{children}</dd>
    </div>
  );
}

function ProjectPager({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="More projects" className="border-t">
      <Container className="grid sm:grid-cols-2">
        {previous ? <PagerLink project={previous} direction="previous" /> : <span aria-hidden="true" />}
        {next && <PagerLink project={next} direction="next" />}
      </Container>
    </nav>
  );
}

function PagerLink({ project, direction }) {
  const isNext = direction === "next";
  return (
    <Link
      href={routes.project(project.slug)}
      className={cn(
        "group block py-10 sm:py-14",
        isNext ? "border-t sm:border-t-0 sm:border-l sm:pl-10 sm:text-right" : "sm:pr-10",
      )}
    >
      <span className={cn("flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-muted uppercase", isNext && "sm:justify-end")}>
        {!isNext && <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-0.5" />}
        {isNext ? "Next project" : "Previous project"}
        {isNext && <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="mt-3 block text-xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
        {project.title}
      </span>
    </Link>
  );
}
