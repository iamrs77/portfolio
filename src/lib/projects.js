import { existsSync } from "node:fs";
import path from "node:path";
import { PROJECT_CATEGORIES } from "@/data/project-categories";
import { projects as projectData } from "@/data/projects";
import { toParagraphs } from "@/lib/utils";

/**
 * Data access for projects. Server-only: it reads the filesystem to check that images exist.
 * Pass plain project objects to Client Components as props instead of importing this module there.
 */

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isHttpUrl(value) {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

function isBlank(value) {
  return !value || value.trim().length === 0;
}

function validateImage(image, field) {
  const issues = [];
  if (isBlank(image.src)) issues.push(`${field}.src is required`);
  else if (!image.src.startsWith("/") && !isHttpUrl(image.src)) {
    issues.push(`${field}.src must start with "/" (a file in public/) or be an http(s) URL`);
  }
  if (isBlank(image.alt)) issues.push(`${field}.alt is required (describe the image for screen readers)`);
  if ((image.width === undefined) !== (image.height === undefined)) {
    issues.push(`${field} must set both width and height, or neither`);
  }
  for (const dimension of [image.width, image.height]) {
    if (dimension !== undefined && (!Number.isInteger(dimension) || dimension <= 0)) {
      issues.push(`${field} width/height must be positive integers`);
      break;
    }
  }
  return issues;
}

/** Returns a list of human-readable problems; an empty list means the data is valid. */
function validateProjects(projects) {
  const issues = [];
  const seenSlugs = new Set();
  const maxYear = new Date().getFullYear() + 1;

  projects.forEach((project, index) => {
    const label = `projects[${index}]${project.slug ? ` ("${project.slug}")` : ""}`;
    const problems = [];

    if (isBlank(project.slug)) problems.push("slug is required");
    else if (!SLUG_PATTERN.test(project.slug)) {
      problems.push(`slug "${project.slug}" must use lowercase letters, numbers and single hyphens`);
    } else if (seenSlugs.has(project.slug)) {
      problems.push(`slug "${project.slug}" is used more than once`);
    }
    seenSlugs.add(project.slug);

    if (isBlank(project.title)) problems.push("title is required");
    if (isBlank(project.summary)) problems.push("summary is required");
    if (!(project.category in PROJECT_CATEGORIES)) {
      problems.push(`category "${project.category}" must be one of: ${Object.keys(PROJECT_CATEGORIES).join(", ")}`);
    }
    if (!Number.isInteger(project.year) || project.year < 1990 || project.year > maxYear) {
      problems.push(`year must be a whole number between 1990 and ${maxYear}`);
    }
    if (!project.stack?.length) problems.push("stack must list at least one technology");
    else if (project.stack.some(isBlank)) problems.push("stack contains an empty entry");
    if (project.order !== undefined && !Number.isFinite(project.order)) problems.push("order must be a number");

    for (const [key, url] of Object.entries(project.links ?? {})) {
      if (url !== undefined && !isHttpUrl(url)) problems.push(`links.${key} must be a full http(s) URL`);
    }

    if (project.cover) problems.push(...validateImage(project.cover, "cover"));
    project.caseStudy?.gallery?.forEach((image, i) => {
      problems.push(...validateImage(image, `caseStudy.gallery[${i}]`));
    });
    project.caseStudy?.challenges?.forEach((item, i) => {
      if (isBlank(item.challenge)) problems.push(`caseStudy.challenges[${i}].challenge is required`);
    });

    issues.push(...problems.map((problem) => `${label}: ${problem}`));
  });

  return issues;
}

function compareProjects(a, b) {
  const orderA = a.order ?? Number.POSITIVE_INFINITY;
  const orderB = b.order ?? Number.POSITIVE_INFINITY;
  if (orderA !== orderB) return orderA - orderB;
  if (a.year !== b.year) return b.year - a.year;
  return a.title.localeCompare(b.title);
}

function isPublished(project) {
  return !project.draft || process.env.NODE_ENV === "development";
}

function localImageExists(src) {
  if (!src.startsWith("/")) return true;
  return existsSync(path.join(process.cwd(), "public", decodeURIComponent(src)));
}

/** Drops references to local images that don't exist so the UI can fall back gracefully. */
function withExistingImages(project) {
  const keep = (image) => {
    if (localImageExists(image.src)) return true;
    console.warn(`[projects] "${project.slug}": image not found at public${image.src}; using a fallback.`);
    return false;
  };

  const cover = project.cover && keep(project.cover) ? project.cover : undefined;
  const gallery = project.caseStudy?.gallery?.filter(keep);
  return {
    ...project,
    cover,
    caseStudy: project.caseStudy && { ...project.caseStudy, gallery },
  };
}

function prepareProjects(projects) {
  const issues = validateProjects(projects);
  if (issues.length > 0) {
    throw new Error(`Invalid project data in src/data/projects.js:\n  - ${issues.join("\n  - ")}`);
  }
  return projects.filter(isPublished).map(withExistingImages).sort(compareProjects);
}

const allProjects = prepareProjects(projectData);

export function getAllProjects() {
  return allProjects;
}

export function getFeaturedProjects(limit) {
  const featured = allProjects.filter((project) => project.featured);
  return limit === undefined ? featured : featured.slice(0, limit);
}

export function getProjectBySlug(slug) {
  return allProjects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return allProjects.map((project) => project.slug);
}

export function getAdjacentProjects(slug) {
  const index = allProjects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return { previous: allProjects[index - 1], next: allProjects[index + 1] };
}

/** Categories that have at least one project, in the order defined by `PROJECT_CATEGORIES`. */
export function getProjectCategories(projects) {
  return Object.keys(PROJECT_CATEGORIES)
    .map((id) => ({
      id,
      label: PROJECT_CATEGORIES[id],
      count: projects.filter((project) => project.category === id).length,
    }))
    .filter((category) => category.count > 0);
}

/** The detail-page sections that have content, in display order. Drives both the page and its table of contents. */
export function getProjectSections(project) {
  const study = project.caseStudy ?? {};
  const candidates = [
    ["overview", "Overview", toParagraphs(project.description).length > 0 || Boolean(project.highlights?.length)],
    ["problem", "The problem", toParagraphs(study.problem).length > 0],
    ["goals", "Goals", Boolean(study.goals?.length)],
    ["role", "My role", Boolean(study.role)],
    ["architecture", "Architecture & decisions", Boolean(study.architecture?.length)],
    ["challenges", "Challenges & solutions", Boolean(study.challenges?.length)],
    ["gallery", "Screenshots & diagrams", Boolean(study.gallery?.length)],
    ["outcomes", "Outcomes", Boolean(study.outcomes?.length)],
    ["lessons", "Lessons learned", Boolean(study.lessons?.length)],
  ];
  return candidates.filter(([, , hasContent]) => hasContent).map(([id, title]) => ({ id, title }));
}
