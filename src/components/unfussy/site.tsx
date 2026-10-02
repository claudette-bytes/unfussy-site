"use client";

import { useEffect, useState } from "react";
import { ScrollProgress, SiteFooter, SiteHeader } from "./chrome";
import { EnquireDialog } from "./enquire";
import {
  About,
  BuiltForYou,
  Close,
  Hero,
  Membership,
  Questions,
  WhatWeDo,
} from "./sections";
import { WhatsYourFuss } from "./legwork";
import { Sessions } from "./sessions";
import { JumpDock } from "./jump";

export function UnfussySite() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function go(id: string) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }

    function onClick(ev: MouseEvent) {
      const a = (ev.target as HTMLElement | null)?.closest?.("a[href^='#']") as
        | HTMLAnchorElement
        | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id || !document.getElementById(id)) return;
      ev.preventDefault();
      go(id);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const prog = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(prog);
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    onScroll();
    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  return (
    <div className="relative min-h-dvh bg-paper text-ink has-jump">
      <a
        href="#top"
        className="bg-ink text-paper sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <ScrollProgress value={progress} />
      <SiteHeader />
      <main id="top">
        <Hero />
        <About />
        <WhatWeDo />
        <BuiltForYou />
        <WhatsYourFuss />
        <Sessions />
        <Membership />
        <Questions />
        <Close />
      </main>
      <SiteFooter />
      <JumpDock />
      <EnquireDialog />
    </div>
  );
}
