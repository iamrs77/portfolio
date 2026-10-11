import { siteConfig } from "@/data/site";
import { absoluteUrl, routes } from "@/lib/urls";

/**
 * Consistent title, description, canonical URL and social metadata for a page.
 * - `title`: the root layout appends the site name. Omit it for the home page.
 * - `path`: site path such as `/projects/`, used for the canonical URL.
 * - `type`: "website" or "article".
 * - `image`: site path of the 1200×630 social preview image.
 */
export function pageMetadata({
  title,
  description = siteConfig.description,
  path,
  type = "website",
  keywords,
  image = routes.socialImage,
}) {
  const url = absoluteUrl(path);
  const socialTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.title}`;
  const socialImage = { url: absoluteUrl(image), width: 1200, height: 630, alt: socialTitle, type: "image/png" };

  return {
    ...(title && { title }),
    description,
    ...(keywords && { keywords: [...keywords] }),
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
