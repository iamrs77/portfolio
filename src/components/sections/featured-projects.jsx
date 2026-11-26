import { ProjectIndex } from "@/components/projects/project-index";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/data/site";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";

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
      />
      <ProjectIndex projects={projects} />
    </Section>
  );
}
