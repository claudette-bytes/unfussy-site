import { createFileRoute, notFound } from "@tanstack/react-router";
import { Markdown } from "@/components/unfussy/markdown";
import { PlainPage } from "@/components/unfussy/plain-page";
import { formatPostDate, getPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — unfussy.ai` : "unfussy.ai" },
      { name: "description", content: loaderData?.summary ?? "" },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  return (
    <PlainPage>
      <h1>{post.title}</h1>
      <p className="type-m text-soft plain-kicker">
        Published {formatPostDate(post.published)}
        <span className="plain-dot" aria-hidden="true">
          ·
        </span>
        Updated {formatPostDate(post.updated)}
      </p>
      <Markdown source={post.body} />
      <p className="plain-end">
        <a href="/sessions">See the course dates.</a>
      </p>
    </PlainPage>
  );
}
