import type { ReactNode } from "react";
import { EnquireDialog } from "./enquire";
import { SiteFooter, SiteHeader } from "./chrome";
import { JumpDock } from "./jump";

export function PlainPage({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-paper text-ink has-jump">
      <SiteHeader />
      <main className="site-section">
        <div className="sheet">
          <article className="plain">{children}</article>
        </div>
      </main>
      <SiteFooter />
      <JumpDock />
      <EnquireDialog />
    </div>
  );
}
