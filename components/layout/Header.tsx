"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container, Heading, Text } from "@/components/ui";
import { getNavigation } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Site header — editorial minimal chrome, quiet on product pages. */
export function Header() {
  const navigation = getNavigation();
  const pathname = usePathname();
  const isProductPage = pathname.startsWith("/products/");

  return (
    <header
      className={cn(
        "ui-site-header serian-i06-header",
        isProductPage && "serian-i06-header--product",
      )}
    >
      <Container className="serian-i06-header__container">
        <div className="serian-i06-header__inner">
          <Heading level={1} variant="title" className="serian-i06-header__logo">
            <Link href="/">{navigation.brand.name}</Link>
          </Heading>

          {navigation.links.length > 0 && (
            <ul aria-label="Primary" className="serian-i06-header__nav">
              {navigation.links.map((link) => (
                <li key={link.id}>
                  <Text as="span" variant="label" className="serian-i06-header__nav-link">
                    <Link href={link.href}>{link.label}</Link>
                  </Text>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </header>
  );
}
