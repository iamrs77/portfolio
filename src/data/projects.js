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
    slug: "stock-signal-advisor",
    title: "Stock Signal Advisor",
    summary:
      "A Streamlit app that turns technical indicators into BUY, SELL or HOLD verdicts, with the reasons, for day trading and long-term investing.",
    description: [
      "Type a ticker and the app scores VWAP, moving averages, RSI, MACD and Bollinger Bands into a verdict and explains each part of it. An intraday view works on 1 to 60 minute bars, and a long-term view follows the 200-day trend.",
      "It also backtests its own rules, sizes positions from your account and risk per trade, and picks the best free live price source for the time of day. It's a rules-based second opinion, not financial advice.",
    ],
    category: "data",
    year: 2026,
    featured: true,
    order: 2,
    stack: ["Python", "Streamlit", "pandas", "NumPy", "yfinance", "Alpaca API", "Finnhub API", "pytest", "GitHub Actions"],
    highlights: [
      "Every verdict comes with the reasons behind it",
      "Backtests replay history through the same rules as the live view",
      "78 tests in CI and a free live demo on Streamlit Cloud",
    ],
    tags: ["python", "streamlit", "trading", "technical-analysis", "backtesting"],
    cover: {
      src: "/images/projects/stock-signal-advisor/cover.png",
      alt: "Stock Signal Advisor's Intraday tab showing a SELL verdict for SOXL with price, score and agreement",
    },
    links: {
      repo: "https://github.com/iamrs77/stock-signal-advisor",
      live: "https://stock-signal-advisor.streamlit.app/",
    },
    caseStudy: {
      problem:
        "Day trading means reading several indicators at once and deciding fast, which makes it easy to act on emotion. The app scores the same indicators the same way every time and shows its reasoning, as a calm second opinion.",
      goals: [
        "A clear verdict with the reasons behind it",
        "Separate views for intraday trading and long-term holding",
        "Test the rules on history before trusting them",
        "Use free, real-time market data where possible",
      ],
      architecture: [
        {
          title: "Analysis separate from the UI",
          description:
            "The signal, intraday, risk, backtest and history modules have no Streamlit code, so the app, the backtests and a background logger all run exactly the same rules.",
        },
        {
          title: "Best free data for each session",
          description:
            "Finnhub during regular hours, Yahoo before and after the market, and Alpaca's IEX feed for real-time intraday bars, with a fallback whenever a source isn't available.",
        },
        {
          title: "Views that refresh on their own",
          description:
            "The intraday verdict refreshes every 10 seconds with Streamlit fragments, while heavier panels like the chart update on a slower cycle.",
        },
      ],
      challenges: [
        {
          challenge: "Choppy markets",
          solution:
            "When strong signals disagree, or the price is hugging VWAP, the app says WAIT instead of forcing a BUY or SELL.",
        },
        {
          challenge: "Knowing whether the rules work",
          solution:
            "Backtests replay history bar by bar through the live engine and report win rate, drawdown and profit factor next to buy-and-hold. They don't include fees or slippage, and the app says so.",
        },
        {
          challenge: "A public demo everyone shares",
          solution:
            "On Streamlit Cloud every visitor uses the same server, so a demo mode keeps each visitor's trade log in their own session instead of a shared file.",
        },
      ],
      gallery: [
        {
          src: "/images/projects/stock-signal-advisor/long-term.png",
          alt: "Long-term price chart with 50- and 200-day averages, Bollinger Bands, RSI and MACD",
          caption: "Long-term view: candles with moving averages, RSI and MACD.",
          width: 1400,
          height: 741,
        },
        {
          src: "/images/projects/stock-signal-advisor/backtest.png",
          alt: "Backtest results with trades, win rate, total return, drawdown and an equity curve",
          caption: "Backtest of the 200-day trend rules over 5 years.",
          width: 1400,
          height: 836,
        },
        {
          src: "/images/projects/stock-signal-advisor/know-your-ticker.png",
          alt: "Risk profile for SOXL showing its daily swing, where it sits in its yearly range and when it moves most",
          caption: "Know your ticker: a measured risk profile, not a forecast.",
          width: 1400,
          height: 704,
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
    order: 4,
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
  {
    slug: "foodiez",
    title: "Foodiez",
    summary:
      "A food ordering web app: customers order from local restaurants, and vendors manage their own menus. React, Node.js and MongoDB, with tests, Docker and CI.",
    description: [
      "Customers browse and search restaurants, build a cart from one restaurant and place orders. Vendors add restaurants and manage dishes, and can only change their own. Demo accounts are built in, so the app is ready to try as soon as it starts.",
      "I first built it in 2021 as an Express API and four versions of the same React app. In 2026 I merged the API and the Tailwind version into one repo and rebuilt both, fixing security problems and adding tests, Docker and CI.",
    ],
    category: "full-stack",
    year: 2026,
    featured: true,
    order: 3,
    stack: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Tailwind CSS", "Vite", "zod", "JWT",
            "Vitest", "Docker", "GitHub Actions"],
    highlights: [
      "Vendors can only change their own restaurants, checked by the API on every request",
      "Orders keep the price that was paid, even after a menu changes",
      "60 tests, plus a CI check that the Docker setup starts",
    ],
    tags: ["react", "nodejs", "express", "mongodb", "food-ordering"],
    cover: {
      src: "/images/projects/foodiez/cover.png",
      alt: "Foodiez home page with a restaurant search box and cards for Spice Route, Napoli Slice and Dosa Corner",
    },
    links: {
      repo: "https://github.com/iamrs77/foodiez",
    },
    caseStudy: {
      problem:
        "The 2021 version worked, but it had real security holes: anyone could sign up as an admin, and any vendor could edit any restaurant. Its request handling crashed easily, and it had no real order history. The rebuild set out to fix all of that.",
      goals: [
        "Browse, fill a cart and order without friction",
        "Vendors manage their own restaurants and menus, and nothing else",
        "Safe by default: checked input, hashed passwords and rate-limited logins",
        "Run the whole app with one command",
      ],
      architecture: [
        {
          title: "React web app",
          description:
            "React 19 with Vite, React Router and Tailwind CSS. Every API call goes through Redux Toolkit's RTK Query, so loading, caching and errors are handled in one place.",
        },
        {
          title: "Express API",
          description:
            "Express 5 with Mongoose. zod checks every request body, and roles and ownership are checked on the server, not just hidden in the interface.",
        },
        {
          title: "One-command setup",
          description:
            "Docker Compose runs MongoDB, the API and nginx serving the web app. The quick start runs the API with an in-memory database filled with demo data.",
        },
      ],
      challenges: [
        {
          challenge: "Permissions only enforced in the browser",
          solution:
            "The API now checks who you are and what you own on every request. Tests confirm a vendor can't change another vendor's restaurant and a customer can't touch someone else's cart.",
        },
        {
          challenge: "Old orders changing with the menu",
          solution:
            "Each order stores a copy of its dishes and prices, so editing or deleting a dish later doesn't change what a customer paid.",
        },
        {
          challenge: "Revealing who has an account",
          solution:
            "A wrong email and a wrong password give the same error, and login attempts are rate limited.",
        },
      ],
      gallery: [
        {
          src: "/images/projects/foodiez/menu.png",
          alt: "Spice Route's menu with veg and non-veg dishes, quantity controls and a cart summary bar",
          caption: "A restaurant menu, with the cart summary at the bottom.",
          width: 1280,
          height: 860,
        },
        {
          src: "/images/projects/foodiez/cart.png",
          alt: "Cart with Paneer Butter Masala and Garlic Naan from Spice Route, quantity controls and bill details",
          caption: "The cart. One order comes from one restaurant, like real delivery apps.",
          width: 1280,
          height: 860,
        },
        {
          src: "/images/projects/foodiez/orders.png",
          alt: "Order history after placing an order, listing each order's dishes, prices and total",
          caption: "Order history keeps the price that was actually paid.",
          width: 1280,
          height: 860,
        },
        {
          src: "/images/projects/foodiez/vendor-restaurants.png",
          alt: "Vendor's My restaurants page with three restaurant cards and an Add restaurant button",
          caption: "Vendors see and manage only their own restaurants.",
          width: 1280,
          height: 860,
        },
      ],
    },
  },
];
