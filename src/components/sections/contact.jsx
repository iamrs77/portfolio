import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmphasizedText } from "@/components/ui/emphasized-text";
import { Reveal } from "@/components/ui/scroll-reveal";
import { Eyebrow } from "@/components/ui/section";
import { SocialLinks, socialIcons } from "@/components/ui/social-links";
import { siteConfig } from "@/data/site";
import { contactFormEndpoint } from "@/lib/contact-form";
import { assetPath } from "@/lib/urls";
import { displayUrl } from "@/lib/utils";

function getChannels() {
  const channels = [
    { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail, external: false },
    ...siteConfig.socials.map((social) => ({
      label: social.label,
      value: displayUrl(social.href),
      href: social.href,
      icon: socialIcons[social.icon],
      external: true,
    })),
  ];
  if (siteConfig.resumeUrl) {
    channels.push({ label: "Resume", value: "Download PDF", href: assetPath(siteConfig.resumeUrl), icon: FileText, external: true });
  }
  return channels;
}

function ChannelList() {
  return (
    <ul className="border-t">
      {getChannels().map(({ label, value, href, icon: Icon, external }) => (
        <li key={href} className="border-b">
          <a
            href={href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className="group flex items-center gap-4 py-5 transition-colors"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-background transition-colors group-hover:border-border-strong">
              <Icon aria-hidden="true" className="size-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</span>
              <span className="mt-0.5 block truncate font-medium tracking-tight">{value}</span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
            {external && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Contact() {
  const { contact, email } = siteConfig;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-12 pb-24 sm:pb-32">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[1.75rem] border bg-surface px-6 py-14 shadow-soft sm:px-12 sm:py-20">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <Eyebrow index="05">Contact</Eyebrow>
              <h2
                id="contact-heading"
                className="mt-5 text-[2.5rem] leading-[1.04] font-medium tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]"
              >
                <EmphasizedText text={contact.heading} />
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{contact.message}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${email}`} size="lg">
                  <Mail aria-hidden="true" className="size-4" />
                  Say hello
                </ButtonLink>
                <CopyEmailButton email={email} />
              </div>
              {contactFormEndpoint && <SocialLinks className="mt-8 -ml-2.5" />}
            </div>

            <div className="lg:col-span-6 lg:self-center">
              {contactFormEndpoint ? <ContactForm endpoint={contactFormEndpoint} /> : <ChannelList />}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
