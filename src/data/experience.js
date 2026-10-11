// Shown in this order, most recent first. Dates are "YYYY-MM"; a role without `end` shows "Present".
// employmentType (optional): Full-time, Part-time, Contract, Freelance or Internship.
export const experiences = [
  {
    id: "mi9-retail-software-engineer",
    role: "Software Engineer",
    company: "Mi9 Retail Inc.",
    companyUrl: "https://mi9retail.com",
    location: "Toronto, Canada",
    employmentType: "Full-time",
    start: "2022-02",
    summary: "Building enterprise merchant solutions.",
    achievements: [
      "Architected an asynchronous job-queuing microservice with Node.js, BullMQ and Redis to offload heavy Excel data processing, eliminating main-thread UI freezes and timeout errors.",
      "Developed and optimized RESTful APIs and SQL queries for high-throughput endpoints, reducing backend response times by 35%.",
      "Refactored client-side state management with Redux Toolkit, removing boilerplate across the codebase and making it easier to maintain and scale.",
      "Engineered reusable React UI components and custom hooks, accelerating feature rollout cycles by 30% across cross-functional engineering teams.",
      "Architected and deployed a modular backend on Node.js and Express.js, supporting scalability, system resilience and rapid feature development.",
    ],
    stack: ["Node.js", "Express.js", "React", "Redux Toolkit", "BullMQ", "Redis", "SQL", "REST APIs"],
  },
  {
    id: "geekyants-software-engineer",
    role: "Software Engineer",
    company: "GeekyAnts",
    companyUrl: "https://geekyants.com",
    location: "Bangalore, India",
    employmentType: "Full-time",
    start: "2020-09",
    end: "2022-03",
    achievements: [
      "Built and deployed scalable React.js and Node.js web applications serving thousands of active users, driving a 20% increase in user engagement.",
      "Optimized complex SQL queries and restructured relational database schemas, reducing query latency and server load during peak hours.",
      "Implemented end-to-end features in full-stack JavaScript/TypeScript pipelines while meeting strict code coverage standards with Jest.",
    ],
    stack: ["React", "Node.js", "TypeScript", "JavaScript", "SQL", "Jest"],
  },
  {
    id: "elitmus-software-engineer-intern",
    role: "Software Engineer Intern",
    company: "eLitmus Evaluation",
    companyUrl: "https://www.elitmus.com",
    location: "Bangalore, India",
    employmentType: "Internship",
    start: "2019-06",
    end: "2020-05",
    achievements: [
      "Engineered and launched a multi-vendor gift card platform with Ruby on Rails, increasing platform transaction volume and user spending by 70%.",
      "Developed user growth features, including refer-and-earn and reward-point loyalty systems, growing active user acquisition by 15%.",
      "Collaborated with cross-functional engineering teams to build and integrate reliable backend RESTful services.",
    ],
    stack: ["Ruby on Rails", "REST APIs"],
  },
];
