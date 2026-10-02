"use client";

import { AUTOMATION_BOOK_URL, COURSE_BOOK_URL, OFFERINGS, type Offering } from "@/lib/site-data";
import { SiteFooter, SiteHeader } from "./chrome";
import { EnquireDialog } from "./enquire";
import { JumpDock, OfferingIcons, OFFERING_ICONS } from "./jump";
import { useEnquire } from "./store";

export function OfferingPage({ id }: { id: Exclude<Offering, "unsure"> }) {
  const offering = OFFERINGS.find((o) => o.id === id) ?? OFFERINGS[0];
  const Icon = OFFERING_ICONS[offering.id];
  const openEnquire = useEnquire((s) => s.openEnquire);

  return (
    <div className="relative min-h-dvh bg-paper text-ink has-jump">
      <SiteHeader />
      <main className="site-section">
        <div className="sheet">
          <p className="type-m text-soft mb-6">
            <a href="/#do" className="hover:text-ink">
              What we do
            </a>
            {" · "}
            {offering.title}
          </p>
          <div className="offer-layout">
            <span className="pic offer-hero">
              <img src={offering.image} alt={offering.alt} width={1400} height={1050} />
            </span>
            <div className="offer-copy">
              <span className="jump-ico jumbo on offer-mark" aria-hidden="true">
                <Icon strokeWidth={1.6} />
              </span>
              <p className="type-m text-sea">{offering.duration}</p>
              <h1 className="type-d text-[clamp(2rem,4vw,3.2rem)] mt-3 mb-5">{offering.title}</h1>
              {offering.subtitle ? <p className="type-m text-soft mb-4">{offering.subtitle}</p> : null}
              <p className="body-l" style={{ maxWidth: "36ch" }}>
                {offering.short}
              </p>
              <p className="do-price mt-4">
                {offering.price}
                {offering.priceNote ? <small> {offering.priceNote}</small> : null}
              </p>
              <p className="body-m mt-5">{offering.body}</p>
              <ul className="offer-beats">
                {offering.beats.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="mt-8 flex flex-wrap gap-2.5">
                {offering.id === "course" ? (
                  <a className="btn" href={COURSE_BOOK_URL}>
                    Book
                  </a>
                ) : offering.id === "automation" ? (
                  <a className="btn" href={AUTOMATION_BOOK_URL}>
                    Book
                  </a>
                ) : (
                  <button type="button" className="btn" onClick={() => openEnquire({ offering: offering.id })}>
                    Unfuss me
                  </button>
                )}
                <a className="btn btn-o" href="/#sessions">
                  See dates
                </a>
              </p>
            </div>
          </div>

          <p className="type-m text-soft mt-[clamp(48px,7vh,80px)] mb-5">The other ways in</p>
          <OfferingIcons current={offering.id} />
        </div>
      </main>
      <SiteFooter />
      <JumpDock current={offering.id} />
      <EnquireDialog />
    </div>
  );
}
