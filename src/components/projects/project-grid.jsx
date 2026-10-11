import { ProjectCard } from "@/components/projects/project-card";
import { RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

/** `spotlightFirst` gives the first project a full-width card when that keeps the grid balanced. */
export function ProjectGrid({ projects, spotlightFirst = false, headingLevel, showFeaturedBadge }) {
  // With an odd count, a full-width first card leaves the two-column rows below it complete.
  const spotlight = spotlightFirst && projects.length % 2 === 1;

  return (
    <RevealGroup as="ul" className="grid gap-5 sm:gap-6 md:grid-cols-2">
      {projects.map((project, index) => {
        const isSpotlight = spotlight && index === 0;
        return (
          <RevealItem as="li" key={project.slug} className={cn(isSpotlight && "md:col-span-2")}>
            <ProjectCard
              project={project}
              variant={isSpotlight ? "wide" : "default"}
              headingLevel={headingLevel}
              showFeaturedBadge={showFeaturedBadge}
              preloadImage={index === 0}
            />
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
