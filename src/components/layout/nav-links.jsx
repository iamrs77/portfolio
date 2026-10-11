"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/urls";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

export function NavLinks({ items }) {
  const pathname = usePathname();
  const active = useActiveSection(
    items.map((item) => item.id),
    pathname === "/",
  );

  return (
    <ul className="flex items-center gap-0.5">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <Link
              href={routes.section(item.id)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm transition-colors hover:text-foreground",
                isActive ? "text-foreground" : "text-muted",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -bottom-[3px] mx-auto size-1 rounded-full bg-accent transition-[opacity,transform] duration-300",
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
