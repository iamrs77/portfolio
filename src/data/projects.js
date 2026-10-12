/**
 * Every project shown on the site.
 *
 * Required fields: slug, title, summary, category (a key from project-categories.js), year and stack.
 * The README lists the optional ones. Images go in public/images/projects/<slug>/.
 * Mistakes like a duplicate slug or missing alt text stop the build with an error.
 */
export const projects = [
  {
    slug: "developer-portfolio",
    title: "Portfolio Website",
    summary:
      "This site. Each project is one entry in a data file, and the pages, cards and link previews are built from it.",
    description: [
      "Built with Next.js, React, Tailwind CSS and Motion. Projects live in one data file, and the project list, the project pages, the sitemap and the link-preview images are all built from it.",
      "It can run as a normal Next.js app or be exported as static files, so it can be hosted for free on Vercel, Netlify, Cloudflare Pages or GitHub Pages.",
    ],
    category: "frontend",
    year: 2026,
    featured: true,
    order: 1,
    stack: ["Next.js", "React", "JavaScript", "Tailwind CSS", "Motion"],
    highlights: [
      "Adding a project means adding one entry to a data file",
      "Exports to plain static files for free hosting",
      "Light and dark themes, and animations that respect reduced-motion settings",
    ],
    tags: ["nextjs", "static-site", "accessibility"],
    cover: {
      src: "/images/projects/developer-portfolio/cover.svg",
      alt: "Preview of the portfolio home page with the hero headline and an animated system diagram",
    },
    links: {
      repo: "https://github.com/iamrs77/portfolio",
    },
    caseStudy: {
      problem:
        "I wanted a portfolio that's easy to keep up to date. With hand-written pages, every new project means copying markup and updating several places, so the site goes stale.",
      goals: [
        "Add a project by editing one data file",
        "Keep it fast, with very little JavaScript",
        "Host it for free, without being tied to one provider",
        "Work well with a keyboard and screen readers",
      ],
      architecture: [
        {
          title: "One data file",
          description:
            "Projects are plain objects in src/data/projects.js. A small helper checks and sorts them when the site builds, and every page reads from it.",
        },
        {
          title: "Static by default",
          description:
            "Every page is rendered at build time. Only the interactive parts, like the theme toggle, the menu and the project filters, run in the browser.",
        },
      ],
      challenges: [
        {
          challenge: "Projects with missing details",
          solution:
            "Every write-up field is optional. A project page only shows the sections that have content, and the table of contents follows.",
        },
        {
          challenge: "Hosting anywhere",
          solution:
            "One setting switches between a normal Next.js build and a static export, with a configurable base path for GitHub Pages.",
        },
      ],
      gallery: [
        {
          src: "/images/projects/developer-portfolio/architecture.svg",
          alt: "Diagram showing project data flowing through a validation step into the project grid, project pages, sitemap and link-preview images",
          caption: "Every page is built from the same data file.",
          width: 1600,
          height: 900,
        },
      ],
    },
  },
  {
    slug: "bookmarks-api",
    title: "Bookmarks API",
    summary:
      "A REST API where people sign up, log in and save their own bookmarks. Built with NestJS, Prisma and PostgreSQL, with tests, Docker and CI.",
    description: [
      "A backend with the parts a real API needs: JWT login, input validation, database migrations, unit and end-to-end tests, Swagger docs, Docker and CI.",
      "Every user only ever sees their own bookmarks, and the whole thing starts with a single docker compose command.",
    ],
    category: "backend",
    year: 2024,
    featured: true,
    order: 2,
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "JWT", "Docker", "Jest", "GitHub Actions"],
    highlights: [
      "JWT login with argon2-hashed passwords",
      "Users can only read and change their own bookmarks",
      "Unit and end-to-end tests run in CI on every push",
    ],
    tags: ["nestjs", "rest-api", "postgresql", "prisma", "docker"],
    cover: {
      src: "/images/projects/bookmarks-api/cover.png",
      alt: "Swagger docs for the Bookmarks API listing the auth, users and bookmarks endpoints",
    },
    links: {
      repo: "https://github.com/iamrs77/NestJS-API",
    },
    caseStudy: {
      problem:
        "A small but complete backend: people sign up, log in and keep a private list of bookmarks. The aim was to build it with everything a production API needs, not just the happy path.",
      goals: [
        "Secure sign up and log in with tokens",
        "Keep each user's bookmarks private",
        "Check every request and return clear errors",
        "Run the database and the API with one command",
      ],
      architecture: [
        {
          title: "NestJS modules",
          description:
            "Auth, users and bookmarks are separate modules. A global Prisma module shares one database connection, and a Passport JWT guard protects the user and bookmark routes.",
        },
        {
          title: "PostgreSQL with Prisma",
          description:
            "Schema changes go through Prisma migrations. Bookmarks are indexed by user, and deleting a user also deletes their bookmarks.",
        },
        {
          title: "Docs and setup",
          description:
            "Swagger docs are generated from the DTOs and served at /docs. Docker Compose starts PostgreSQL, runs the migrations and starts the API.",
        },
      ],
      challenges: [
        {
          challenge: "Not leaking information",
          solution:
            "A wrong password and an unknown email return the same 401, and someone else's bookmark returns the same 404 as one that doesn't exist, so the API never reveals which accounts or ids exist.",
        },
        {
          challenge: "Testing against a real database",
          solution:
            "End-to-end tests start the real app against a separate test database and cover every endpoint, including a second user trying to read, change and delete the first user's bookmark. GitHub Actions runs them on every push, and also checks that docker compose really starts the API.",
        },
      ],
    },
  },
];
