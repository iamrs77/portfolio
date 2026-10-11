import Link from "next/link";
import { cn, isExternalUrl } from "@/lib/utils";

const base =
  "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-foreground text-background shadow-soft hover:bg-foreground/85",
  secondary: "border border-border-strong bg-surface text-foreground hover:border-foreground/30 hover:bg-surface-muted",
  ghost: "text-muted hover:bg-surface-muted hover:text-foreground",
};

const sizes = {
  sm: "h-9 gap-1.5 px-3.5 text-sm",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-6 text-[0.9375rem]",
  icon: "size-10",
};

export function buttonStyles({ variant = "primary", size = "md" } = {}, className) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, type = "button", ...props }) {
  return <button type={type} className={buttonStyles({ variant, size }, className)} {...props} />;
}

/** A link styled as a button. External URLs open in a new tab; `mailto:` and site paths stay in place. */
export function ButtonLink({ href, variant, size, className, children, ...props }) {
  const classes = buttonStyles({ variant, size }, className);

  if (isExternalUrl(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }
  if (href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
