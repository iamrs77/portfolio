import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/case-study";
import { siteConfig } from "@/data/site";
import { getAdjacentProjects, getProjectBySlug, getProjectSections, getProjectSlugs } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, routes } from "@/lib/urls";

// Only slugs from the project data exist; anything else is a 404 (required for static export).
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: routes.project(project.slug),
    type: "article",
    keywords: [...project.stack, ...(project.tags ?? [])],
    image: routes.projectSocialImage(project.slug),
  });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(routes.project(project.slug)),
    dateCreated: String(project.year),
    keywords: [...project.stack, ...(project.tags ?? [])].join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: absoluteUrl("/") },
    ...(project.links?.repo && { codeRepository: project.links.repo }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CaseStudy project={project} sections={getProjectSections(project)} previous={previous} next={next} />
    </>
  );
}
