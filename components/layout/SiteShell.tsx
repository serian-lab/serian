import type { ReactNode } from "react";

import { MotionProvider } from "@/components/providers";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LayoutDebugRegion } from "./LayoutDebugRegion";

type SiteShellProps = {
  children: ReactNode;
};

/** Global website shell shared by every page. */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <MotionProvider>
      <LayoutDebugRegion label="HEADER" order={1}>
        <Header />
      </LayoutDebugRegion>
      <main className="ui-site-main">{children}</main>
      <LayoutDebugRegion label="FOOTER" order={11}>
        <Footer />
      </LayoutDebugRegion>
    </MotionProvider>
  );
}
