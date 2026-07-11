import type { Metadata } from "next";

import { SiteShell } from "@/components/layout";
import { getNavigation } from "@/lib/content";
import { isLayoutDebugEnabled } from "@/lib/layout-debug";
import "@/styles/globals.css";

const navigation = getNavigation();

export const metadata: Metadata = {
  title: {
    default: navigation.brand.name,
    template: `%s | ${navigation.brand.name}`,
  },
  description: navigation.brand.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="ui-body" data-layout-debug={isLayoutDebugEnabled() ? "true" : "false"}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
