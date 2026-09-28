"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  vy: number;
  tw: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let stars: Star[] = [];
    let nodes: Node[] = [];
    let raf = 0;

    const build = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 9000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.15 + 0.25,
        vy: 0.02 + Math.random() * 0.07,
        tw: Math.random() * Math.PI * 2,
      }));
      nodes = Array.from({ length: 16 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
      }));
    };

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    build();

    const frame = (t: number) => {
      const cs = getComputedStyle(document.documentElement);
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      const ink = cs.getPropertyValue("--ink").trim() || "#000";
      const tech = cs.getPropertyValue("--tech").trim() || "#39f";
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = ink;
      for (const s of stars) {
        if (!reduced) {
          s.y -= s.vy;
          if (s.y < -2) {
            s.y = h + 2;
            s.x = Math.random() * w;
          }
        }
        const a =
          (dark ? 0.55 : 0.2) *
          (reduced ? 0.7 : 0.45 + 0.55 * Math.abs(Math.sin(s.tw + t / 1400)));
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.2832);
        ctx.fill();
      }

      ctx.strokeStyle = tech;
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!reduced) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 190) {
            ctx.globalAlpha = (1 - d / 190) * (dark ? 0.3 : 0.16);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (!reduced) {
              const p = ((t / 2600) + (i + j) * 0.17) % 1;
              ctx.globalAlpha = (1 - d / 190) * (dark ? 0.75 : 0.4);
              ctx.fillStyle = tech;
              ctx.beginPath();
              ctx.arc(a.x - dx * p, a.y - dy * p, 1.3, 0, 6.2832);
              ctx.fill();
            }
          }
        }
        ctx.globalAlpha = dark ? 0.7 : 0.38;
        ctx.fillStyle = tech;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.6, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    if (reduced) frame(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
