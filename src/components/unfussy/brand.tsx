"use client";

import { useState } from "react";
import { Lockup, Mark, Wordmark } from "./logo";

const COLOURS = [
  { name: "Paper", hex: "#FFFFFF", var: "--paper", use: "The page. Stay here." },
  { name: "Ink", hex: "#0C0C0C", var: "--ink", use: "Type, the mark, the rule when it means it." },
  { name: "Sea", hex: "#0B7D77", var: "--sea", use: "The only accent. .ai, the table, the yes." },
  { name: "Sea fill", hex: "#1FA8A0", var: "--sea-fill", use: "Hover. The moment it lands." },
  { name: "Soft", hex: "#6E6E68", var: "--soft", use: "The quiet line. Labels. Captions." },
  { name: "Rule", hex: "#E3E2DD", var: "--rule", use: "Hairlines. Never a fat box." },
] as const;

const SAY = [
  { yes: "Unfuss it.", no: "Leverage AI." },
  { yes: "Kitchen table.", no: "Centre of excellence." },
  { yes: "The chicks.", no: "The team / the founders." },
  { yes: "Gone by Friday.", no: "Deliverables this sprint." },
  { yes: "Your recipes, not ours.", no: "Best-practice playbooks." },
  { yes: "Come on. Unfuss it.", no: "Unlock your potential." },
] as const;

function SavePdfButton({
  children,
  onShowHelp,
}: {
  children: string;
  onShowHelp: () => void;
}) {
  return (
    <button
      type="button"
      className="btn"
      onClick={() => {
        onShowHelp();
        window.setTimeout(() => {
          try {
            window.print();
          } catch {
            /* preview often blocks print */
          }
        }, 50);
      }}
    >
      {children}
    </button>
  );
}

export function BrandKit() {
  const [help, setHelp] = useState(false);

  return (
    <div id="top" className="brand-kit">
      <header className="relative z-20 mx-auto flex max-w-[1680px] items-center gap-5 px-gut pt-4 pb-3 print:hidden">
        <Lockup href="/" />
        <span className="type-m text-soft hidden sm:inline">Brand kit</span>
        <span className="ml-auto flex items-center gap-3">
          <SavePdfButton onShowHelp={() => setHelp(true)}>Save as PDF</SavePdfButton>
          <a href="/" className="type-m text-soft hover:text-ink">
            Back to the website
          </a>
        </span>
      </header>

      <section className="hero">
        <div className="sheet">
          <div className="kick">
            <span className="type-m a">Brand kit</span>
            <span className="type-m text-soft b">How we look. How we sound.</span>
            <span className="type-m text-soft kick-end">v1 · 2026</span>
          </div>
          <h1 className="hero-title">
            <span className="ln">
              <span>Two chicks.</span>
            </span>
            <span className="ln">
              <span>
                One <span className="text-sea">table.</span>
              </span>
            </span>
          </h1>
          <p className="hero-blurb">
            The unfussy kit. A mark, a palette, three typefaces, and a voice that does
            not say leverage. Use it. Don't fussy it.
          </p>
          <p className="mt-8 print:hidden">
            <SavePdfButton onShowHelp={() => setHelp(true)}>Save as PDF</SavePdfButton>
          </p>
          {help ? (
            <div className="brand-save-help print:hidden">
              <p>
                If nothing popped up, this preview window cannot save files. Do this
                instead:
              </p>
              <ol>
                <li>Click once on the brand kit page so Chrome is focused on it.</li>
                <li>
                  Press <b>Ctrl + P</b> (Windows) or <b>Cmd + P</b> (Mac).
                </li>
                <li>
                  Destination → <b>Save as PDF</b> → Save.
                </li>
              </ol>
              <p>
                Still nothing? That's Grok blocking it. Publish the site, open the
                public link in a normal Chrome tab, then save. The button works there.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="site-section print:hidden">
        <div className="sheet">
          <header className="sec-head">
            <span className="type-m text-soft no">PDF</span>
            <span className="type-m ttl">The file</span>
            <span className="type-m text-soft dep">Viewer</span>
          </header>
          <object
            data="/unfussy-brand-kit.pdf"
            type="application/pdf"
            className="brand-pdf"
          >
            <p className="body-m">The PDF viewer didn't load in this window.</p>
          </object>
        </div>
      </section>

      <section className="site-section" id="mark">
        <div className="sheet">
          <header className="sec-head">
            <span className="type-m text-soft no">00</span>
            <span className="type-m ttl">The mark</span>
            <span className="type-m text-soft dep">The pair</span>
          </header>
          <div className="brand-stage">
            <Mark className="brand-stage-mark" title="unfussy.ai mark" />
          </div>
          <div className="brand-lockups">
            <figure className="brand-lockup-card">
              <span className="type-m text-soft">Horizontal</span>
              <Lockup
                href="#mark"
                className="pointer-events-none"
                wordClassName="text-[1.8rem]"
                markClassName="h-10 w-[3.75rem]"
              />
            </figure>
            <figure className="brand-lockup-card">
              <span className="type-m text-soft">Wordmark</span>
              <Wordmark className="text-[1.8rem]" />
            </figure>
            <figure className="brand-lockup-card brand-lockup-card-ink">
              <span className="type-m">On ink</span>
              <Lockup
                href="#mark"
                className="pointer-events-none text-paper"
                wordClassName="text-[1.8rem]"
                markClassName="h-10 w-[3.75rem]"
              />
            </figure>
            <figure className="brand-lockup-card brand-lockup-card-sea">
              <span className="type-m">On sea</span>
              <Lockup
                href="#mark"
                className="pointer-events-none text-paper"
                wordClassName="text-[1.8rem]"
                markClassName="h-10 w-[3.75rem]"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="sheet">
          <header className="sec-head">
            <span className="type-m text-soft no">01</span>
            <span className="type-m ttl">Colour</span>
            <span className="type-m text-soft dep">The set</span>
          </header>
          <div className="brand-swatches">
            {COLOURS.map((c) => (
              <article key={c.name}>
                <div className="brand-chip" style={{ background: `var(${c.var})` }} />
                <h3 className="font-display text-[1.35rem] font-bold tracking-[-0.04em]">{c.name}</h3>
                <p className="type-m text-soft">{c.hex}</p>
                <p>{c.use}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="sheet">
          <header className="sec-head">
            <span className="type-m text-soft no">02</span>
            <span className="type-m ttl">Voice</span>
            <span className="type-m text-soft dep">How we talk</span>
          </header>
          <div className="brand-voice">
            {SAY.map((row) => (
              <article key={row.yes}>
                <p>
                  <span className="type-m text-sea">We say</span>
                  {row.yes}
                </p>
                <p>
                  <span className="type-m">We don't</span>
                  {row.no}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-2 border-t border-rule py-6 pb-10 print:hidden">
        <div className="sheet flex flex-wrap items-baseline gap-5">
          <Lockup href="/" />
          <span className="type-m text-soft">Brand kit · v1</span>
          <SavePdfButton onShowHelp={() => setHelp(true)}>Save as PDF</SavePdfButton>
          <a className="type-m text-soft hover:text-sea ml-auto" href="/">
            Back to the website
          </a>
        </div>
      </footer>
    </div>
  );
}
