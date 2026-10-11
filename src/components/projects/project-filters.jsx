import { cn } from "@/lib/utils";

export function ProjectFilters({ categories, total, active, onChange }) {
  const options = [{ id: "all", label: "All", count: total }, ...categories];

  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.id === active;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200",
              selected
                ? "border-foreground bg-foreground text-background"
                : "bg-surface text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {option.label}
            <span className={cn("font-mono text-xs", selected ? "text-background/70" : "text-muted")}>{option.count}</span>
          </button>
        );
      })}
    </div>
  );
}
