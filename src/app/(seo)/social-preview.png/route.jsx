import { siteConfig } from "@/data/site";
import { renderSocialImage } from "@/lib/image-templates";
import { stripEmphasis } from "@/lib/utils";

// The image shown when someone shares a link to the site (e.g. on LinkedIn), drawn when the site is built.
// The folder name ends in `.png` so the output is a real image file that every static host serves correctly.
export const dynamic = "force-static";

export function GET() {
  return renderSocialImage({
    eyebrow: siteConfig.title,
    title: stripEmphasis(siteConfig.hero.headline),
  });
}
