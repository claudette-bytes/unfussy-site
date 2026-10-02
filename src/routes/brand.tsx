import { createFileRoute } from "@tanstack/react-router";
import { BrandKit } from "@/components/unfussy/brand";

export const Route = createFileRoute("/brand")({
  component: BrandPage,
  head: () => ({
    meta: [
      { title: "unfussy.ai — Brand kit" },
      {
        name: "description",
        content: "The unfussy kit. Mark, colour, type, and a voice that does not say leverage.",
      },
    ],
  }),
});

function BrandPage() {
  return <BrandKit />;
}
