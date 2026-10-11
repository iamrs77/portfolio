import { renderMonogram } from "@/lib/image-templates";

// Browser tab icon (64×64), drawn from the initials in data/site.js when the site is built.
export const dynamic = "force-static";

export function GET() {
  return renderMonogram(64);
}
