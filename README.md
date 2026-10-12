# Portfolio

My personal portfolio site, built with Next.js 16, React, Tailwind CSS 4 and Motion, in plain JavaScript.

Projects live in one data file, and the project list, project pages, sitemap and link-preview images are all built from it. The site can run as a normal Next.js app or be exported as static files, so it can be hosted for free on Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## Running locally

Needs Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script                 | What it does                                                       |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run dev`          | Development server with hot reload                                 |
| `npm run build`        | Production build (for Vercel, Netlify or `npm start`)              |
| `npm run build:static` | Static export to `out/` (for GitHub Pages, Cloudflare Pages, etc.) |
| `npm start`            | Serve the production build locally                                 |
| `npm run lint`         | ESLint                                                             |

## Editing content

| What                                        | Where                                                     |
| ------------------------------------------- | --------------------------------------------------------- |
| Name, email, location, links, page text     | `src/data/site.js`                                        |
| Skills                                      | `src/data/skills.js`                                      |
| Work experience                             | `src/data/experience.js`                                  |
| Projects                                    | `src/data/projects.js`                                    |
| Project categories                          | `src/data/project-categories.js`                          |
| Project images                              | `public/images/projects/<slug>/`                          |
| Resume                                      | `public/rohit-sharma-resume.pdf`, linked by `resumeUrl`   |
| Education and certifications                | `about.education` and `about.certifications` in `site.js` |
| Colours                                     | CSS variables at the top of `src/styles/globals.css`      |

- Wrapping a word in `*asterisks*` in the hero headline or a section heading shows it in the accent serif font.
- Social links support the icons `github`, `linkedin`, `x` and `mail`.
- Set `availability.available` to `false` to hide the "Open to new opportunities" badge.
- Removing `resumeUrl` hides the Resume button in the header and the download link in the contact section.
- The favicon and link-preview images are drawn from the name, initials and hero headline in `site.js`, so they update with it.

## Adding a project

1. Add an object to the array in `src/data/projects.js`.
2. Put its images in `public/images/projects/<slug>/`.

It then shows up in the project list (and on the home page if `featured: true`) and gets its own page at `/projects/<slug>/`, a sitemap entry and a link-preview image. Entries are checked when the site builds, so a missing field, duplicate slug, missing alt text or bad URL stops the build with an error message.

A minimal entry:

```js
{
  slug: "weather-cli",                 // URL: /projects/weather-cli/ (lowercase and hyphens)
  title: "Weather CLI",
  summary: "A small command-line tool that shows a 7-day forecast for any city.",
  category: "tooling",                 // a key from src/data/project-categories.js
  year: 2025,
  stack: ["Go", "OpenWeather API"],
},
```

Every optional field:

```js
{
  slug: "realtime-chat",
  title: "Realtime Chat",
  summary: "One or two sentences, shown on cards and in search results.",
  description: [                       // longer intro on the project page, one string per paragraph
    "First paragraph",
    "Second paragraph",
  ],
  category: "full-stack",
  year: 2026,
  featured: true,                      // show on the home page
  order: 1,                            // manual sort (lower first); otherwise newest year first
  draft: false,                        // drafts only show in `npm run dev`
  stack: ["Next.js", "PostgreSQL", "WebSockets"],
  highlights: [                        // the first 2 or 3 appear on cards
    "Messages delivered in under 100 ms",
    "Offline support with optimistic updates",
  ],
  tags: ["real-time", "websockets"],   // extra keywords for search engines
  cover: {
    src: "/images/projects/realtime-chat/cover.png",  // 1600×1000 works best
    alt: "Chat window with a conversation and an online-users sidebar",
  },
  links: {
    repo: "https://github.com/iamrs77/realtime-chat",
    live: "https://chat.example.com",
  },
  caseStudy: {                         // all optional; empty sections are skipped
    problem: "What problem it solves and for whom.",
    goals: ["Goal one", "Goal two"],
    role: { title: "Sole developer", contributions: ["Designed the schema", "Built the UI"] },
    architecture: [{ title: "Event-driven backend", description: "Why and how" }],
    challenges: [{ challenge: "Scaling fan-out", solution: "Used Redis pub/sub" }],
    gallery: [
      {
        src: "/images/projects/realtime-chat/architecture.png",
        alt: "Architecture diagram",
        caption: "Optional caption",
        width: 1600, height: 900,      // keeps the image's aspect ratio
      },
    ],
    outcomes: ["Used by 200 people in the first week"],
    lessons: ["What I'd do differently"],
  },
},
```

A project without a cover gets a plain text cover, one without links shows no buttons, and one without a write-up gets a short overview page.

## Folder structure

At a glance:

```text
src/data/        Your content: the only folder you edit day to day
src/app/         Pages: each folder is a URL
src/components/  Building blocks: header, home sections, project cards, buttons
src/lib/         Helpers with no UI: URLs, SEO, project loading
src/styles/      Colours, fonts and global styles
public/          Files served as-is: resume PDF, project images
```

In detail:

```text
src/
├── data/                              Content
│   ├── site.js                        Name, links, hero/about/contact text, resume link
│   ├── projects.js                    Projects (one object per project)
│   ├── project-categories.js          Allowed project categories and their labels
│   ├── skills.js                      Skills section
│   └── experience.js                  Work history
│
├── app/                               Pages and generated files (Next.js decides these names)
│   ├── layout.jsx                     Wraps every page: fonts, header, footer, theme
│   ├── not-found.jsx                  404 page
│   │
│   ├── (pages)/                       The pages people visit
│   │   ├── page.jsx                   Home page                    →  /
│   │   └── projects/
│   │       ├── page.jsx               All projects                 →  /projects/
│   │       └── [slug]/page.jsx        One project's page           →  /projects/<slug>/
│   │
│   ├── (seo)/                         Files for search engines and link previews
│   │   ├── robots.txt/                Tells search engines what they may crawl
│   │   ├── sitemap.xml/               List of every page
│   │   ├── social-preview.png/        Image shown when the site link is shared
│   │   └── projects/[slug]/social-preview.png/   Same, for each project
│   │
│   └── (icons)/
│       ├── favicon.png/               Browser tab icon
│       └── apple-touch-icon.png/      Home-screen icon on phones
│
├── components/                        Building blocks used by the pages
│   ├── layout/                        Header (with resume button), footer, navigation, theme toggle, back-to-top button, analytics
│   ├── sections/                      Home page sections: hero, about, skills, projects, experience, contact
│   ├── projects/                      Project card, grid, filters and the project page
│   ├── providers/                     App-wide setup for the animation library
│   └── ui/                            Small reusable pieces: buttons, tags, headings, social links, scroll reveal
│
├── lib/                               Helpers (no UI)
│   ├── projects.js                    Loads, checks and sorts the projects in data/projects.js
│   ├── urls.js                        Site URL and every link/path the site uses
│   ├── seo.js                         Page titles, descriptions and link-preview tags
│   ├── image-templates.jsx            Design of the generated preview images and icons
│   ├── contact-form.js                Contact form validation
│   ├── theme.js                       Light/dark theme setup
│   ├── use-active-section.js          Highlights the menu item for the section on screen
│   └── utils.js                       Small text and formatting helpers
│
├── styles/globals.css                 Colours (light and dark), fonts and global styles
└── assets/fonts/                      Fonts used to draw the generated images

public/                                Files served as-is: resume PDF, project images, certification badge
next.config.js                         Next.js settings (static export, base path)
jsconfig.json                          Lets imports use "@/..." to mean "src/..."
eslint.config.js                       Code-style checks for `npm run lint`
.github/workflows/                     Build checks and GitHub Pages deploy
```

Some names inside `src/app/` are set by Next.js and can't be changed:

- `page.jsx` is a page, `layout.jsx` wraps every page, and `not-found.jsx` is the 404 page. The last two have to sit directly in `src/app/`.
- `route.jsx` returns a file instead of a page. The folder around it is the file's name, so `(seo)/sitemap.xml/route.js` produces `/sitemap.xml`.
- A folder in parentheses, like `(pages)`, only groups files and never appears in the URL.
- A folder in square brackets, like `[slug]`, matches any value at that spot in the URL, so `projects/[slug]/page.jsx` serves every project page.

## How it works

- `lib/projects.js` checks, sorts and filters the projects once at build time, and every page reads from it.
- Pages render on the server at build time. Only interactive parts (theme toggle, mobile menu, project filters, hero diagram, contact form, scroll animations) run in the browser.
- Every page is pre-rendered, and unknown project URLs return a 404.
- The hero animation is plain CSS. Scroll animations use Motion and only move opacity and position. All animation is turned off for visitors who prefer reduced motion.
- Pages have proper landmarks, a skip link, visible focus outlines, keyboard support and readable contrast in both themes.
- Each page gets its own title, description, canonical URL and link-preview image, plus structured data, a sitemap and robots.txt.

## Deploying

| Host             | Build command          | Output | Notes                                    |
| ---------------- | ---------------------- | ------ | ---------------------------------------- |
| Vercel           | `npm run build`        | auto   | No configuration needed                  |
| Netlify          | `npm run build`        | auto   | Detects Next.js automatically            |
| Cloudflare Pages | `npm run build:static` | `out`  | Set `NODE_VERSION=24`                    |
| GitHub Pages     | included workflow      | `out`  | See below                                |

**Vercel:** push the repo to GitHub, import it at [vercel.com/new](https://vercel.com/new) and click Deploy. If the address changes (for example to a custom domain), update `url` in `src/data/site.js`.

**Netlify:** import the repo at [app.netlify.com](https://app.netlify.com/start). It runs `npm run build`.

**Cloudflare Pages:** create a project from the repo with build command `npm run build:static` and output directory `out`, and set the environment variable `NODE_VERSION=24`.

**GitHub Pages:** `.github/workflows/deploy-pages.yml` builds the static export and deploys it, with the base path set automatically for `https://<user>.github.io/<repo>/`.

1. Settings → Pages → Build and deployment → Source: choose GitHub Actions.
2. Settings → Secrets and variables → Actions → Variables: add `DEPLOY_TO_GITHUB_PAGES` = `true`.
3. Push to `main`, or run the workflow from the Actions tab.

Optional repository variables: `SITE_URL` (custom domain), `FORMSPREE_FORM_ID` (contact form) and `CLOUDFLARE_ANALYTICS_TOKEN` (visitor analytics). A separate `ci.yml` workflow runs lint and a build on every push and pull request.

## Environment variables

All optional. Copy `.env.example` to `.env.local` to set them locally.

| Variable                        | Purpose                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Overrides `url` in `site.js` for canonical links, the sitemap and preview images.            |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Turns on the contact form. Without it, the contact section lists email and social links.  |
| `NEXT_PUBLIC_BASE_PATH`         | Only for hosting under a sub-path. The GitHub Pages workflow sets it.                     |
| `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | Turns on visitor analytics (see below).                                         |

`NEXT_PUBLIC_*` values end up in the browser bundle, so they must never hold secrets.

### Contact form

Static hosting has no server to receive form posts, so the form sends messages through [Formspree](https://formspree.io) (free for 50 submissions a month), which also filters spam. The form adds its own validation, a hidden honeypot field and a minimum fill time.

1. Create a free Formspree form and copy its ID (the part after `/f/`).
2. Set `NEXT_PUBLIC_FORMSPREE_FORM_ID` in the host's environment variables (or the `FORMSPREE_FORM_ID` repository variable for GitHub Pages) and redeploy.

The form ID is public, not a secret.

### Visitor analytics

Page views are tracked with [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/), which is free, uses no cookies and works on any host. Nothing loads until a token is set.

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com) (a free account is enough) and open Analytics & Logs → Web Analytics.
2. Add the site with its domain and copy the `token` value from the JavaScript snippet Cloudflare shows.
3. Set `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` to it in the host's environment variables (or the `CLOUDFLARE_ANALYTICS_TOKEN` repository variable for GitHub Pages) and redeploy.

Visitors with ad blockers aren't counted, so treat the numbers as a minimum.

## Notes

- Static exports built on Windows with Next.js 16.4 write some link-prefetch files with the wrong path separator, so prefetching falls back to normal navigation. Pages still work, and builds on Linux (all the hosts above) aren't affected.
- Static hosts serve images as-is, so export screenshots at about 1600px wide as WebP or compressed PNG. Vercel and Netlify optimize images automatically.
- Images from other domains (absolute URLs in `cover.src`) need that domain added to `images.remotePatterns` in `next.config.js`.
- The footer year is set at build time, so any redeploy updates it.
