/**
 * A small label that appears above its parent on hover and on keyboard focus, for icon-only buttons.
 * The parent needs `group/tip relative`. It's hidden from screen readers: the button's own accessible
 * name (usually `sr-only` text) already says the same thing.
 */
export function TipLabel({ children }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-foreground px-2 py-1 text-xs font-medium whitespace-nowrap text-background opacity-0 shadow-soft transition-[opacity,translate] duration-200 group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus-visible/tip:translate-y-0 group-focus-visible/tip:opacity-100"
    >
      {children}
    </span>
  );
}
