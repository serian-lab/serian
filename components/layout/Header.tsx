"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandTagline } from "@/components/brand";
import { Container, Heading, Stack, Text } from "@/components/ui";
import { getNavigation } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Site header — quiet on product pages, brand-forward elsewhere. */
export function Header() {
  const navigation = getNavigation();
  const pathname = usePathname();
  const isProductPage = pathname.startsWith("/products/");

  return (
    <header
      className={cn("ui-site-header", isProductPage && "ui-site-header--product")}
    >
      <Container>
        <div className="ui-site-header__inner">
          <div className="ui-site-header__brand">
            <Heading level={1} variant="title" className="ui-site-header__logo">
              <Link href="/">{navigation.brand.name}</Link>
            </Heading>
            {navigation.brand.tagline && !isProductPage && (
              <BrandTagline tagline={navigation.brand.tagline} />
            )}
          </div>
          {navigation.links.length > 0 && (
            <Stack
              as="ul"
              direction="horizontal"
              gap="md"
              aria-label="Primary"
              className="ui-site-header__nav"
            >
              {navigation.links.map((link) => (
                <li key={link.id}>
                  <Text as="span" variant="caption" className="brand-nav-link">
                    <Link href={link.href}>{link.label}</Link>
                  </Text>
                </li>
              ))}
            </Stack>
          )}
        </div>
      </Container>
    </header>
  );
}
