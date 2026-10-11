import { getAllProjects } from "@/lib/projects";
import { absoluteUrl, routes } from "@/lib/urls";

// Lists every page so search engines can find them. Built once at build time.
export const dynamic = "force-static";

function escapeXml(text) {
  return text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

export function GET() {
  const pages = [
    { path: routes.home, changeFrequency: "monthly", priority: 1 },
    { path: routes.projects, changeFrequency: "monthly", priority: 0.8 },
    ...getAllProjects().map((project) => ({
      path: routes.project(project.slug),
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];

  const entries = pages.map(
    ({ path, changeFrequency, priority }) => `  <url>
    <loc>${escapeXml(absoluteUrl(path))}</loc>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
