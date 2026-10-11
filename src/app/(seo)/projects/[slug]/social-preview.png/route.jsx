import { PROJECT_CATEGORIES } from "@/data/project-categories";
import { renderSocialImage } from "@/lib/image-templates";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

// The image shown when someone shares a link to a project page, drawn for each project when the site is built.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function GET(_request, { params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return new Response("Not found", { status: 404 });

  return renderSocialImage({
    eyebrow: `${PROJECT_CATEGORIES[project.category]} · ${project.year}`,
    title: project.title,
    description: project.summary,
  });
}
