import { Check } from "lucide-react";
import Image from "next/image";
import { assetPath } from "@/lib/urls";
import { toParagraphs } from "@/lib/utils";

/* Content for each case-study section. Each renderer only runs when its data exists (see getProjectSections). */

function Prose({ text, lead = false }) {
  return (
    <div className="space-y-5">
      {toParagraphs(text).map((paragraph, index) => (
        <p
          key={paragraph}
          className={lead && index === 0 ? "text-lg leading-relaxed sm:text-xl" : "text-base leading-relaxed text-muted sm:text-[1.0625rem]"}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }) {
  return (
    <ol className="border-t">
      {items.map((item, index) => (
        <li key={item.title} className="grid gap-x-6 gap-y-2 border-b py-6 sm:grid-cols-[3rem_1fr]">
          <span aria-hidden="true" className="font-mono text-xs text-accent sm:pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-medium tracking-tight">{item.title}</p>
            {item.body && (
              <div className="mt-2">
                <Prose text={item.body} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function GalleryImage({ image }) {
  const sizes = "(min-width: 1280px) 820px, (min-width: 1024px) 66vw, 100vw";
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border bg-surface-muted">
        {image.width && image.height ? (
          <Image src={assetPath(image.src)} alt={image.alt} width={image.width} height={image.height} sizes={sizes} className="h-auto w-full" />
        ) : (
          <div className="relative aspect-[16/10]">
            <Image src={assetPath(image.src)} alt={image.alt} fill sizes={sizes} className="object-contain" />
          </div>
        )}
      </div>
      {image.caption && <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>}
    </figure>
  );
}

export function renderProjectSection(id, project) {
  const study = project.caseStudy ?? {};

  switch (id) {
    case "overview":
      return (
        <div className="space-y-10">
          {project.description && <Prose text={project.description} lead />}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Key features</h3>
              <CheckList items={project.highlights} />
            </div>
          )}
        </div>
      );
    case "problem":
      return <Prose text={study.problem} lead />;
    case "goals":
      return <NumberedList items={(study.goals ?? []).map((goal) => ({ title: goal }))} />;
    case "role":
      return study.role ? (
        <div className="space-y-5">
          <p className="text-lg font-medium tracking-tight">{study.role.title}</p>
          {study.role.contributions && <CheckList items={study.role.contributions} />}
        </div>
      ) : null;
    case "architecture":
      return <NumberedList items={(study.architecture ?? []).map((decision) => ({ title: decision.title, body: decision.description }))} />;
    case "challenges":
      return (
        <div className="space-y-4">
          {(study.challenges ?? []).map((item) => (
            <div key={item.challenge} className="grid overflow-hidden rounded-xl border md:grid-cols-2">
              <div className="bg-surface-muted p-5 sm:p-6">
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Challenge</p>
                <p className="mt-2 font-medium leading-relaxed tracking-tight">{item.challenge}</p>
              </div>
              <div className="border-t bg-surface p-5 sm:p-6 md:border-t-0 md:border-l">
                <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Solution</p>
                <div className="mt-2">
                  <Prose text={item.solution} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "gallery":
      return (
        <div className="space-y-10">
          {(study.gallery ?? []).map((image) => (
            <GalleryImage key={image.src} image={image} />
          ))}
        </div>
      );
    case "outcomes":
      return <CheckList items={study.outcomes ?? []} />;
    case "lessons":
      return <NumberedList items={(study.lessons ?? []).map((lesson) => ({ title: lesson }))} />;
  }
}
