import { useEffect, useRef } from "react";

export function SwellCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let spacing = 30;
    let t = 0;
    let running = true;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = cv;
    const context = ctx;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      spacing = W < 700 ? 26 : 32;
    }

    function draw() {
      context.clearRect(0, 0, W, H);
      const prog = progressRef.current;
      const amp = 5 + prog * 16;
      const alpha = 0.05 + prog * 0.13;
      const dotRGB = getComputedStyle(root).getPropertyValue("--dot").trim() || "12,12,12";
      const cols = Math.ceil(W / spacing) + 2;
      const rows = Math.ceil(H / spacing) + 2;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * spacing;
          const y = r * spacing;
          const wave =
            Math.sin(x * 0.011 + y * 0.006 + t) * amp +
            Math.sin(x * 0.004 - y * 0.009 - t * 0.6) * amp * 0.45;
          const a = alpha * (0.45 + 0.55 * (0.5 + 0.5 * Math.sin(x * 0.011 + y * 0.006 + t)));
          context.fillStyle = `rgba(${dotRGB},${a.toFixed(3)})`;
          context.fillRect(x, y + wave, 2, 2);
        }
      }
    }

    function loop() {
      if (running) {
        if (!reduce) t += 0.006;
        draw();
      }
      raf = requestAnimationFrame(loop);
    }

    const onVis = () => {
      running = !document.hidden;
    };
    window.addEventListener("resize", size);
    document.addEventListener("visibilitychange", onVis);
    size();
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="swell"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

export function GridOverlay() {
  return (
    <div
      id="grid"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] mx-auto grid max-w-[1680px] grid-cols-4 px-gut md:grid-cols-12"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <i
          key={i}
          className={`border-l border-[color:var(--grid)] ${i === 0 ? "border-l-0" : ""} ${i >= 4 ? "hidden md:block" : ""}`}
        />
      ))}
    </div>
  );
}
