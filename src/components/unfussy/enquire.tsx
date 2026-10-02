import { useEffect, useId, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MAIL, OFFERINGS, type Offering } from "@/lib/site-data";
import { useEnquire } from "./store";

const LABELS: Record<Offering, string> = {
  "friday-fix": "The Friday Fix",
  course: "Your First AI Course",
  social: "Talking Social",
  training: "Corporate training",
  automation: "Automation course",
  services: "Professional services",
  membership: "The Membership",
  unsure: "Not sure yet. That's fine.",
};

type Form = {
  name: string;
  email: string;
  business: string;
  offering: Offering;
  job: string;
};

type Errors = Partial<Record<keyof Form, string>>;

function validate(form: Form): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "A name, legend. Even a first one.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "That email looks a bit fussy. Try again.";
  }
  if (form.job.trim().length < 8) errors.job = "Give us the job, even roughly. We can take it.";
  return errors;
}

function composeMessage(form: Form) {
  return [
    `Hello Bel and Claudette,`,
    ``,
    `I'd like to enquire about ${LABELS[form.offering]}.`,
    ``,
    form.business.trim() ? `Business: ${form.business.trim()}` : null,
    `The job I would hand over:`,
    form.job.trim(),
    ``,
    `${form.name.trim()}`,
    form.email.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function EnquireDialog() {
  const { open, offering, job, closeEnquire, setOffering, setJob } = useEnquire();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) {
      setSent(false);
      setCopied(false);
      setErrors({});
    }
  }, [open]);

  const form: Form = { name, email, business, offering, job };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    const payload = { ...form, at: new Date().toISOString() };
    try {
      const prev = JSON.parse(localStorage.getItem("unfussy-enquiries") || "[]") as unknown[];
      localStorage.setItem("unfussy-enquiries", JSON.stringify([payload, ...prev].slice(0, 20)));
    } catch {
      /* ignore */
    }
    setSent(true);
  }

  const message = composeMessage(form);
  const mailto = `mailto:${MAIL}?subject=${encodeURIComponent(
    `Enquire — ${LABELS[offering]}`,
  )}&body=${encodeURIComponent(message)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => (v ? null : closeEnquire())}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-panel" aria-labelledby={titleId} aria-describedby={descId}>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="type-m text-sea mb-2">Unfuss me</p>
              <Dialog.Title id={titleId} className="type-d text-[clamp(1.8rem,3vw,2.4rem)]">
                {sent ? "We've got it." : "Hit us with the fussy job."}
              </Dialog.Title>
              <Dialog.Description id={descId} className="body-m mt-3 max-w-[36ch]">
                {sent
                  ? "Saved on this device. Open an email, or copy the note and send it however you like."
                  : "Tell us the job you'd hand over tomorrow. We'll tell you, straight, whether we can unfuss it yet."}
              </Dialog.Description>
            </div>
            <Dialog.Close className="type-m text-soft hover:text-ink min-h-11 min-w-11">
              Close
            </Dialog.Close>
          </div>

          {sent ? (
            <div className="flex flex-col gap-4">
              <pre className="border-t border-b border-rule py-4 font-mono text-[0.78rem] leading-5 whitespace-pre-wrap text-soft">
                {message}
              </pre>
              <div className="flex flex-wrap gap-2.5">
                <a className="btn" href={mailto}>
                  Open email
                </a>
                <button type="button" className="btn btn-o" onClick={copy}>
                  {copied ? "Copied. Nice." : "Copy the note"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="field">
                <span className="type-m text-soft">Which way in</span>
                <div className="offer-pills">
                  {([...OFFERINGS.filter((o) => o.id !== "friday-fix").map((o) => o.id), "unsure"] as Offering[]).map((id) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={offering === id}
                      onClick={() => setOffering(id)}
                    >
                      {LABELS[id]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label htmlFor="enq-job">The fussy job you'd hand over</label>
                <textarea
                  id="enq-job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  placeholder="The quote I rewrite every Sunday night…"
                />
                {errors.job ? <span className="err">{errors.job}</span> : null}
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="field">
                  <label htmlFor="enq-name">Name</label>
                  <input
                    id="enq-name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name ? <span className="err">{errors.name}</span> : null}
                </div>
                <div className="field">
                  <label htmlFor="enq-email">Email</label>
                  <input
                    id="enq-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email ? <span className="err">{errors.email}</span> : null}
                </div>
              </div>
              <div className="field">
                <label htmlFor="enq-biz">Business (optional)</label>
                <input
                  id="enq-biz"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Painter, café, consultant — wherever you work…"
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                <button type="submit" className="btn">
                  Unfuss me
                </button>
                <a className="type-m text-soft hover:text-sea" href={`mailto:${MAIL}`}>
                  or email {MAIL}
                </a>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
