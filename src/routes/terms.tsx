import { createFileRoute } from "@tanstack/react-router";
import { PlainPage } from "@/components/unfussy/plain-page";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of service — unfussy.ai" },
      {
        name: "description",
        content: "These terms cover unfussy.ai and the courses and services Unfussy AI offers.",
      },
    ],
  }),
});

function TermsPage() {
  return (
    <PlainPage>
      <h1>Terms of service</h1>
      <p className="type-m text-soft plain-kicker">Last updated 2 October 2026</p>
      <p>These terms cover unfussy.ai and the courses and services Unfussy AI offers.</p>
      <h2>Bookings</h2>
      <p>A booking is confirmed once payment goes through Stripe and you receive your welcome email.</p>
      <h2>Changes and refunds</h2>
      <p>Plans change, and that is fine. You are welcome to move your place to the next course.</p>
      <p>Cancel more than 72 hours before the course starts for a full refund.</p>
      <p>Within 72 hours of the course start, we offer a place at the next course in place of a refund.</p>
      <h2>Our content</h2>
      <p>
        Course material, prompts and templates are for your own business to use. Please ask before sharing them
        on as your own.
      </p>
      <h2>Using AI tools</h2>
      <p>
        We teach and set up tools such as Claude. You stay in charge of what you do with them and how you check
        their work.
      </p>
      <h2>Contact</h2>
      <p>
        <a href="mailto:hello@unfussy.ai">hello@unfussy.ai</a>
      </p>
    </PlainPage>
  );
}
