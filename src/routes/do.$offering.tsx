import { createFileRoute, notFound } from "@tanstack/react-router";
import { OfferingPage } from "@/components/unfussy/offering-page";
import { OFFERINGS, type Offering } from "@/lib/site-data";

const LISTED = OFFERINGS.filter((o) => o.id !== "friday-fix");
const IDS = new Set<string>(LISTED.map((o) => o.id));

export const Route = createFileRoute("/do/$offering")({
  component: OfferingRoute,
  head: ({ params }) => {
    const item = LISTED.find((o) => o.id === params.offering);
    return {
      meta: [
        { title: item ? `${item.title} — unfussy.ai` : "unfussy.ai" },
        { name: "description", content: item?.short ?? "" },
      ],
    };
  },
});

function OfferingRoute() {
  const { offering } = Route.useParams();
  if (!IDS.has(offering)) throw notFound();
  return <OfferingPage id={offering as Exclude<Offering, "unsure" | "friday-fix">} />;
}
