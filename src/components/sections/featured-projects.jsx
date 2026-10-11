import { ArrowRight } from "lucide-react";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/data/site";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";
import { routes } from "@/lib/urls";

export function FeaturedProjects() {
  const all = getAllProjects();
  const featured = getFeaturedProjects();
  // Fall back to the most recent projects if none are marked as featured.
  const projects = featured.length > 0 ? featured : all.slice(0, 3);
  if (projects.length === 0) return null;

  const copy = siteConfig.sections.projects;

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        index="03"
        eyebrow="Projects"
        title={copy.heading}
        description={copy.description}
        action={
          <ButtonLink href={routes.projects} variant="secondary">
            All projects
            <span className="font-mono text-xs text-muted">{all.length}</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
          </ButtonLink>
        }
      />
      <ProjectGrid projects={projects} spotlightFirst />
    </Section>
  );
}
