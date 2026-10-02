import { OFFERINGS } from "./site-data";
import { listPosts } from "./blog";

export const SITE_ORIGIN = "https://unfussy.ai";

const STATIC_PATHS = ["/", "/sessions", "/brand", "/kit", "/privacy", "/terms", "/blog", "/blog/rss.xml"];

export function sitemapPaths() {
  const offerings = OFFERINGS.filter((item) => item.id !== "friday-fix").map((item) => `/do/${item.id}`);
  const posts = listPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: post.updated,
  }));
  return [
    ...STATIC_PATHS.map((path) => ({ path, lastmod: undefined as string | undefined })),
    ...offerings.map((path) => ({ path, lastmod: undefined as string | undefined })),
    ...posts,
  ];
}

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

function rssDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return iso;
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))).toUTCString();
}

export function rssXml() {
  const items = listPosts()
    .map((post) => {
      const link = `${SITE_ORIGIN}/blog/${post.slug}`;
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${link}</link>
      <description>${xmlEscape(post.summary)}</description>
      <pubDate>${rssDate(post.published)}</pubDate>
      <guid>${link}</guid>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog — unfussy.ai</title>
    <link>${SITE_ORIGIN}/blog</link>
    <description>Notes from Bel and Claudette on using AI without the fuss.</description>
${items}
  </channel>
</rss>
`;
}

export function sitemapXml() {
  const urls = sitemapPaths()
    .map((entry) => {
      const loc = `${SITE_ORIGIN}${entry.path}`;
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function robotsTxt() {
  const bots = [
    "*",
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "Google-Extended",
    "GoogleOther",
    "Applebot",
    "Applebot-Extended",
    "anthropic-ai",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Amazonbot",
    "Bytespider",
    "CCBot",
    "cohere-ai",
    "Meta-ExternalAgent",
    "FacebookBot",
    "DuckAssistBot",
  ];
  const groups = bots.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n");
  return `${groups}\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}
