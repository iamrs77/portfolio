import { FileText } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site";
import { assetPath, routes } from "@/lib/urls";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      {/* The blur lives on a sibling layer: backdrop-filter on the header itself would trap the fixed mobile menu inside it. */}
      <div aria-hidden="true" className="absolute inset-0 border-b border-border/70 bg-background/80 backdrop-blur-xl backdrop-saturate-150" />
      <Container className="relative flex h-16 items-center justify-between gap-3 sm:gap-6">
        <Link href={routes.home} className="group flex items-center gap-3 rounded-lg">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-foreground font-mono text-[11px] font-semibold tracking-tight text-background transition-transform duration-300 group-hover:-rotate-6"
          >
            {siteConfig.initials}
          </span>
          {/* Very small screens show just the monogram, leaving room for the resume button. */}
          <span className="text-sm font-medium tracking-tight whitespace-nowrap max-[359px]:sr-only">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks items={siteConfig.navigation} />
        </nav>

        <div className="flex items-center gap-1">
          {siteConfig.resumeUrl && (
            <a
              href={assetPath(siteConfig.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "secondary", size: "sm" }, "mr-1")}
            >
              <FileText aria-hidden="true" className="hidden size-4 sm:block" />
              Resume
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          )}
          <ThemeToggle />
          <MobileNav items={siteConfig.navigation} email={siteConfig.email} />
        </div>
      </Container>
    </header>
  );
}
