import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FilterableProjectList } from "@/components/projects/filterable-project-list";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/urls";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Projects I've built, with notes on how they were made.",
  path: routes.projects,
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getProjectCategories(projects);

  return (
    <>
      <header className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <Container className="pt-10 pb-14 sm:pt-14 sm:pb-20">
          <Link
            href={routes.home}
            className="group inline-flex items-center gap-2 rounded-full text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Home
          </Link>
          <Eyebrow className="enter mt-10">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </Eyebrow>
          <h1 className="enter mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] font-medium tracking-[-0.045em]">
            Projects
          </h1>
          <p className="enter mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Things I&apos;ve built, with notes on how and why.
          </p>
        </Container>
      </header>

      <Container className="pb-24 sm:pb-32">
        {projects.length > 0 ? (
          <FilterableProjectList projects={projects} categories={categories} />
        ) : (
          <p className="text-muted">New projects are on their way. Check back soon.</p>
        )}
      </Container>
    </>
  );
}
