import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

type SiteShellProps = {
  children: ReactNode;
};

/** Global website shell shared by every page. */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Header />
      <main className="ui-site-main">{children}</main>
      <Footer />
    </>
  );
}
