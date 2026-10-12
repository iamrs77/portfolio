/**
 * Personal details, page text and links used across the site.
 * Wrapping a word in *asterisks* in the hero headline shows it in the accent serif font.
 */
export const siteConfig = {
  name: "Rohit Sharma",
  initials: "RS",
  title: "Software Engineer",
  description:
    "Rohit Sharma is a software engineer in Toronto with 4+ years of experience building scalable web applications with React, Node.js, microservices and SQL.",
  // Production URL. NEXT_PUBLIC_SITE_URL, or the URL Vercel/Netlify provide, overrides it.
  url: "https://example.com",
  locale: "en_US",
  email: "rohit227sharma@gmail.com",
  location: "Toronto, Canada",
  availability: {
    available: true,
    label: "Open to new opportunities",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/iamrs77", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rohit-sharma-rsharma/", icon: "linkedin" },
  ],
  navigation: [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ],
  hero: {
    headline: "I build *full-stack* web apps with React, Node.js and SQL.",
    intro:
      "I'm a software engineer in Toronto with 4+ years of experience, currently at Mi9 Retail. I work across the stack, mostly with React, Node.js, REST APIs and SQL.",
  },
  about: {
    heading: "A bit about me",
    lead: "I build the parts of web apps that need to be fast and reliable.",
    paragraphs: [
      "Day to day that means Node.js services, background job queues and SQL tuning, along with the React front ends that sit on top of them. I've been doing this for 4+ years, first at GeekyAnts in Bangalore and now at Mi9 Retail in Toronto.",
      "I care about clean, maintainable code and systems that keep working under load.",
    ],
    facts: [
      { label: "Based in", value: "Toronto, Canada" },
      { label: "Experience", value: "4+ years" },
      { label: "Focus", value: "Full-stack, backend focus" },
      { label: "Currently", value: "Software Engineer at Mi9 Retail" },
    ],
    education: [
      {
        degree: "PG Diploma, Application Design and Development",
        school: "Lambton College, Toronto",
        years: "2022–2023",
      },
      {
        degree: "B.E. Computer Science and Engineering",
        school: "Lovely Professional University, Jalandhar",
        years: "2016–2020",
      },
    ],
    // Dates are "YYYY-MM". A certification past its `expires` date shows as expired the next time the site is built.
    certifications: [
      {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        issued: "2023-12",
        expires: "2026-12",
        url: "https://www.credly.com/badges/b8cf68c0-d934-4aeb-9c36-709c631203b0/",
        image: "/images/certifications/aws-certified-developer-associate.png",
      },
    ],
  },
  sections: {
    skills: {
      heading: "What I work with",
      description: "Grouped by where they fit in the stack.",
    },
    projects: {
      heading: "Things I've built",
      description: "Each project has a short write-up on how it was built.",
    },
    experience: {
      heading: "Where I've worked",
    },
  },
  contact: {
    heading: "Get in touch",
    message: "I'm open to new roles and happy to talk. Email is the quickest way to reach me.",
  },
  resumeUrl: "/rohit-sharma-resume.pdf",
};
