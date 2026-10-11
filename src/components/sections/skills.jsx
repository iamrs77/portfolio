import { RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/data/site";
import { skillCategories } from "@/data/skills";

export function Skills() {
  const copy = siteConfig.sections.skills;

  return (
    <Section id="skills">
      <SectionHeading id="skills" index="02" eyebrow="Skills" title={copy.heading} description={copy.description} />

      <RevealGroup as="ul" className="border-t">
        {skillCategories.map(({ id, title, description, icon: Icon, skills }) => (
          <RevealItem as="li" key={id} className="grid gap-5 border-b py-7 md:grid-cols-12 md:gap-8 md:py-8">
            <div className="flex items-start gap-4 md:col-span-4">
              {Icon && (
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-surface shadow-soft">
                  <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.6} />
                </span>
              )}
              <div>
                <h3 className="font-medium tracking-tight">{title}</h3>
                {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
              </div>
            </div>
            <ul className="flex flex-wrap content-start gap-2 md:col-span-8 md:pt-1" aria-label={`${title} skills`}>
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border bg-surface px-3 py-1.5 text-sm transition-colors duration-200 hover:border-border-strong"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
