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
    order: 3,
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
      "A food ordering app where customers order from local restaurants and track their order, and restaurants accept, prepare and deliver it. Live, with a private demo for every visitor.",
    description: [
      "Customers find restaurants by name, cuisine or area, read menus with photos, order from one restaurant at a time, and watch their order go from accepted to delivered. Restaurant owners manage their menus, mark dishes sold out, and handle new orders as they arrive.",
      "I first built it in 2021 and rebuilt it in 2026, fixing security problems and adding tests. Then I made it a complete two-sided app: orders that reach the restaurant, a checkout that can't place the same order twice, and a live demo where every visitor gets their own copy of the restaurants, as the customer and as the restaurant owner.",
    ],
    category: "full-stack",
    year: 2026,
    featured: true,
    order: 2,
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux Toolkit",
      "Tailwind CSS",
      "Vite",
      "zod",
      "Vitest",
      "Playwright",
      "OpenAPI",
      "Docker",
      "GitHub Actions",
    ],
    highlights: [
      "Every visitor gets a private demo, as both the customer and the restaurant, deleted after 24 hours",
      "An order can't be placed twice, even from two tabs at the same moment",
      "138 automated tests, including a real browser clicking through whole orders",
      "Free to host, as one small server with a free database",
    ],
    tags: ["react", "nodejs", "express", "mongodb", "food-ordering", "transactions", "playwright", "openapi"],
    cover: {
      src: "/images/projects/foodiez/cover.webp",
      alt: "Foodiez home page with restaurant photos, cuisine filters, a pure veg filter and the Try the demo card",
    },
    links: {
      repo: "https://github.com/iamrs77/foodiez",
      live: "https://foodiez-izdk.onrender.com",
    },
    caseStudy: {
      problem:
        "The 2021 version had security holes, and an order stopped at placed: the restaurant never saw it. I wanted a food ordering app that works from start to finish for both sides, stays correct when two things happen at the same moment, and that anyone can try online without spoiling it for others.",
      goals: [
        "Orders that reach the restaurant, and customers who can follow them",
        "No order placed twice, and no two updates fighting over one order",
        "A public demo strangers can use without affecting anyone else",
        "Clear menus and fast search",
        "Free to host",
      ],
      architecture: [
        {
          title: "Checkout in one step",
          description:
            "Placing an order creates it and empties the cart in a single database transaction: either both happen or neither does. A retried request carries the same key and gets the first order back instead of a second one. In a test, three checkouts of one cart arrive at once and exactly one order is created.",
        },
        {
          title: "Orders that move along",
          description:
            "The restaurant moves an order from placed to accepted, preparing, out for delivery and delivered. A change only applies if nobody changed the order first, so the restaurant accepting at the same moment the customer cancels can't both win. The restaurant's orders and the customer's tracking page update by themselves.",
        },
        {
          title: "A private demo for every visitor",
          description:
            "Each visitor gets their own copy of the restaurants, menus and orders, and can switch between the customer and the restaurant owner. Every record knows which copy it belongs to, the API only ever shows a visitor their own, and the database deletes each copy by itself after 24 hours.",
        },
        {
          title: "Fast search",
          description:
            "Each restaurant keeps the words of its name, cuisine and area, and search matches the start of those words using a database index, instead of reading every restaurant. A test checks the database really uses the index.",
        },
        {
          title: "One small server, documented",
          description:
            "The API also serves the website, so it all runs as one free Render service with a free MongoDB Atlas database. The API is described in OpenAPI, readable at /api/docs, and a test checks the real answers against that description.",
        },
      ],
      challenges: [
        {
          challenge: "Shared demo accounts on a public site",
          solution:
            "With one shared demo login, anyone could rename or delete the restaurants everyone else sees. I gave each visitor a private copy instead, and tested two visitors side by side to prove neither sees the other's changes.",
        },
        {
          challenge: "Proving the test could catch the bug",
          solution:
            "A test for two orders at once proves nothing if they never actually overlap. I ran it with the transaction turned off: it created three orders. With the transaction, one. So the test would catch the bug if it ever came back.",
        },
        {
          challenge: "A bug only a slower computer found",
          solution:
            "A browser test passed on my machine but failed on the build server. The bug was real: turning a filter off and typing straight away put the filter back on. A small test now reproduces it, and each change builds on the latest filters.",
        },
        {
          challenge: "Testing the live site, not just my computer",
          solution:
            "After deploying, I ran the browser tests against the live site. The app was fine, but one test clicked before switching demo accounts had finished, which is instant locally but takes a moment online. The tests now wait, and all of them pass against the live site.",
        },
      ],
      gallery: [
        {
          src: "/images/projects/foodiez/menu.webp",
          alt: "Burger Barn's menu, grouped into Burgers, Sides and Shakes, with dish photos and a sold out chocolate shake",
          caption: "Menus are grouped into the restaurant's own sections. Sold out dishes stay visible but can't be ordered.",
          width: 2560,
          height: 1640,
        },
        {
          src: "/images/projects/foodiez/checkout.webp",
          alt: "A cart from Dosa Corner with the bill and a delivery form filled in from the last order",
          caption: "Checkout fills in the address from the last order.",
          width: 2560,
          height: 1640,
        },
        {
          src: "/images/projects/foodiez/restaurant-orders.webp",
          alt: "The restaurant's orders: a new order with Accept and Reject buttons, and one being prepared",
          caption: "The restaurant sees new orders as they arrive and moves each one to its next step.",
          width: 2560,
          height: 1640,
        },
        {
          src: "/images/projects/foodiez/tracking.webp",
          alt: "An order from Dosa Corner showing placed, accepted and being prepared, with the times of each step",
          caption: "The customer watches the order move along, on a page that updates by itself.",
          width: 2560,
          height: 1640,
        },
      ],
      outcomes: [
        "Live on free hosting, with a private demo for every visitor",
        "138 automated tests: 88 for the API, 45 for the web app and 5 in a real browser, run on every change",
      ],
    },
  },
];
