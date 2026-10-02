import { createFileRoute } from "@tanstack/react-router";
import { PlainPage } from "@/components/unfussy/plain-page";
import { formatPostDate, listPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  loader: () => listPosts(),
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — unfussy.ai" },
      {
        name: "description",
        content: "Notes from Bel and Claudette on using AI without the fuss.",
      },
    ],
  }),
});

function BlogPage() {
  const posts = Route.useLoaderData();
  return (
    <PlainPage>
      <h1>Blog</h1>
      <ul className="blog-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>
              <span className="type-m text-soft">{formatPostDate(post.published)}</span>
              <span className="blog-title">{post.title}</span>
              <span className="body-m">{post.summary}</span>
            </a>
          </li>
        ))}
      </ul>
    </PlainPage>
  );
}
