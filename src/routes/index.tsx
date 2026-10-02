import { createFileRoute } from "@tanstack/react-router";
import { UnfussySite } from "@/components/unfussy/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "unfussy.ai" },
      {
        name: "description",
        content:
          "Bel and Claudette teach AI until it feels comfortable to use. Courses, the build, and a fortnightly membership.",
      },
    ],
  }),
});

function Home() {
  return <UnfussySite />;
}
