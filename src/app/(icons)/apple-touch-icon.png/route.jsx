import { renderMonogram } from "@/lib/image-templates";

// Home-screen icon for phones (180×180), drawn from the initials in data/site.js when the site is built.
export const dynamic = "force-static";

export function GET() {
  return renderMonogram(180);
}
