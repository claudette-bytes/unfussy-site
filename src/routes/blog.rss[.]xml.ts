import { createFileRoute } from "@tanstack/react-router";
import { rssXml } from "@/lib/seo";

export const Route = createFileRoute("/blog/rss.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(rssXml(), {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        }),
    },
  },
});
