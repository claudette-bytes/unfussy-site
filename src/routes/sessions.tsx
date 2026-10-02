import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/unfussy/chrome";
import { EnquireDialog } from "@/components/unfussy/enquire";
import { JumpDock } from "@/components/unfussy/jump";
import { Sessions } from "@/components/unfussy/sessions";

export const Route = createFileRoute("/sessions")({
  component: SessionsPage,
  head: () => ({
    meta: [
      { title: "Dates — unfussy.ai" },
      {
        name: "description",
        content:
          "Upcoming unfussy.ai sessions. Next up: Thu 29 Oct 2026 · Your First AI Course · Avalon · $199.",
      },
    ],
  }),
});

function SessionsPage() {
  return (
    <div className="relative min-h-dvh bg-paper text-ink has-jump">
      <SiteHeader />
      <main>
        <Sessions standalone />
      </main>
      <SiteFooter />
      <JumpDock />
      <EnquireDialog />
    </div>
  );
}
