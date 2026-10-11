import { siteConfig } from "@/data/site";

/**
 * The public origin (plus base path, if any) of the deployed site, without a trailing slash.
 * Priority: NEXT_PUBLIC_SITE_URL -> Vercel / Netlify production URL -> `siteConfig.url`.
 */
export function getSiteUrl() {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const netlifyUrl = process.env.NETLIFY === "true" ? process.env.URL : undefined;
  const url =
    process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : netlifyUrl) || siteConfig.url;
  return url.replace(/\/+$/, "");
}

/** Absolute URL for a site path, e.g. `absoluteUrl("/projects/foo/")`. */
export function absoluteUrl(path = "/") {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Prefixes local asset paths with the configured base path (needed for GitHub Pages project sites). */
export function assetPath(src) {
  if (!src.startsWith("/")) return src;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  return `${basePath}${src}`;
}

export const routes = {
  home: "/",
  projects: "/projects/",
  project: (slug) => `/projects/${slug}/`,
  section: (id) => `/#${id}`,
  socialImage: "/social-preview.png",
  projectSocialImage: (slug) => `/projects/${slug}/social-preview.png`,
  icon: "/favicon.png",
  appleIcon: "/apple-touch-icon.png",
};
