import Link from "next/link";

import { Text } from "@/components/ui";
import { cn } from "@/lib/utils";

type PolicyLink = {
  id: string;
  label: string;
  href: string;
};

type PolicyNavigationProps = {
  links: PolicyLink[];
  currentSlug?: string;
  className?: string;
};

/** Horizontal policy navigation for legal pages. */
export function PolicyNavigation({ links, currentSlug, className }: PolicyNavigationProps) {
  return (
    <nav className={cn("brand-policy-nav", className)} aria-label="Policy pages">
      <ul className="brand-policy-nav__list">
        {links.map((link) => (
          <li key={link.id}>
            <Text
              as="span"
              variant="label"
              className={cn(
                "brand-policy-nav__link",
                currentSlug === link.id && "brand-policy-nav__link--active",
              )}
            >
              <Link href={link.href} aria-current={currentSlug === link.id ? "page" : undefined}>
                {link.label}
              </Link>
            </Text>
          </li>
        ))}
      </ul>
    </nav>
  );
}
