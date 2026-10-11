import { Container } from "@/components/ui/container";
import { EmphasizedText } from "@/components/ui/emphasized-text";
import { Reveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

export function Section({ id, children, className }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("py-24 sm:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ index, children, className }) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted", className)}>
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-8 bg-border-strong" />}
      {children}
    </p>
  );
}

/** `id` must match the parent Section's `id`, which uses the heading as its accessible name. */
export function SectionHeading({ id, index, eyebrow, title, description, action }) {
  return (
    <Reveal className="mb-12 grid items-end gap-8 sm:mb-16 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2
          id={`${id}-heading`}
          className="mt-5 text-[2rem] leading-[1.08] font-medium tracking-[-0.035em] sm:text-[2.75rem] lg:text-5xl"
        >
          <EmphasizedText text={title} />
        </h2>
        {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="lg:col-span-4 lg:justify-self-end">{action}</div>}
    </Reveal>
  );
}
