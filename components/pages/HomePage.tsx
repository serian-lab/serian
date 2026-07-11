import Link from "next/link";

import { TrustBanner } from "@/components/brand";
import { Button, Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { homePage } from "@/content/global/home";

/** Brand home page — introduces Serian before product discovery. */
export function HomePage() {
  return (
    <Section aria-label="Home" className="brand-page brand-page--home">
      <Container width="content">
        <Stack gap="2xl">
          <Stack gap="lg" className="brand-home-hero">
            <Heading level={1} variant="display">
              {homePage.headline}
            </Heading>
            <Text className="brand-page__lead">{homePage.introduction}</Text>
            <Stack direction="horizontal" gap="md" className="brand-home-cta">
              <Link href={homePage.primaryCta.href}>
                <Button type="button">{homePage.primaryCta.label}</Button>
              </Link>
              <Link href={homePage.secondaryCta.href} className="brand-link-button">
                <Text variant="label">{homePage.secondaryCta.label}</Text>
              </Link>
            </Stack>
            <TrustBanner variant="badges" />
          </Stack>

          <div className="brand-home-grid">
            {homePage.highlights.map((highlight) => (
              <Card key={highlight.title} className="brand-home-card">
                <Stack gap="sm">
                  <Heading level={2} variant="title">
                    {highlight.title}
                  </Heading>
                  <Text variant="caption">{highlight.description}</Text>
                </Stack>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
