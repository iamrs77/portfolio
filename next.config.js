/**
 * Two build modes, so the same code deploys to any free host:
 *
 * - Default (`npm run build`): a regular Next.js build. Use it on Vercel or
 *   Netlify, where you also get on-demand image optimization.
 * - Static export (`npm run build:static`): plain HTML/CSS/JS in `out/` for
 *   GitHub Pages, Cloudflare Pages or any static file host.
 *
 * NEXT_PUBLIC_BASE_PATH is only needed when the site lives in a sub-path,
 * e.g. https://<user>.github.io/<repo>. The GitHub Pages workflow sets it.
 */
// `npm run build:static` is detected by script name, so it works the same in every shell (including Windows).
const isStaticExport =
  process.env.STATIC_EXPORT === "true" || process.env.npm_lifecycle_event === "build:static";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath,
  // `/projects/foo/` -> `projects/foo/index.html`, which every static host serves correctly.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Static hosts have no image optimization server; images are served as-is.
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
