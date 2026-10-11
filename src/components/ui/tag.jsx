import { cn } from "@/lib/utils";

export function Tag({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-surface px-2.5 py-0.5 font-mono text-xs tracking-tight text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({ items, label, limit }) {
  const visible = limit === undefined ? items : items.slice(0, limit);
  const hidden = items.length - visible.length;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {visible.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <Tag>
            +{hidden}
            <span className="sr-only"> more</span>
          </Tag>
        </li>
      )}
    </ul>
  );
}
