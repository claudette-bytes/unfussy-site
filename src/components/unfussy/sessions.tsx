"use client";

import { HEADLINE_SESSION, SESSIONS, mailTo } from "@/lib/site-data";
import { Reveal } from "./reveal";

export function Sessions({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="sessions" data-sec="" data-depth="0" className="site-section">
      <div className="sheet">
        {standalone ? null : (
          <header className="sec-head">
            <span className="type-m ttl">Come sit</span>
          </header>
        )}
        <div className="cols mb-[clamp(28px,4vh,48px)]">
          <Reveal as="h2" className="type-d col-span-4 text-[clamp(1.85rem,3.2vw,3rem)] md:col-span-10">
            Next up: {HEADLINE_SESSION.when}.{" "}
            <span className="ink-ul">{HEADLINE_SESSION.what}.</span>
          </Reveal>
        </div>

        <Reveal>
          <div className="sess-table" role="table" aria-label="Upcoming sessions">
            <div className="sess-head" role="row">
              <span>When</span>
              <span>What</span>
              <span>Where</span>
              <span>Price</span>
              <span>Notes</span>
              <span> </span>
            </div>
            {SESSIONS.map((s) => (
              <article key={s.when} className={`sess-row${s.headline ? " on" : ""}`} role="row">
                <p>
                  <span className="sess-k">When</span>
                  {s.when}
                  {s.whenSub ? <span className="sess-sub">{s.whenSub}</span> : null}
                </p>
                <p>
                  <span className="sess-k">What</span>
                  {s.what}
                </p>
                <p>
                  <span className="sess-k">Where</span>
                  {s.where}
                </p>
                <p>
                  <span className="sess-k">Price</span>
                  {s.price}
                </p>
                <p>
                  <span className="sess-k">Notes</span>
                  {s.notes}
                </p>
                <p>
                  <a className="btn" href={s.cta.href ?? mailTo(s.cta.subject)}>
                    {s.cta.label}
                  </a>
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
