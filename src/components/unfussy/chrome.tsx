import { Lockup } from "./logo";
import { useEnquire } from "./store";

export function SiteHeader() {
  const openEnquire = useEnquire((s) => s.openEnquire);

  return (
    <header className="site-head relative z-20 mx-auto flex max-w-[1680px] items-center gap-5 px-gut pt-4 pb-3">
      <Lockup href="/" />
      <span className="ml-auto flex items-center gap-3 sm:gap-4">
        <span className="type-m text-soft hidden lg:inline">
          Worldwide from Sydney's Northern Beaches
        </span>
        <button type="button" className="btn" onClick={() => openEnquire()}>
          Unfuss me
        </button>
      </span>
    </header>
  );
}

export function ScrollProgress({ value }: { value: number }) {
  return (
    <div
      className="fixed top-0 left-0 z-50 h-0.5 bg-sea"
      style={{ width: `${Math.round(value * 1000) / 10}%` }}
      aria-hidden="true"
    />
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-2 border-t border-rule py-6 pb-10">
      <div className="sheet flex flex-wrap items-baseline gap-5">
        <Lockup href="/" />
        <nav className="foot-nav type-m" aria-label="Footer">
          <a className="text-soft hover:text-sea" href="/#do">
            What we do
          </a>
          <a className="text-soft hover:text-sea" href="/#fuss">
            What's your fuss?
          </a>
          <a className="text-soft hover:text-sea" href="/#sessions">
            Dates
          </a>
          <a className="text-soft hover:text-sea" href="/#membership">
            Membership
          </a>
          <a className="text-soft hover:text-sea" href="/blog">
            Blog
          </a>
          <a className="text-soft hover:text-sea" href="/privacy">
            Privacy
          </a>
          <a className="text-soft hover:text-sea" href="/terms">
            Terms
          </a>
          <a className="text-soft hover:text-sea" href="mailto:hello@unfussy.ai">
            hello@unfussy.ai
          </a>
        </nav>
        <span className="type-m text-soft ml-auto">
          Worldwide from Sydney's Northern Beaches
        </span>
      </div>
    </footer>
  );
}
