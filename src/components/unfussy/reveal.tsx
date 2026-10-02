import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h2" | "ul" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const failsafe = window.setTimeout(() => setOn(true), 1800);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          window.setTimeout(() => setOn(true), delay);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    if (el.getBoundingClientRect().top < window.innerHeight) {
      window.setTimeout(() => setOn(true), delay);
    }
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, [delay]);

  return (
    <Tag ref={ref as never} className={cn("reveal", on && "on", className)}>
      {children}
    </Tag>
  );
}

export function useInView<T extends HTMLElement>(margin = "-18% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: `0px 0px ${margin}`, threshold: 0.28 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, inView };
}
