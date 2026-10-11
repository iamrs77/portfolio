"use client";

import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SocialLinks } from "@/components/ui/social-links";
import { routes } from "@/lib/urls";

export function MobileNav({ items, email }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    // Keep keyboard focus inside the header and menu while it covers the page.
    const background = ["main-content", "site-footer"].map((id) => document.getElementById(id));
    background.forEach((element) => element?.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      background.forEach((element) => element?.removeAttribute("inert"));
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-muted md:hidden"
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t bg-background md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="px-5 pt-4">
                {items.map((item, index) => (
                  <li key={item.id} className="border-b">
                    <Link
                      href={routes.section(item.id)}
                      onClick={close}
                      className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                    </Link>
                  </li>
                ))}
                <li className="border-b">
                  <Link
                    href={routes.projects}
                    onClick={close}
                    className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight"
                  >
                    All projects
                    <span className="font-mono text-xs text-muted">↗</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="px-5 py-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Get in touch</p>
              <a href={`mailto:${email}`} className="mt-3 block text-lg font-medium underline-offset-4 hover:underline">
                {email}
              </a>
              <SocialLinks className="mt-4 -ml-2.5" />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
