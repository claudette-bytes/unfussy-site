export type IndustryId =
  | "construction"
  | "hair"
  | "cafe"
  | "trades"
  | "studio"
  | "clinic"
  | "accounts"
  | "nfp";

export type Step = {
  title: string;
  body: string;
  you?: boolean;
};

export type Industry = {
  id: IndustryId;
  label: string;
  hook: string;
  steps: readonly Step[];
  prompts: readonly string[];
};

export const INDUSTRIES: readonly Industry[] = [
  {
    id: "construction",
    label: "Construction",
    hook: "Site notes in. Quote out. You stay on the yes.",
    steps: [
      { title: "An enquiry comes in", body: "Notes from the site visit. Measurements, extras, the awkward bit." },
      { title: "A quote is drafted in your voice", body: "Your rates. Your terms. No brochure-speak." },
      { title: "You read it and tap yes", body: "You check the numbers. It's still your name on it.", you: true },
      { title: "It goes to the client", body: "While the job is still warm. Not Sunday." },
      { title: "A follow-up if it's quiet", body: "A nudge that sounds like you. Not a collections letter." },
      { title: "A job sheet for the crew", body: "Order of work. What not to touch. Thursday, sorted." },
    ],
    prompts: [
      "Here are my notes from this morning's site visit and our usual rates. Write the quote in our format, usual terms at the bottom, no brochure-speak.",
      "This quote went out 11 days ago and we haven't heard back. Draft a short follow-up that sounds like me — not a collections letter.",
      "Turn these site notes into a one-page job sheet for the crew for Thursday. Measurements, extras, what not to touch.",
      "A client asked why the variation is $4,200. Explain it plainly, in my voice, without sounding defensive.",
      "Summarise this spec into three options: cheap, usual, and the one I'd actually recommend — with a one-line why.",
    ],
  },
  {
    id: "hair",
    label: "Hair & beauty",
    hook: "Photos on your phone. A week of posts. You tap yes.",
    steps: [
      { title: "Photos land on your phone", body: "The ones you'd actually post. Your camera roll." },
      { title: "Captions are drafted in your voice", body: "Warm. Short. Never influencer-speak." },
      { title: "You read it and tap yes", body: "You keep the ones that sound like you.", you: true },
      { title: "The week gets posted", body: "No Sunday in Canva." },
      { title: "A booking nudge goes out", body: "The Thursday gap at 2. Easy to book." },
      { title: "A review request after the cut", body: "Grateful. Specific. Not corporate." },
    ],
    prompts: [
      "Here are six photos from the salon this week. Write captions in my voice — warm, short, no influencer-speak — and one line that makes it easy to book.",
      "Draft a week of Instagram stories: Monday through Saturday, including a last-minute gap on Thursday at 2.",
      "A regular cancelled last minute again. Write a kind but clear text about our cancellation note, in my voice.",
      "Turn this colour formula and these aftercare notes into a take-home card the client will actually read.",
      "Write a reply to this Google review. Grateful, specific, not corporate.",
    ],
  },
  {
    id: "cafe",
    label: "Café",
    hook: "Today's specials. Board, post, staff text. You tap yes.",
    steps: [
      { title: "Today's specials are in", body: "The pastry left. The blender that's sulking." },
      { title: "The board is drafted in your voice", body: "Neighbourhood. Not a brand deck." },
      { title: "You read it and tap yes", body: "You're still the one who says it out loud.", you: true },
      { title: "Instagram and the staff text go", body: "Same news. Three shapes." },
      { title: "A supplier chase is written", body: "Firm. Still someone you'd see at the markets." },
      { title: "The week-in-review lands", body: "Takings, in English. Two minutes." },
    ],
    prompts: [
      "Today's specials are below. Write the chalkboard, a short Instagram caption, and a text I can send the staff — same facts, my casual voice.",
      "We had a rush and a complaint about a long wait. Draft a calm reply I can post, and a one-line note for the team.",
      "Turn this week's invoices and takings notes into a plain-English 'how the week went' I can read in two minutes.",
      "Write a supplier email chasing the oat milk that didn't arrive, firm but still someone I'd see at the markets.",
      "A regular asked if we can do a 20-person takeaway lunch Friday. Draft three questions I should ask before I say yes.",
    ],
  },
  {
    id: "trades",
    label: "Trades",
    hook: "Notes off the van. Sheet, invoice, done. You tap yes.",
    steps: [
      { title: "Notes off the van", body: "What you saw. What you quoted. The fiddly bit." },
      { title: "A job sheet is drafted", body: "Order of work. Materials. What not to do." },
      { title: "You read it and tap yes", body: "The apprentice still reports to you.", you: true },
      { title: "The crew has the sheet", body: "Not a guess. The actual job." },
      { title: "The invoice goes out", body: "On the driveway. Not Saturday." },
      { title: "A 'what we did' note follows", body: "Photos in. Plain language out." },
    ],
    prompts: [
      "Here are my voice notes from the job. Write a job sheet for the apprentice: order of work, materials, what not to do.",
      "Write the invoice for this job in our format. Include the extras we agreed on site, in plain language.",
      "A customer wants it cheaper. Draft a text that holds the price without a speech.",
      "Turn these photos of the install into a short 'what we did' I can send with the invoice.",
      "Remind me, in a checklist, what I always forget on a switchboard job.",
    ],
  },
  {
    id: "studio",
    label: "Studio",
    hook: "The call. The proposal. You tap yes while it's hot.",
    steps: [
      { title: "The call notes land", body: "What they want. What they think they want." },
      { title: "A proposal is drafted in your voice", body: "What's in. What's not. Two options." },
      { title: "You read it and tap yes", body: "No 40-page PDF from 2014.", you: true },
      { title: "It goes while it's hot", body: "Same day as the call." },
      { title: "Kickoff is ready", body: "What you need by Friday." },
      { title: "Scope creep gets a calm note", body: "Extras named. No speech." },
    ],
    prompts: [
      "Here are my notes from the discovery call. Write a one-page proposal in our voice: what's in, what's not, two options, no waffle.",
      "Draft a kickoff email for this job: what I need from them by Friday, in a tone that still sounds like me.",
      "This client is adding extras without saying extras. Write a calm scope note I can paste into the thread.",
      "Turn this messy feedback into three clear changes and one thing I'm pushing back on.",
      "Write a case-study paragraph of this finished job, 80 words, no awards language.",
    ],
  },
  {
    id: "clinic",
    label: "Clinic",
    hook: "Who's due. A reminder in your voice. You tap yes.",
    steps: [
      { title: "Who's due this month", body: "The list. The last visit. Nothing they shouldn't see." },
      { title: "A reminder is drafted in your voice", body: "Warm. Clear. Never salesy." },
      { title: "You read it and tap yes", body: "The voice they already trust.", you: true },
      { title: "SMS and email go out", body: "Same facts. Easy to book." },
      { title: "The book fills", body: "Without you chasing at 9pm." },
      { title: "A welcome note for new patients", body: "What to bring. How to park." },
    ],
    prompts: [
      "Draft a recall SMS and a short email for patients due this month. Warm, clear, no scare language, easy to book.",
      "Write a new-patient welcome note: what to bring, how to park, how we run the first visit.",
      "A patient asked us to explain this treatment in plain English. Keep it accurate and human, no Dr Google.",
      "Draft a polite note about missed appointments and how to reschedule.",
      "Turn these team huddle notes into three actions for tomorrow morning.",
    ],
  },
  {
    id: "accounts",
    label: "Accounts",
    hook: "The month. In English. You tap yes before BAS.",
    steps: [
      { title: "The month's numbers land", body: "The snapshot. The questions they always ask." },
      { title: "A client update is drafted", body: "Plain English. The uncomfortable line, kindly." },
      { title: "You read it and tap yes", body: "You still sign it.", you: true },
      { title: "It goes before BAS", body: "Not the night before." },
      { title: "Invoice chasers go out", body: "Firm. Still someone they'd ring back." },
      { title: "The shoebox becomes a list", body: "What you still need from them." },
    ],
    prompts: [
      "Here is this month's snapshot. Write a client update in plain English: what went well, what to watch, one thing to do before the 21st.",
      "Draft an email chasing outstanding invoices. Firm, still someone they'd ring back.",
      "Explain this BAS adjustment to a client who hates numbers. Short. No condescension.",
      "Turn this messy shoebox list into a 'what I still need from you' checklist.",
      "Write a kickoff note for a new client: how we work, what we need monthly, how to send it.",
    ],
  },
  {
    id: "nfp",
    label: "Not-for-profit",
    hook: "A gift. A thank-you that sounds like a person. You tap yes.",
    steps: [
      { title: "A gift comes in", body: "Who gave. What for. Nothing you wouldn't say out loud." },
      { title: "A thank-you is drafted", body: "Specific. Warm. Not a mail-merge." },
      { title: "You read it and tap yes", body: "You're still the one who signs it.", you: true },
      { title: "It goes with your name on it", body: "Email, and a two-line SMS." },
      { title: "The board gets a one-pager", body: "Three wins. One risk. One ask." },
      { title: "Grant notes file on time", body: "Honest. No padding. No Sunday saga." },
    ],
    prompts: [
      "Write a thank-you email for this donation. Specific to the program, warm, no mail-merge voice. I'm signing it.",
      "Turn these program notes into a one-page update for the board. Three wins, one risk, one ask.",
      "Draft answers to these grant-report headings using the notes below. Honest. No padding.",
      "A volunteer didn't show. Write a kind check-in text, and a backup plan note for the coordinator.",
      "Write a social post about this week's outcome that isn't cringe and isn't a guilt trip.",
    ],
  },
] as const;

export function industryById(id: IndustryId) {
  return INDUSTRIES.find((i) => i.id === id) ?? INDUSTRIES[0];
}
