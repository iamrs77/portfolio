import { Braces, Database, Monitor, Server, Wrench } from "lucide-react";

// Shown in this order on the home page. `icon` can be any icon from https://lucide.dev/icons.
export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    description: "What I write every day",
    icon: Braces,
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Responsive, reusable interfaces",
    icon: Monitor,
    skills: ["React", "Redux Toolkit", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, services and background jobs",
    icon: Server,
    skills: ["Node.js", "Express.js", "Microservices", "REST APIs", "GraphQL", "BullMQ"],
  },
  {
    id: "databases",
    title: "Databases & Caching",
    description: "Modelling, querying and caching data",
    icon: Database,
    skills: ["MySQL", "MSSQL", "MongoDB", "DynamoDB", "Redis"],
  },
  {
    id: "tools",
    title: "Tools & Testing",
    description: "Shipping, testing and running software",
    icon: Wrench,
    skills: ["Docker", "AWS", "Git", "GitHub", "Jest", "Jira", "Agile/Scrum"],
  },
];
