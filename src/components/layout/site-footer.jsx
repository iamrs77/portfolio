import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t">
      <Container className="py-6 text-sm text-muted">
        <p>
          © {year} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
