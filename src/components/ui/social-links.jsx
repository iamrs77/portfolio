import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

// Brand logos come from react-icons (Font Awesome set), because Lucide doesn't include them.
export const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  mail: Mail,
};

export function SocialLinks({ className }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {siteConfig.socials.map((social) => {
        const Icon = socialIcons[social.icon];
        return (
          <li key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <Icon aria-hidden="true" className="size-[18px]" />
              <span className="sr-only">{social.label} (opens in a new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
