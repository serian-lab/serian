import Link from "next/link";

import {
  BrandTagline,
  FooterColumn,
  FooterLinkList,
  TrustBanner,
} from "@/components/brand";
import { Container, Stack, Text } from "@/components/ui";
import { footerSite } from "@/content/global/footer";
import { contactPage } from "@/content/global/contact";
import { globalTrustMessage } from "@/content/global/trust";
import { getContact, getFooter, getNavigation } from "@/lib/content";

/** Site footer with brand block, support links, policies, and trust message. */
export function Footer() {
  const navigation = getNavigation();
  const footer = getFooter();
  const contact = getContact();

  return (
    <footer className="ui-site-footer">
      <Container>
        <Stack gap="2xl" className="brand-footer">
          <TrustBanner message={globalTrustMessage} variant="both" />

          <div className="brand-footer__grid">
            <FooterColumn title={navigation.brand.name} className="brand-footer__brand">
              <BrandTagline tagline={navigation.brand.tagline ?? ""} />
              <Text variant="caption">{footerSite.brandDescription}</Text>
              <Text variant="caption" className="brand-footer__contact">
                <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
              </Text>
              <Text variant="caption">{footerSite.copyright}</Text>
            </FooterColumn>

            <FooterColumn title="Support">
              <FooterLinkList links={footerSite.supportLinks} />
            </FooterColumn>

            <FooterColumn title="Policies">
              <FooterLinkList links={footer.legalLinks} />
            </FooterColumn>

            <FooterColumn title="Connect">
              <FooterLinkList links={footerSite.socialLinks} />
              <Text variant="caption" className="brand-footer__payment">
                {footerSite.paymentNote}
              </Text>
            </FooterColumn>
          </div>

          <div className="brand-footer__bottom">
            <Text variant="label" className="brand-footer__legal-note">
              Serian Lab · {contactPage.location}
            </Text>
          </div>
        </Stack>
      </Container>
    </footer>
  );
}

