import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const metadata = pageMetadata({ path: "/" });

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  description: siteConfig.description,
  url: absoluteUrl("/"),
  sameAs: siteConfig.socials.map((social) => social.href),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <Contact />
    </>
  );
}
