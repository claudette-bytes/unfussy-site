import { createFileRoute } from "@tanstack/react-router";
import { PlainPage } from "@/components/unfussy/plain-page";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy policy — unfussy.ai" },
      {
        name: "description",
        content:
          "Unfussy AI is run by Claudette Good and Belinda Roets on the Northern Beaches of Sydney. This page explains what we collect and what we do with it.",
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <PlainPage>
      <h1>Privacy policy</h1>
      <p className="type-m text-soft plain-kicker">Last updated 2 October 2026</p>
      <p>
        Unfussy AI is run by Claudette Good and Belinda Roets on the Northern Beaches of Sydney. This page
        explains what we collect and what we do with it.
      </p>
      <h2>What we collect</h2>
      <p>
        When you book a course, we collect your name, email, phone number, business name and whether you would
        like emails from us. Payments are handled by Stripe, so your card details go to Stripe and stay with
        them.
      </p>
      <p>When you sign up for our emails, we collect your name, email and business type.</p>
      <p>When you message us, we keep the message so we can reply.</p>
      <h2>How we use it</h2>
      <p>
        To run your booking, send your welcome email and course details, and keep in touch about the course you
        booked. If you said yes to emails, we also send news, tips and new dates. You can unsubscribe from any
        email at any time.
      </p>
      <h2>Where it is kept</h2>
      <p>Your details are kept in our own customer system, hosted on Cloudflare. Our emails are sent through Brevo.</p>
      <h2>Social media</h2>
      <p>
        We connect our own social media accounts (including TikTok, Instagram, Facebook and LinkedIn) so we can
        publish and manage Unfussy's own posts. We use that access for our accounts only.
      </p>
      <h2>Your details stay with us</h2>
      <p>We keep your details private and use them only for the reasons above.</p>
      <h2>Seeing or changing your details</h2>
      <p>
        Email <a href="mailto:hello@unfussy.ai">hello@unfussy.ai</a> and we will show you what we hold, update it
        or delete it.
      </p>
      <h2>Contact</h2>
      <p>
        <a href="mailto:hello@unfussy.ai">hello@unfussy.ai</a>
      </p>
    </PlainPage>
  );
}
