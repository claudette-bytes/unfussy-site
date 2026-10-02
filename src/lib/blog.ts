/**
 * Blog posts live in content/blog/*.md.
 * A new post is a new file. Nothing else has to be registered.
 *
 * ---
 * title: The question, answered in the title
 * summary: One line for the blog list and the page description.
 * author: Claudette
 * published: 2026-10-02
 * updated: 2026-10-02
 * ---
 *
 * Opening paragraph that answers the question straight away.
 *
 * ## A subheading
 */

export type BlogAuthor = "Claudette" | "Bel";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  author: BlogAuthor;
  published: string;
  updated: string;
  body: string;
};

const rawPosts = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function unquote(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFile(path: string, source: string): BlogPost | null {
  const text = source.replace(/^\uFEFF/, "");
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end < 0) return null;
  const fields: Record<string, string> = {};
  for (const line of text.slice(4, end).split("\n")) {
    const match = /^([A-Za-z][A-Za-z ]*):\s*(.*)$/.exec(line);
    if (!match) continue;
    fields[match[1].trim().toLowerCase()] = unquote(match[2]);
  }
  const title = fields.title;
  const summary = fields.summary;
  const author = fields.author;
  const published = fields.published ?? fields["date published"];
  const updated = fields.updated ?? fields["date updated"];
  if (!title || !summary || !published || !updated) return null;
  if (author !== "Claudette" && author !== "Bel") return null;
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return {
    slug,
    title,
    summary,
    author,
    published,
    updated,
    body: text.slice(end + 4).replace(/^\r?\n/, ""),
  };
}

export function listPosts(): BlogPost[] {
  return Object.entries(rawPosts)
    .map(([path, source]) => parseFile(path, source))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : a.slug.localeCompare(b.slug)));
}

export function getPost(slug: string): BlogPost | null {
  return listPosts().find((post) => post.slug === slug) ?? null;
}

export function formatPostDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return iso;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
