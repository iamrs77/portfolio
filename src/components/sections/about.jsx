import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/data/site";
import { assetPath } from "@/lib/urls";
import { formatYearMonth } from "@/lib/utils";

function SideHeading({ children }) {
  return <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">{children}</h3>;
}

function Certification({ certification }) {
  const { name, issuer, issued, expires, url, image } = certification;
  // Checked when the site is built, so a redeploy after the expiry date updates the label.
  const expired = expires && new Date(`${expires}-01`) < new Date();
  const dates = [`Issued ${formatYearMonth(issued)}`, expires && `${expired ? "Expired" : "Expires"} ${formatYearMonth(expires)}`];

  return (
    <div className="flex items-start gap-4">
      {image && <Image src={assetPath(image)} alt="" width={48} height={48} className="size-12 shrink-0" />}
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium tracking-tight underline-offset-4 hover:underline">
          {name}
          <span className="sr-only"> (verify on Credly, opens in a new tab)</span>
        </a>
        <p className="mt-1 text-sm leading-relaxed text-muted">{issuer}</p>
        <p className="mt-0.5 font-mono text-xs text-muted">{dates.filter(Boolean).join(" · ")}</p>
      </div>
    </div>
  );
}

export function About() {
  const { about } = siteConfig;
  const education = about.education ?? [];
  const certifications = about.certifications ?? [];

  return (
    <Section id="about">
      <SectionHeading id="about" index="01" eyebrow="About" title={about.heading} />

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <p className="text-xl leading-snug tracking-[-0.015em] sm:text-2xl">{about.lead}</p>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}

          {about.facts.length > 0 && (
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border">
              {about.facts.map((fact) => (
                <div key={fact.label} className="bg-background p-4 sm:p-5">
                  <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{fact.label}</dt>
                  <dd className="mt-2 text-sm font-medium sm:text-[0.9375rem]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        {(education.length > 0 || certifications.length > 0) && (
          <div className="space-y-12 lg:col-span-5">
            {education.length > 0 && (
              <div>
                <SideHeading>Education</SideHeading>
                <RevealGroup as="ul" className="mt-5 border-t">
                  {education.map((item) => (
                    <RevealItem as="li" key={item.degree} className="flex gap-5 border-b py-5">
                      <span className="pt-0.5 font-mono text-xs whitespace-nowrap text-accent">{item.years}</span>
                      <div>
                        <p className="font-medium tracking-tight">{item.degree}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{item.school}</p>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <SideHeading>Certifications</SideHeading>
                <RevealGroup as="ul" className="mt-5 border-t">
                  {certifications.map((certification) => (
                    <RevealItem as="li" key={certification.name} className="border-b py-5">
                      <Certification certification={certification} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
