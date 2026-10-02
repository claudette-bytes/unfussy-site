import { useEffect, useRef, useState } from "react";
import {
  DONT,
  FAQ,
  FACTS,
  FRIDAY,
  HOUR,
  MAIL,
  MORE_PRICES,
  NOISE,
  LIVE_OFFERINGS,
  PROMPT,
  REPLIES,
} from "@/lib/site-data";
import { OFFERING_ICONS } from "./jump";
import { Reveal, useInView } from "./reveal";
import { useEnquire } from "./store";

export function Hero() {
  const openEnquire = useEnquire((s) => s.openEnquire);
  const film = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = film.current;
    if (!video) return;
    video.playbackRate = 0.5;
  }, []);

  return (
    <section className="hero">
      <div className="sheet">
        <div className="kick">
          <span className="type-m a">unfussy.ai</span>
          <span className="type-m text-soft b">We teach it. Then we get out of the way.</span>
          <nav className="kick-nav type-m" aria-label="On this page">
            <a href="#us">About</a>
            <a href="#do">What we do</a>
            <a href="#fuss">What's your fuss?</a>
            <a href="#sessions">Dates</a>
            <button type="button" onClick={() => openEnquire()}>
              Unfuss me
            </button>
          </nav>
        </div>

        <h1 className="hero-title">
          <span className="ln">
            <span>Two chicks.</span>
          </span>
          <span className="ln">
            <span>
              Zero <span className="ink-hl">fuss.</span>
            </span>
          </span>
        </h1>

        <div className="hero-film">
          <video
            ref={film}
            src="/unfussy/hero.mp4?v=revised"
            poster="/unfussy/hero-poster.jpg?v=revised"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="unfussy.ai intro. What we do."
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = 0.5;
            }}
          />
        </div>
      </div>
    </section>
  );
}

export function WhatWeDo() {
  return (
    <section id="do" data-sec="" data-depth="0" className="site-section">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">What we do</span>
        </header>
        <div className="cols mb-[clamp(34px,5vh,58px)]">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.85rem,3.2vw,3rem)] md:col-span-8">
            We teach you AI. <span className="ink-ul">We set it running.</span>
          </Reveal>
        </div>
        <Reveal>
          <div className="do-grid">
            {LIVE_OFFERINGS.map((o) => {
              const Icon = OFFERING_ICONS[o.id];
              return (
                <a key={o.id} className="do-card" href={`/do/${o.id}`}>
                  <span className="pic">
                    <img src={o.image} alt={o.alt} width={1400} height={1050} />
                    <span className="do-icon" aria-hidden="true">
                      <Icon strokeWidth={1.7} />
                    </span>
                  </span>
                  <span className="type-m text-soft">{o.duration}</span>
                  <h3>{o.title}</h3>
                  {o.subtitle ? <span className="type-m text-soft">{o.subtitle}</span> : null}
                  <p>{o.short}</p>
                  <span className="do-price">
                    {o.price}
                    {o.priceNote ? <small> {o.priceNote}</small> : null}
                  </span>
                  <span className="go">Find out more</span>
                </a>
              );
            })}
          </div>
          <ul className="more-prices">
            {MORE_PRICES.map((p) => (
              <li key={p.name}>
                <b>{p.name}</b>
                <span>{p.price}</span>
                {"note" in p && p.note ? <small>{p.note}</small> : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Surface() {
  const doubled = [...NOISE, ...NOISE];
  return (
    <section id="surface" data-sec="" data-depth="0" className="site-section">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">The splash</span>
        </header>
        <div className="cols">
          <Reveal
            as="h2"
            className="type-d col-span-4 text-[clamp(1.85rem,3.2vw,3rem)] md:col-span-7"
          >
            Everyone's shouting about AI. <span className="text-sea">We're the ones who unfuss it.</span>
          </Reveal>
          <Reveal className="col-span-4 flex flex-col gap-4.5 self-end md:col-span-4 md:col-start-9" delay={80}>
            <p className="body-m">
              You've been sent the same twelve articles. You nodded through a webinar. A bloke
              said "agentic" four times and you decided this was a next-year problem. Cute.
              It's a this-week problem.
            </p>
            <p className="type-m text-soft">Fig. 01 — the fussy stuff</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="sheet mt-[clamp(38px,6vh,70px)]" delay={140}>
        <div className="tick" aria-hidden="true">
          <div className="tick-track">
            {doubled.map((w, i) => (
              <span key={`${w}-${i}`}>{w}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="sheet mt-[clamp(34px,5vh,60px)]" delay={210}>
        <div className="cols">
          <p className="type-d col-span-4 text-[clamp(1.9rem,4vw,3.4rem)] md:col-span-6">
            None of that is the job.
          </p>
          <p className="body-m col-span-4 md:col-span-5 md:col-start-8">
            The job is the quote you've rewritten eleven times. The invoice that's forty days
            late. The email you've been not-writing since Tuesday. That's the shallow end.
            Hop in.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function Conversation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [typed, setTyped] = useState(0);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(PROMPT.length);
      setShowReplies(true);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= PROMPT.length) {
        window.clearInterval(id);
        window.setTimeout(() => setShowReplies(true), 280);
      }
    }, 16);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section id="one" data-sec="" data-depth="3" className="site-section">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">One chat</span>
        </header>
        <div className="cols mb-[clamp(34px,5vh,62px)]">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.85rem,3.2vw,3rem)] md:col-span-8">
            You already know how to talk. <span className="text-sea">That's the whole trick.</span>
          </Reveal>
        </div>
        <div className="cols" ref={ref}>
          <div className="ex col-span-4 md:col-span-6">
            <div className="lab">
              <span className="type-m text-soft">You type</span>
              <span className="type-m text-soft">08:41</span>
            </div>
            <q>
              {PROMPT.slice(0, typed)}
              {typed < PROMPT.length ? <span className="caret" aria-hidden="true" /> : null}
            </q>
          </div>
          <div className="ex col-span-4 md:col-span-6">
            <div className="lab">
              <span className="type-m text-soft">Back in a minute. No, really.</span>
              <span className="type-m text-soft">08:42</span>
            </div>
            <ul>
              {REPLIES.map((r, i) => (
                <li
                  key={r}
                  className={showReplies ? "on" : ""}
                  style={{ transitionDelay: showReplies ? `${i * 90}ms` : "0ms" }}
                >
                  <em>{String(i + 1).padStart(2, "0")}</em>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cols mt-[clamp(28px,4vh,48px)]">
          <Reveal as="p" className="body-m col-span-4 md:col-span-6" delay={140}>
            No course in how computers think. No new software on a Sunday. You check the work,
            because it's still your name on it. We just make it less fussy.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ToDont() {
  const openEnquire = useEnquire((s) => s.openEnquire);
  const { ref, inView } = useInView<HTMLUListElement>("-12% 0px");

  return (
    <section id="dont" data-sec="" data-depth="12" className="site-section">
      <span className="ghost-word l" aria-hidden="true">
        don't
      </span>
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">The to-don'ts</span>
        </header>
        <div className="cols mb-[clamp(34px,5vh,58px)]">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.85rem,3.2vw,3rem)] md:col-span-7">
            Stop doing the fussy jobs.
          </Reveal>
          <Reveal as="p" className="body-m col-span-4 self-end md:col-span-4 md:col-start-9" delay={80}>
            Hand over one job. Watch it go fine. Then look around at everything else you've
            been carrying like a hero.
          </Reveal>
        </div>
        <ul className="dont-list" ref={ref}>
          {DONT.map((item) => (
            <li key={item.n} className={inView ? "on" : ""}>
              <span className="n">{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <button
                type="button"
                className="dont-go"
                onClick={() => openEnquire({ job: item.title, offering: "friday-fix" })}
              >
                Unfuss this
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Friday() {
  return (
    <section id="friday" data-sec="" data-depth="24" className="site-section slab">
      <span className="ghost-word r" aria-hidden="true">
        Friday
      </span>
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">The whole point</span>
        </header>
        <div className="cols mb-[clamp(34px,5vh,58px)]">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.85rem,3.2vw,3rem)] md:col-span-8">
            You don't want efficiency. <span className="text-sea">You want Friday.</span>
          </Reveal>
          <Reveal
            as="p"
            className="col-span-4 self-end text-[0.98rem] leading-[1.5] opacity-80 md:col-span-3 md:col-start-10"
            delay={80}
          >
            Nobody ever wanted a productivity stack. People want out the door at two.
          </Reveal>
        </div>
        <Reveal>
          <div className="fri">
            {FRIDAY.map((f) => (
              <div key={f.title}>
                <b>{f.title}</b>
                <span>{f.body}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="us" data-sec="" data-depth="0" className="site-section">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">About</span>
        </header>
        <div className="cols">
          <Reveal className="col-span-4 flex flex-col gap-[22px] md:col-span-7">
            <h2 className="type-d text-[clamp(1.75rem,3vw,2.75rem)]">
              Bel and Claudette. <span className="ink-hl">We teach AI you can use.</span>
            </h2>
            <p className="body-m max-w-[52ch]">
              Not a consultancy. Not a tech company. Not two people who will sell you a
              platform and vanish. We sit with you, on the AI you already open, until using
              it feels ordinary.
            </p>
            <p className="body-m max-w-[52ch]">
              Everything we teach has been used on a real business first, usually ours. If
              something is fiddly, we say so. If a tool is not worth the money, we say that
              too. You are not behind. You just have not had it shown properly.
            </p>
            <p className="type-d mt-1.5 text-[clamp(1.4rem,2.6vw,2.2rem)]">
              Feel <span className="ink-ul">comfortable</span> using it.
            </p>
          </Reveal>
          <Reveal className="col-span-4 md:col-span-4 md:col-start-9" delay={80}>
            <div className="chick-pair">
              <article>
                <span className="pic">
                  <img
                    src="/unfussy/bel.jpg"
                    alt="Bel"
                    width={1152}
                    height={1728}
                  />
                  <span className="hand-sticker -rotate">
                    Bel
                    <small>(the curious one)</small>
                  </span>
                </span>
              </article>
              <article>
                <span className="pic">
                  <img
                    src="/unfussy/claudette.jpg"
                    alt="Claudette"
                    width={1600}
                    height={1300}
                  />
                  <span className="hand-sticker rotate">
                    Claudette
                    <small>(the plan bringer)</small>
                  </span>
                </span>
              </article>
            </div>
            <dl className="facts">
              {FACTS.map((f) => (
                <div key={f.dt}>
                  <dt>{f.dt}</dt>
                  <dd>{f.dd}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function BuiltForYou() {
  const openEnquire = useEnquire((s) => s.openEnquire);

  return (
    <section id="services" className="site-section">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">Professional services</span>
        </header>
        <div className="cols mb-[clamp(28px,4vh,48px)]">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.85rem,3.2vw,3rem)] md:col-span-8">
            You don't have to build it. <span className="ink-ul">We will.</span>
          </Reveal>
          <Reveal as="p" className="body-m col-span-4 self-end md:col-span-4 md:col-start-9" delay={80}>
            This sits after the training. The course is where you learn the automation.
            This is where we build it for you.
          </Reveal>
        </div>
        <div className="members">
          <article>
            <span className="type-m text-clay">01</span>
            <strong>We come in</strong>
            <p className="body-m">
              Your tools. Your jobs. The follow-up, the quote, the inbox, the Tuesday
              admin. We set the automation up in the business.
            </p>
          </article>
          <article>
            <span className="type-m text-clay">02</span>
            <strong>You still own it</strong>
            <p className="body-m">
              No platform to rent. No black box. Your name stays on the work. We just
              take the hours it was eating.
            </p>
          </article>
          <article>
            <span className="type-m text-clay">03</span>
            <strong>After you know what you want</strong>
            <p className="body-m">
              Sit the automation course if you want to learn it. Hand this over when
              you'd rather we build it.
            </p>
          </article>
        </div>
        <p className="mt-8">
          <button type="button" className="btn" onClick={() => openEnquire({ offering: "services" })}>
            Enquire
          </button>
        </p>
      </div>
    </section>
  );
}

export function Membership() {
  const openEnquire = useEnquire((s) => s.openEnquire);

  return (
    <section id="membership" className="site-section">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">The membership</span>
        </header>
        <div className="cols mb-[clamp(28px,4vh,48px)]">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.85rem,3.2vw,3rem)] md:col-span-8">
            The room that keeps you <span className="ink-ul">comfortable</span> with it.
          </Reveal>
          <Reveal as="p" className="body-m col-span-4 self-end md:col-span-4 md:col-start-9" delay={80}>
            A live hour. Your job. Not another pile of videos you will not watch.
          </Reveal>
        </div>

        <Reveal>
          <div className="rhythm" aria-label="How the membership runs">
            <article>
              <b>Fortnightly</b>
              <span>One live session. Not a calendar full of calls.</span>
            </article>
            <article>
              <b>60 minutes</b>
              <span>Long enough to move a real job. Short enough to come back.</span>
            </article>
            <article>
              <b>$55/mo</b>
              <span>The stay-on. A course gets you started. This keeps it comfortable.</span>
            </article>
          </div>
        </Reveal>

        <div className="mt-[clamp(36px,5vh,64px)]">
          <p className="type-m text-clay mb-5">What's inside</p>
          <div className="members">
            <article>
              <span className="type-m text-soft">The live hour</span>
              <strong>Show up and do the job</strong>
              <p className="body-m">
                Every fortnight, sixty minutes. Bring the thing that's stuck. Ask, try it,
                fix it, while we're still on the call.
              </p>
            </article>
            <article>
              <span className="type-m text-soft">Your work</span>
              <strong>Not a demo</strong>
              <p className="body-m">
                The AI you already open, on the task you actually do. You leave with it
                moved. Not with homework.
              </p>
            </article>
            <article>
              <span className="type-m text-soft">The point</span>
              <strong>It stays comfortable</strong>
              <p className="body-m">
                A course is the start. This is how it still feels usable once you are
                back at your desk.
              </p>
            </article>
          </div>
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn"
            onClick={() => openEnquire({ offering: "membership" })}
          >
            Join the membership
          </button>
          <span className="type-m text-soft">Fortnightly · 60 minutes · $55 a month</span>
        </p>
      </div>
    </section>
  );
}

export function Ways() {
  return (
    <section id="ways" data-sec="" data-depth="0" className="site-section">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">Pick your depth</span>
        </header>
        <div className="cols mb-[clamp(30px,4vh,52px)]">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.75rem,3vw,2.75rem)] md:col-span-7">
            Don't overthink it. Just pick a way in.
          </Reveal>
        </div>
        <Reveal>
          <div className="ways">
            {LIVE_OFFERINGS.map((o) => (
              <a key={o.id} href={`/do/${o.id}`}>
                <span className="type-m text-soft">{o.duration}</span>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
                <span className="go">{o.price}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-[clamp(56px,8vh,88px)]">
          <p className="type-m text-soft mb-6">Fig. 02 — a Friday Fix hour</p>
          <h3 className="type-d mb-8 text-[clamp(1.8rem,3.6vw,3.2rem)]">
            Kitchen table. Sixty unfussy minutes.
          </h3>
          <div className="hour">
            {HOUR.map((h) => (
              <article key={h.t}>
                <span className="type-m text-sea">{h.t}</span>
                <b>{h.title}</b>
                <p>{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Questions() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="site-section pt-0">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">The nosy questions</span>
        </header>
        <div className="cols mb-10">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.75rem,3vw,2.75rem)] md:col-span-7">
            The stuff people actually ask. No fluff.
          </Reveal>
        </div>
        <div>
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                  <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
                </button>
                <div className="a">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Close() {
  const openEnquire = useEnquire((s) => s.openEnquire);

  return (
    <section className="site-section">
      <div className="sheet">
        <div className="cols items-end">
          <div className="col-span-4 md:col-span-8">
            <h2 className="end-title">
              Come on.
              <br />
              Unfuss <span className="ink-hl">it.</span>
            </h2>
            <p className="hand hand-end">We'll take it from here.</p>
          </div>
          <Reveal className="col-span-4 flex flex-col gap-4.5 md:col-span-4">
            <p className="body-m">
              Tell us the job you'd hand over tomorrow. We'll tell you, straight, whether we
              can unfuss it yet.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn" onClick={() => openEnquire()}>
                Unfuss me
              </button>
              <a className="hand-badge" href={`mailto:${MAIL}`}>
                DM us for the full guide
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
