/**
 * Every project shown on the site.
 *
 * Required fields: slug, title, summary, category (a key from project-categories.js), year and stack.
 * The README lists the optional ones. Images go in public/images/projects/<slug>/.
 * Mistakes like a duplicate slug or missing alt text stop the build with an error.
 */
export const projects = [
  {
    slug: "stockroom",
    title: "Stockroom",
    summary:
      "An inventory app for shops with more than one store. It tracks stock in every store, moves stock between stores, and imports spreadsheets of up to 100,000 rows in the background.",
    description: [
      "Stockroom helps a small chain of shops keep track of its stock. Owners add products, see how many are in each store, send stock from one store to another, and see what's running low. Every change is saved in a history, with who made it and when.",
      "I built it to show how I design back-end systems. Stock numbers stay right even when many people use the app at once, big imports carry on after a crash, and nothing is counted twice. It's live on free hosting, and anyone can try it with their own sample business.",
    ],
    category: "full-stack",
    year: 2026,
    featured: true,
    order: 1,
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "React",
      "TanStack Query",
      "Tailwind CSS",
      "Drizzle ORM",
      "Vitest",
      "GitHub Actions",
    ],
    highlights: [
      "Stock can never go below zero, even when several sales happen at the same moment",
      "Big imports continue from where they stopped after a crash, without counting anything twice",
      "Tested with 100,000 products and made up to 275× faster",
      "Free to host, and every visitor gets a private demo business to try",
    ],
    tags: ["system-design", "postgresql", "bullmq", "redis", "multi-tenant", "webhooks"],
    cover: {
      src: "/images/projects/stockroom/products-list.png",
      alt: "Stockroom's product list, with search, a low-stock filter and low-stock badges",
    },
    links: {
      repo: "https://github.com/iamrs77/stockroom",
      live: "https://stockroom-5x6w.onrender.com",
    },
    caseStudy: {
      problem:
        "Small shops with a few stores often keep track of stock in spreadsheets, and spreadsheets break easily. Two people can sell the last item at the same time, it's hard to see who changed what, and a big update can stop halfway. I wanted to build a simple inventory app that handles these problems properly, and prove it with tests.",
      goals: [
        "Stock numbers that are always right, even when many things happen at once",
        "Big imports that survive a crash without counting anything twice",
        "Alerts that are never lost and never sent by mistake",
        "Fast, even with 100,000 products",
        "Free to host and free to try",
      ],
      architecture: [
        {
          title: "Stock history",
          description:
            "Every stock change is saved as a new history entry together with the new total, in a single step: either both are saved or neither is. The database refuses any change that would take stock below zero. In a test, 12 sales arrive at the same moment for an item with only 5 in stock, and exactly 5 go through.",
        },
        {
          title: "Background imports",
          description:
            "Uploaded spreadsheets are processed in the background in blocks of 1,000 rows, using a job queue (BullMQ on Redis). After each block, the app saves how far it got, so after a crash the import continues from that point. If the queue loses a job, a regular check finds it and starts it again.",
        },
        {
          title: "Reliable alerts",
          description:
            "Low-stock alerts and transfer updates are saved in the same step as the change that caused them, then sent to the business's own systems as webhooks. Each message is signed so the receiver can check it's genuine, and failed sends are retried.",
        },
        {
          title: "One small server",
          description:
            "The website, the API and the background workers run together as one Node.js app on Render's free plan, with free PostgreSQL from Neon and free Redis from Upstash. Changing one setting splits them into separate servers when more capacity is needed.",
        },
      ],
      challenges: [
        {
          challenge: "Making sure a crash can't break an import",
          solution:
            "I stopped the server suddenly in the middle of a 100,000-row import. After a restart, the import carried on from where it stopped. All 197,463 stock changes were correct, and none were applied twice.",
        },
        {
          challenge: "A test that couldn't catch the bug",
          solution:
            "My first test for two sales at the same moment passed even with the safety lock removed, because the two sales never actually overlapped. I changed the test to hold both sales open at the same time. Now it fails without the lock and passes with it.",
        },
        {
          challenge: "A slow product list",
          solution:
            "With 100,000 products, showing only low-stock items took 1.6 seconds. Load tests showed where the time went, and I fixed it step by step: keeping each product's total stock ready instead of adding it up every time, faster paging and a better search index. It now takes 6 ms. The trade-off is that imports are 46% slower, which I measured and wrote down.",
        },
        {
          challenge: "Staying within free limits",
          solution:
            "The free Redis plan allows a fixed number of commands a month, and the job queue's default settings would have used them all in about a week. I made the background checks run less often so the app stays within the limit. Each visitor's demo business is deleted after 24 hours, so the free database never fills up.",
        },
      ],
      gallery: [
        {
          src: "/images/projects/stockroom/import-in-progress.png",
          alt: "A 30,000-row import 30% done, with live counts of new products, stock changes and skipped rows",
          caption: "Big imports run in the background and show their progress live.",
          width: 2200,
          height: 1134,
        },
        {
          src: "/images/projects/stockroom/transfer-received.png",
          alt: "Transfer TR-0001 from Queen Street West to Kensington Market, received with one mug short",
          caption: "A transfer between two stores. The receiving store records what actually arrived.",
          width: 2200,
          height: 914,
        },
        {
          src: "/images/projects/stockroom/product-history.png",
          alt: "A mug's stock in three stores, next to its history of opening stock and a transfer, each entry with the new total",
          caption: "Every change to a product's stock is kept in its history.",
          width: 2200,
          height: 1432,
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
