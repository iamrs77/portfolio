import { absoluteUrl } from "@/lib/urls";

// Tells search engines they may crawl the whole site, and where to find the sitemap. Built once at build time.
export const dynamic = "force-static";

export function GET() {
  const body = ["User-Agent: *", "Allow: /", "", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, ""].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
