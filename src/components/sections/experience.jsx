import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { experiences } from "@/data/experience";
import { siteConfig } from "@/data/site";
import { formatYearMonth } from "@/lib/utils";

function Company({ job }) {
  if (!job.companyUrl) return <>{job.company}</>;
  return (
    <a
      href={job.companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 underline-offset-4 hover:underline"
    >
      {job.company}
      <ArrowUpRight aria-hidden="true" className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function Experience() {
  if (experiences.length === 0) return null;
  const copy = siteConfig.sections.experience;

  return (
    <Section id="experience">
      <SectionHeading id="experience" index="04" eyebrow="Experience" title={copy.heading} description={copy.description} />

      <RevealGroup as="ol" className="border-t">
        {experiences.map((job) => (
          <RevealItem as="li" key={job.id} className="grid gap-5 border-b py-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-wide text-muted uppercase">
                <time dateTime={job.start}>{formatYearMonth(job.start)}</time>
                <span aria-hidden="true">–</span>
                {job.end ? (
                  <time dateTime={job.end}>{formatYearMonth(job.end)}</time>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
                    Present
                  </span>
                )}
              </p>
              <p className="mt-3 font-medium tracking-tight">
                <Company job={job} />
              </p>
              {(job.location || job.employmentType) && (
                <p className="mt-1 text-sm text-muted">{[job.location, job.employmentType].filter(Boolean).join(" · ")}</p>
              )}
            </div>

            <div className="md:col-span-8">
              <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{job.role}</h3>
              {job.summary && <p className="mt-2 leading-relaxed text-muted">{job.summary}</p>}
              <ul className="mt-5 space-y-3">
                {job.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
              {job.stack && job.stack.length > 0 && (
                <div className="mt-6">
                  <TagList items={job.stack} label={`Technologies used at ${job.company}`} />
                </div>
              )}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
