import { ArrowDown } from "lucide-react";
import { HeroDiagram } from "@/components/sections/hero-diagram";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmphasizedText } from "@/components/ui/emphasized-text";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/data/site";
import { routes } from "@/lib/urls";

const delay = (ms) => ({ "--enter-delay": `${ms}ms` });

export function Hero() {
  const { availability, hero } = siteConfig;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-18rem] left-1/2 -z-10 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl"
      />

      <Container className="pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
        {availability?.available && (
          <p className="enter inline-flex items-center gap-2.5 rounded-full border bg-surface/70 py-1.5 pr-3.5 pl-3 text-xs font-medium text-muted shadow-soft backdrop-blur">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-success" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            {availability.label}
          </p>
        )}

        <h1 id="hero-heading" className="mt-8">
          <span className="enter flex flex-wrap items-baseline gap-x-3 gap-y-1" style={delay(60)}>
            <span className="text-lg font-medium tracking-tight">{siteConfig.name}</span>
            <span aria-hidden="true" className="text-border-strong">/</span>
            <span className="font-mono text-sm text-muted">{siteConfig.title}</span>
          </span>
          <span
            className="enter mt-5 block max-w-5xl text-[clamp(2.6rem,6.6vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.045em]"
            style={delay(140)}
          >
            <EmphasizedText text={hero.headline} />
          </span>
        </h1>

        <div className="mt-10 grid items-start gap-14 sm:mt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="enter max-w-xl text-lg leading-relaxed text-muted" style={delay(240)}>
              {hero.intro}
            </p>

            <div className="enter mt-10 flex flex-wrap items-center gap-3" style={delay(320)}>
              <ButtonLink href={routes.section("projects")} size="lg">
                View my projects
                <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/button:translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href={routes.section("contact")} variant="secondary" size="lg">
                Contact me
              </ButtonLink>
              <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-border-strong sm:block" />
              <SocialLinks />
            </div>
          </div>

          <div className="enter max-w-xl lg:col-span-6 lg:col-start-7 lg:-mt-2 lg:max-w-none" style={delay(420)}>
            <HeroDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}
