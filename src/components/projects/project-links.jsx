import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/button";
import { TipLabel } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * Repository and live links.
 * `variant="card"`: small labelled buttons for project cards. `"icon"`: icon-only buttons.
 * `"button"`: large labelled buttons for the detail page.
 */
export function ProjectLinks({ project, variant = "button", className }) {
  const { live, repo } = project.links ?? {};
  if (!live && !repo) return null;

  if (variant === "card") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {live && (
          <ButtonLink href={live} size="sm">
            Live demo
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
            />
            <span className="sr-only">: {project.title} (opens in a new tab)</span>
          </ButtonLink>
        )}
        {repo && (
          <ButtonLink href={repo} size="sm" variant={live ? "secondary" : "primary"}>
            <FaGithub aria-hidden="true" className="size-3.5" />
            GitHub
            <span className="sr-only">: {project.title} source code (opens in a new tab)</span>
          </ButtonLink>
        )}
      </div>
    );
  }

  if (variant === "icon") {
    const iconLink =
      "group/tip relative grid size-9 place-items-center rounded-full border bg-surface text-muted transition-colors hover:border-border-strong hover:text-foreground";
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        {repo && (
          <a href={repo} target="_blank" rel="noopener noreferrer" className={iconLink}>
            <FaGithub aria-hidden="true" className="size-4" />
            <span className="sr-only">{project.title} source code (opens in a new tab)</span>
            <TipLabel>View the code on GitHub</TipLabel>
          </a>
        )}
        {live && (
          <a href={live} target="_blank" rel="noopener noreferrer" className={iconLink}>
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">{project.title} live demo (opens in a new tab)</span>
            <TipLabel>Open the live demo</TipLabel>
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {live && (
        <ButtonLink href={live} size="lg">
          Live demo
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </ButtonLink>
      )}
      {repo && (
        <ButtonLink href={repo} size="lg" variant={live ? "secondary" : "primary"}>
          <FaGithub aria-hidden="true" className="size-4" />
          Source code
          <span className="sr-only">(opens in a new tab)</span>
        </ButtonLink>
      )}
    </div>
  );
}
