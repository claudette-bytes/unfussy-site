import {
  BookOpen,
  CalendarDays,
  Coffee,
  Home,
  LayoutGrid,
  Megaphone,
  RefreshCw,
  School,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LIVE_OFFERINGS, type Offering } from "@/lib/site-data";
import { useEnquire } from "./store";

export const OFFERING_ICONS: Record<Exclude<Offering, "unsure">, LucideIcon> = {
  "friday-fix": Coffee,
  course: BookOpen,
  social: Megaphone,
  training: School,
  automation: Workflow,
  services: Wrench,
  membership: RefreshCw,
};

export function JumpDock({ current }: { current?: Offering }) {
  const openEnquire = useEnquire((s) => s.openEnquire);

  return (
    <nav className="jump-dock" aria-label="Jump around">
      <div className="jump-scroll">
        <a href="/" className="jump-ico" title="Home">
          <Home strokeWidth={1.75} />
          <span>Home</span>
        </a>
        <a href="/#do" className="jump-ico" title="What we do">
          <LayoutGrid strokeWidth={1.75} />
          <span>What we do</span>
        </a>
        <a href="/#fuss" className="jump-ico" title="What's your fuss?">
          <Sparkles strokeWidth={1.75} />
          <span>Your fuss</span>
        </a>
        <a href="/#sessions" className="jump-ico" title="Dates">
          <CalendarDays strokeWidth={1.75} />
          <span>Dates</span>
        </a>
      </div>
      <button
        type="button"
        className="jump-ico jump-unfuss"
        title="Unfuss me"
        onClick={() => openEnquire({ offering: current })}
      >
        <span className="jump-dot" />
        <span>Unfuss me</span>
      </button>
    </nav>
  );
}

export function OfferingIcons({ current }: { current?: Offering }) {
  return (
    <div className="offer-icos" aria-label="The ways in">
      {LIVE_OFFERINGS.map((o) => {
        const Icon = OFFERING_ICONS[o.id];
        const on = current === o.id;
        return (
          <a
            key={o.id}
            href={`/do/${o.id}`}
            className={`jump-ico jumbo${on ? " on" : ""}`}
            aria-current={on ? "page" : undefined}
          >
            <Icon strokeWidth={1.6} />
            <span>{o.title}</span>
          </a>
        );
      })}
    </div>
  );
}
