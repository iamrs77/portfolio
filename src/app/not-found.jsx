import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NotFoundHeading } from "@/components/layout/not-found-heading";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { getAllProjects } from "@/lib/projects";
import { routes } from "@/lib/urls";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  const suggestions = getAllProjects().slice(0, 3);

  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Container className="py-24 sm:py-32">
        <Eyebrow index="404">Not found</Eyebrow>
        <NotFoundHeading />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The link might be broken, or the page may have moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={routes.home} size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href={routes.projects} variant="secondary" size="lg">
            Browse all projects
          </ButtonLink>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-20 max-w-2xl">
            <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Recent projects</h2>
            <ul className="mt-4 border-t">
              {suggestions.map((project) => (
                <li key={project.slug} className="border-b">
                  <Link href={routes.project(project.slug)} className="group flex items-center justify-between gap-6 py-5">
                    <span>
                      <span className="block font-medium tracking-tight transition-colors group-hover:text-accent">
                        {project.title}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-sm text-muted">{project.summary}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}
