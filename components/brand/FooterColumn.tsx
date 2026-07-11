import Link from "next/link";

import { Heading, Stack, Text } from "@/components/ui";
import { cn } from "@/lib/utils";

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

/** Footer column with consistent heading and spacing. */
export function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div className={cn("brand-footer-column", className)}>
      <Stack gap="sm">
        <Heading level={3} variant="subtitle">
          {title}
        </Heading>
        {children}
      </Stack>
    </div>
  );
}

type FooterLinkListProps = {
  links: Array<{ id: string; label: string; href: string }>;
  className?: string;
};

function FooterLinkItem({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http") || href === "#";

  if (isExternal) {
    return (
      <a href={href} {...(href === "#" ? { "aria-disabled": true } : {})}>
        {label}
      </a>
    );
  }

  return <Link href={href}>{label}</Link>;
}

/** Vertical link list for footer columns. */
export function FooterLinkList({ links, className }: FooterLinkListProps) {
  return (
    <ul className={cn("brand-footer-links", className)}>
      {links.map((link) => (
        <li key={link.id}>
          <Text as="span" variant="caption" className="brand-link">
            <FooterLinkItem href={link.href} label={link.label} />
          </Text>
        </li>
      ))}
    </ul>
  );
}
