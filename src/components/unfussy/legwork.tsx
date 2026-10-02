"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  INDUSTRIES,
  industryById,
  type IndustryId,
} from "@/lib/industries";
import { MAIL } from "@/lib/site-data";
import { Reveal } from "./reveal";

export function WhatsYourFuss() {
  const [industryId, setIndustryId] = useState<IndustryId>("construction");
  const industry = industryById(industryId);
  const youAt = Math.max(
    0,
    industry.steps.findIndex((s) => s.you),
  );
  const [step, setStep] = useState(youAt);
  const active = industry.steps[step] ?? industry.steps[youAt];

  function pickIndustry(id: IndustryId) {
    setIndustryId(id);
    const next = industryById(id);
    const i = next.steps.findIndex((s) => s.you);
    setStep(i >= 0 ? i : 0);
  }

  return (
    <section id="fuss" className="site-section">
      <div className="sheet">
        <header className="sec-head">
          <span className="type-m ttl">What's your fuss?</span>
        </header>
        <div className="mb-[clamp(24px,4vh,44px)]">
          <Reveal as="h2" className="type-d text-[clamp(1.85rem,3.2vw,3rem)] max-w-[16ch]">
            One job hands to the next. <span className="ink-hl">You stay in charge.</span>
          </Reveal>
          <p className="type-d mt-4 text-[clamp(1.25rem,2.2vw,1.75rem)]">
            <span className="ink-ul">Pick your industry.</span> See the job.
          </p>
        </div>

        <div className="ind-picks" role="tablist" aria-label="Your industry">
          {INDUSTRIES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === industryId}
              className={item.id === industryId ? "on" : ""}
              onClick={() => pickIndustry(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="fuss-hook">{industry.hook}</p>

        <div className="fuss-line" role="list">
          {industry.steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="listitem"
              className={`fuss-node${i === step ? " on" : ""}`}
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
            >
              <span className="n">{i + 1}</span>
              {i === step ? <span className="your">Your step</span> : null}
              <b>{s.title}</b>
            </button>
          ))}
        </div>
        <div className="fuss-line-body">
          <p>{active.body}</p>
        </div>

        <Giveaway key={industryId} industryId={industryId} />
      </div>
    </section>
  );
}

function Giveaway({ industryId }: { industryId: IndustryId }) {
  const industry = industryById(industryId);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const pack = useMemo(() => industry.prompts.join("\n\n"), [industry]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email looks a bit fussy. Try again.");
      return;
    }
    setError("");
    const payload = {
      email: email.trim(),
      industry: industry.label,
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("unfussy-giveaway") || "[]") as unknown[];
      localStorage.setItem("unfussy-giveaway", JSON.stringify([payload, ...prev].slice(0, 50)));
    } catch {
      /* ignore */
    }
    setUnlocked(true);
  }

  async function copyPack() {
    try {
      await navigator.clipboard.writeText(pack);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  const mailto = `mailto:${MAIL}?subject=${encodeURIComponent(
    `Prompt pack — ${industry.label}`,
  )}&body=${encodeURIComponent(`Please send the five ${industry.label} prompts to ${email.trim()}.`)}`;

  return (
    <div className="give" id="prompts">
      <p className="type-m text-clay mb-2">Free giveaway</p>
      <h3 className="type-d text-[clamp(1.6rem,3vw,2.6rem)] mb-3">
        Five prompts for <span className="ink-ul">{industry.label}</span>.
      </h3>
      <p className="body-m mb-3 max-w-[54ch]">
        A free pack for the industry you just picked. Five prompts written for that
        week — quotes, posts, follow-ups, the jobs you actually do. Paste them into
        Claude or Grok. On your work. Not a demo.
      </p>
      <p className="body-m mb-6 max-w-[54ch]">
        Leave an email and they appear on this page straight away. We'll send a copy
        through as well. We don't add you to a newsletter.
      </p>

      {!unlocked ? (
        <form className="give-form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="give-email">
            Email
          </label>
          <input
            id="give-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@the-business.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn">
            Send me the five
          </button>
          {error ? <p className="give-err">{error}</p> : null}
        </form>
      ) : (
        <div>
          <p className="hand mb-5">They're in. Don't fuss them.</p>
          <ol className="prompt-list">
            {industry.prompts.map((p, i) => (
              <li key={p}>
                <span className="type-m text-sea">{String(i + 1).padStart(2, "0")}</span>
                <p>{p}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <button type="button" className="btn" onClick={() => void copyPack()}>
              {copied ? "Copied" : "Copy the five"}
            </button>
            <a className="btn btn-o" href={mailto}>
              Email me a copy too
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
