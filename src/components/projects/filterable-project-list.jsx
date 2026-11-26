"use client";

import { useState } from "react";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectIndex } from "@/components/projects/project-index";

/** The full project list with category filters. */
export function FilterableProjectList({ projects, categories }) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? projects : projects.filter((project) => project.category === active);

  return (
    <div className="space-y-10">
      {categories.length > 1 && (
        <ProjectFilters categories={categories} total={projects.length} active={active} onChange={setActive} />
      )}
      <p className="sr-only" aria-live="polite">
        {`Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}`}
      </p>
      <ProjectIndex projects={visible} headingLevel="h2" />
    </div>
  );
}
