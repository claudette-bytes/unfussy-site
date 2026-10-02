export const MAIL = "hello@unfussy.ai";

export const WE_DO = [
  "We teach you AI. Then we get out of the way.",
  "Six weeks. One hour. The afters.",
  "From the start. All the way to Cowork.",
  "Your room. Your jobs. Same unfussy teaching.",
  "We come in. We automate the grind.",
  "We keep an eye on it. You're first in.",
  "Live. Worldwide from Sydney's Northern Beaches.",
  "Come on. Unfuss it.",
] as const;

export const NOISE = [
  "vector embeddings",
  "agentic workflows",
  "RAG pipelines",
  "fine-tuning",
  "context windows",
  "multimodal",
  "tokens per second",
  "prompt chaining",
  "inference cost",
  "LLMOps",
  "temperature settings",
  "chain of thought",
  "parameter counts",
  "synthetic data",
] as const;

export const SECTIONS = [
  { id: "do", label: "What we do", depth: "0" },
  { id: "sessions", label: "Dates", depth: "0" },
  { id: "surface", label: "The splash", depth: "0" },
  { id: "one", label: "One chat", depth: "3" },
  { id: "dont", label: "To-don't", depth: "12" },
  { id: "friday", label: "Friday", depth: "24" },
  { id: "us", label: "About", depth: "0" },
  { id: "proof", label: "The receipts", depth: "0" },
  { id: "ways", label: "Ways in", depth: "0" },
] as const;

export const PROMPT =
  "Here are my notes from this morning's site visit. Write the quote, write the follow-up to Sandra, and give me a job sheet for Thursday.";

export const REPLIES = [
  "A quote in your format, usual terms at the bottom, no brochure-speak",
  "An email that sounds like you, because you taught it how you write",
  "A job sheet with the measurements off your notes, not a guess",
  "Three things in the notes you had forgotten about. You're welcome.",
] as const;

export const DONT = [
  {
    n: "01",
    title: "The quote you rewrite in your sleep",
    body: "Once it knows your prices and your tone, a quote is a two-minute job. Not a Sunday-night saga.",
  },
  {
    n: "02",
    title: "The invoice that ghosted you",
    body: "Firm for the repeat offender. Gentle for the good customer. Drafted. Waiting for your yes.",
  },
  {
    n: "03",
    title: "The caption-box staring contest",
    body: "A week of posts in your own words, from the photos already on your phone. No 'synergy'.",
  },
  {
    n: "04",
    title: "The meeting that never ends on paper",
    body: "Notes in. Actions out. Follow-up written before you're back in the car.",
  },
  {
    n: "05",
    title: "The numbers you squint at",
    body: "Last month in plain English. Including the bit you'd rather not look at.",
  },
  {
    n: "06",
    title: "The email you've been dodging",
    body: "The hard one. Written, softened, sitting in drafts, waiting for your spine.",
  },
] as const;

export const FRIDAY = [
  {
    title: "Out the door by two",
    body: "The invoicing does not get a vote. Lucky for you, it is already done.",
  },
  {
    title: "The thing you keep meaning to do",
    body: "The walk. The gym. The kid's game. On a weekday. Wild concept.",
  },
  {
    title: "Dinner, not a desk",
    body: "The admin hour between five and six has packed its bags.",
  },
  {
    title: "A Saturday that's yours",
    body: "Because the quoting happened on Wednesday, like a grown-up.",
  },
] as const;

export const FACTS = [
  { dt: "The point", dd: "You feel comfortable using the tool." },
  { dt: "We teach", dd: "Any AI. The one you already open." },
  { dt: "Scale", dd: "One person, or the whole crew." },
  { dt: "Promise", dd: "Clear where it counts. Calm everywhere else." },
] as const;

export type Offering =
  | "friday-fix"
  | "course"
  | "social"
  | "training"
  | "automation"
  | "services"
  | "membership"
  | "unsure";

export const OFFERINGS: {
  id: Exclude<Offering, "unsure">;
  duration: string;
  title: string;
  subtitle?: string;
  short: string;
  body: string;
  beats: readonly string[];
  price: string;
  priceNote?: string;
  subject: string;
  image: string;
  alt: string;
}[] = [
  {
    id: "friday-fix",
    duration: "Six weeks · one hour a week",
    title: "The Friday Fix",
    short: "The afters. You bring the leftover questions. We bring the rest.",
    body: "Usually after a course. Six weeks, one hour a week. You bring whatever came up once you were back at your desk. If you haven't got questions this week, we don't fill it with fluff — we cover the good stuff the course didn't reach. Then we move on.",
    beats: [
      "Six weeks. One hour a week.",
      "Typically after a course, so the leftover questions don't rot.",
      "No questions this week? We go into the bits we didn't get to.",
    ],
    price: "$60 / six sessions",
    subject: "The Friday Fix",
    image: "/unfussy/friday-fix-c.jpg",
    alt: "Claudette at the kitchen table, laptop open, the Friday Fix",
  },
  {
    id: "course",
    duration: "From the start · any AI",
    title: "Your First AI Course",
    subtitle: "the course. Any tool. Set up properly.",
    short: "We set your AI up properly. Then we put it on the work you already do.",
    body: "The starting level — not a 'beginner' badge. Even if you've been using Claude, Grok, or whatever for months, if it wasn't set up right you're burning tokens and getting cross. We set it up properly, on the AI you actually use, then walk you through until a real job is running. You leave knowing it. Not guessing.",
    beats: [
      "From zero. Or from 'I've been making it up as I go'.",
      "Setup first, so it stops eating tokens and your patience.",
      "Any AI. Your jobs. Not one brand's demo.",
    ],
    price: "$199",
    subject: "Your First AI Course",
    image: "/unfussy/course-d.jpg",
    alt: "Belinda stretching after four weeks of work at the kitchen table",
  },
  {
    id: "social",
    duration: "Talking Social · $249",
    title: "Talking Social",
    subtitle: "a week of posts, in your voice",
    short: "The photos already on your phone. Captions that sound like you.",
    body: "The caption-box staring contest, over. We teach you to get a week of social out in your own words — from the photos you've already taken. No 'synergy'. No content calendar that dies on Tuesday. You leave posting, not planning to post.",
    beats: [
      "Your photos. Your voice. A week of posts.",
      "Captions, stories, the booking nudge.",
      "No influencer-speak. You'd actually hit send.",
    ],
    price: "$249",
    subject: "Talking Social",
    image: "/unfussy/talking-social.jpg",
    alt: "Claudette laughing, phone up, filming a post",
  },
  {
    id: "training",
    duration: "The whole crew · rewritten for you",
    title: "Corporate training",
    short: "Same unfussy teaching. Written for your business, not a generic deck.",
    body: "The same courses — taught to a room. Corporates, crews, the whole floor. We rewrite it around your work, your tools, your language. Not a webinar. Not a one-size deck with your logo stuck on.",
    beats: [
      "Same teaching as the table. Bigger room.",
      "Modified for the business. Your jobs, not ours.",
      "The crew leaves speaking the same language.",
    ],
    price: "Enquire",
    subject: "Corporate training",
    image: "/unfussy/training-f.jpg",
    alt: "Claudette teaching a large-group sitting, laptops open around the room",
  },
  {
    id: "automation",
    duration: "The course · you learn it",
    title: "Automation",
    subtitle: "Automations and agents, in the training",
    short: "You learn to build it. This one is not done for you.",
    body: "This is the training. You sit it and learn how automations and agents work on your own jobs: the follow-up that never went out, the quote you rewrite, the inbox, the Tuesday admin. We use the AI you already open. You leave able to build the next one, and change it, without us in the chair. Automate Your Admin and Build Your Own Assistant are the two courses. Both $399, or $319 if you've already sat with us.",
    beats: [
      "You learn it in the room. We do not build it for you here.",
      "Your jobs: quotes, follow-ups, the inbox, the repeat admin.",
      "Automate Your Admin and Build Your Own Assistant. $399, or $319 if you've sat with us.",
    ],
    price: "$399",
    priceNote: "$319 graduates",
    subject: "Automation course",
    image: "/unfussy/automation-e.jpg",
    alt: "Belinda at the laptop, learning the automation on a real job",
  },
  {
    id: "services",
    duration: "We build it for you",
    title: "Professional services",
    subtitle: "After the training, if you'd rather hand it over",
    short: "We come in and build the automation. You get the hours back.",
    body: "The course is where you learn it. This is where we build it for you. We come into the business and set the automation up in the tools you already use, on the jobs that actually steal the week. You still own it. We do not leave a black box, and we do not sell you a platform.",
    beats: [
      "We build it. You do not have to.",
      "Your tools, your jobs, your name still on the work.",
      "After the training, when you know what you want running.",
    ],
    price: "Enquire",
    subject: "Professional services",
    image: "/unfussy/automation.jpg",
    alt: "The automation being built on a real business job",
  },
  {
    id: "membership",
    duration: "Fortnightly · 60 minutes",
    title: "The Membership",
    short: "A live hour every fortnight, so using AI stays comfortable.",
    body: "Sixty minutes, every fortnight, $55 a month. You bring the job that's stuck. We sit with you while you try it, fix it, and leave with it moved. Not another course. The room you come back to so the tool stays comfortable to use.",
    beats: [
      "Fortnightly. One live hour.",
      "Sixty minutes, on your actual job.",
      "$55 a month.",
    ],
    price: "$55/mo",
    subject: "The Membership",
    image: "/unfussy/membership-f.jpg",
    alt: "A fortnightly membership hour, laptops open",
  },
];

export const LIVE_OFFERINGS = OFFERINGS.filter(
  (o) => o.id !== "membership" && o.id !== "friday-fix" && o.id !== "services",
);

export const MORE_PRICES = [
  { name: "Automate Your Admin", price: "$399", note: "$319 graduates" },
  { name: "Build Your Own Assistant", price: "$399", note: "$319 graduates" },
] as const;

export const HEADLINE_SESSION = {
  when: "Thu 29 Oct 2026",
  what: "Your First AI Course",
  where: "Avalon",
  price: "$199",
  notes: "Full day",
} as const;

export type SessionCta = {
  label: string;
  subject: string;
  href?: string;
};

export const COURSE_BOOK_URL = "https://buy.stripe.com/cNi5kw9mx8o2doX9Ht3ZK08";
export const AUTOMATION_BOOK_URL = "https://buy.stripe.com/6oU4gs9mxdIm98H9Ht3ZK0a";

export const SESSIONS: {
  when: string;
  whenSub?: string;
  what: string;
  where: string;
  price: string;
  notes: string;
  cta: SessionCta;
  headline?: boolean;
}[] = [
  {
    when: "Thu 29 Oct 2026",
    what: "Your First AI Course",
    where: "Avalon",
    price: "$199",
    notes: "Full day",
    headline: true,
    cta: {
      label: "Book",
      subject: "Book 29 Oct — Your First AI Course",
      href: COURSE_BOOK_URL,
    },
  },
  {
    when: "Dates opening",
    what: "Talking Social",
    where: "Online or in the room",
    price: "$249",
    notes: "Tell us you're keen",
    cta: { label: "Book", subject: "Talking Social — join the list" },
  },
  {
    when: "Thu 19 Nov 2026",
    what: "Automations and Agents",
    where: "Avalon",
    price: "$399",
    notes: "$319 graduates",
    cta: {
      label: "Book",
      subject: "Book 19 Nov — Automations and Agents",
      href: AUTOMATION_BOOK_URL,
    },
  },
  {
    when: "Thu 25 Feb 2027",
    what: "Your First AI Course",
    where: "Dee Why",
    price: "$199",
    notes: "Waitlist",
    cta: { label: "Join waitlist", subject: "Waitlist — Your First AI Course 25 Feb 2027" },
  },
  {
    when: "When you need the room",
    what: "Corporate training",
    where: "Your workplace",
    price: "Enquire",
    notes: "Rewritten for the business",
    cta: { label: "Enquire", subject: "Corporate training" },
  },
];

export const CLIENTS = [
  "Painter",
  "Café",
  "Builder",
  "Studio",
  "Accountant",
  "Florist",
  "Consultant",
  "Clinic",
  "Workshop",
  "Coach",
  "Retail",
  "Tradie",
] as const;

export const MEMBERSHIPS = [
  { name: "Any AI", meta: "The tools we teach" },
  { name: "Small Business Alliance", meta: "Member" },
  { name: "Women in Training", meta: "Member" },
] as const;

export const HOUR = [
  {
    t: "00–10",
    title: "You dump the job",
    body: "The quote, the invoice, the email you've been not-writing. Live. On your laptop. No made-up example, no TED Talk.",
  },
  {
    t: "10–40",
    title: "We unfuss it",
    body: "You talk. We set it up in your voice. You watch it land in your own words, on your actual work. Slightly magic. Entirely practical.",
  },
  {
    t: "40–55",
    title: "You take the wheel",
    body: "You run the next one yourself, with us still on the call. That's the bit that sticks. That's the bit you take home.",
  },
  {
    t: "55–60",
    title: "You leave running",
    body: "Not notes. Not a slide deck. The job, done, and a way to do Monday without us hovering.",
  },
] as const;

export const FAQ = [
  {
    q: "Do I need to know anything about AI?",
    a: "If you can explain the job to a new apprentice, you can do this. Talking is the whole skill. We unfuss the rest.",
  },
  {
    q: "I tried ChatGPT and it sounded like a brochure.",
    a: "Of course it did. It writes like a brochure until you teach it how you write. Teaching it your tone is the first thing we do, and it is not technical. It is slightly rude to the robot, and it works.",
  },
  {
    q: "Will you sell me software?",
    a: "Absolutely not. We are not a tech company. You leave with the work running on tools you already have, or ones we help you pick. If a tool is not worth the money, we say so. Then we move on with our lives.",
  },
  {
    q: "Where is this, and how many people?",
    a: "Your First AI Course is where you start: any AI, set up properly, then onto your real work. Talking Social turns the photos on your phone into a week of posts in your voice. Corporate training is the same teaching, rewritten for the business. The membership is fortnightly, sixty minutes. Dates are on the list.",
  },
  {
    q: "Is the automation course the same as you building it?",
    a: "No. The Automation course is the training. You learn automations and agents on your own jobs, and you leave able to build the next one. Professional services is the other offer: we come in and build the automation for you. The membership is the fortnightly hour so it stays comfortable once you are back at your desk.",
  },
  {
    q: "What does it cost?",
    a: "Your First AI Course is $199. Talking Social is $249. Automate Your Admin and Build Your Own Assistant are $399, or $319 if you've already sat with us. Automations and Agents on 19 November is $399 ($319 graduates). The membership is $55 a month, fortnightly, 60 minutes. Corporate training and professional services: enquire, and we'll tell you straight.",
  },
  {
    q: "Is my work confidential?",
    a: "Yes. We work on your actual business live with you. We do not keep your quotes, your invoices, or your customer names. It's still your name on it. We're just the unfussers.",
  },
] as const;

export function mailTo(subject: string) {
  return `mailto:${MAIL}?subject=${encodeURIComponent(subject)}`;
}
