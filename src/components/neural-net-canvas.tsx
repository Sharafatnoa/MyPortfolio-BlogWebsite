"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

export function NeuralNetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = [4, 5, 4, 2];
    let w = 0;
    let h = 0;
    let pts: Point[][] = [];
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;

    const build = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      if (!w || !h) return false;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const padX = 30;
      const padY = 16;
      const maxC = Math.max(...layers);
      const gap = Math.min((h - padY * 2) / (maxC - 1), 40);
      pts = layers.map((count, li) => {
        const x = padX + (li * (w - padX * 2)) / (layers.length - 1);
        const top = h / 2 - ((count - 1) * gap) / 2;
        return Array.from({ length: count }, (_, ni) => ({ x, y: top + ni * gap }));
      });
      return true;
    };

    let cancelled = false;
    const start = () => {
      if (!build()) {
        setTimeout(() => {
          if (!cancelled) start();
        }, 120);
        return;
      }

      const CYCLE = 2600;
      const HOP = CYCLE / (layers.length - 1);

      const draw = (t: number) => {
        if (cv.clientWidth !== w || cv.clientHeight !== h) build();
        const cs = getComputedStyle(document.documentElement);
        const dark = document.documentElement.getAttribute("data-theme") === "dark";
        const ink = cs.getPropertyValue("--ink").trim() || "#000";
        const tech = cs.getPropertyValue("--tech").trim() || "#39f";
        ctx.clearRect(0, 0, w, h);

        const time = reduced ? HOP * 1.5 : t;
        const phase = (time % CYCLE) / HOP;
        const seg = Math.floor(phase);
        const f = phase - seg;
        const ease = f * f * (3 - 2 * f);

        ctx.lineWidth = 0.5;
        for (let li = 0; li < pts.length - 1; li++) {
          for (const a of pts[li]) {
            for (const b of pts[li + 1]) {
              ctx.strokeStyle = li === seg ? tech : ink;
              ctx.globalAlpha = li === seg ? (dark ? 0.12 : 0.09) : dark ? 0.05 : 0.04;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        if (!reduced && seg < pts.length - 1) {
          const fade = Math.sin(Math.PI * Math.min(1, f * 1.15));
          for (const a of pts[seg]) {
            for (const b of pts[seg + 1]) {
              const x = a.x + (b.x - a.x) * ease;
              const y = a.y + (b.y - a.y) * ease;
              const back = Math.max(0, ease - 0.22);
              const tx = a.x + (b.x - a.x) * back;
              const ty = a.y + (b.y - a.y) * back;
              const g = ctx.createLinearGradient(tx, ty, x, y);
              g.addColorStop(0, "transparent");
              g.addColorStop(1, tech);
              ctx.strokeStyle = g;
              ctx.lineWidth = 1.5;
              ctx.lineCap = "round";
              ctx.globalAlpha = (dark ? 0.75 : 0.5) * fade;
              ctx.beginPath();
              ctx.moveTo(tx, ty);
              ctx.lineTo(x, y);
              ctx.stroke();
              const halo = ctx.createRadialGradient(x, y, 0, x, y, 7);
              halo.addColorStop(0, tech);
              halo.addColorStop(1, "transparent");
              ctx.fillStyle = halo;
              ctx.globalAlpha = (dark ? 0.5 : 0.3) * fade;
              ctx.beginPath();
              ctx.arc(x, y, 7, 0, 6.2832);
              ctx.fill();
              ctx.fillStyle = dark ? "#ffffff" : tech;
              ctx.globalAlpha = (dark ? 0.95 : 0.7) * fade;
              ctx.beginPath();
              ctx.arc(x, y, 1.3, 0, 6.2832);
              ctx.fill();
            }
          }
        }

        pts.forEach((layer, li) => {
          const hot = reduced ? 0 : li === seg ? 1 - ease * 0.7 : li === seg + 1 ? ease : 0;
          layer.forEach((p, ni) => {
            const tw = reduced ? 1 : 0.6 + 0.4 * Math.sin(t / 900 + li * 1.7 + ni);
            const glow = 4 + 10 * hot;
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
            g.addColorStop(0, tech);
            g.addColorStop(1, "transparent");
            ctx.fillStyle = g;
            ctx.globalAlpha = (dark ? 0.3 : 0.13) * tw + (dark ? 0.5 : 0.3) * hot;
            ctx.beginPath();
            ctx.arc(p.x, p.y, glow, 0, 6.2832);
            ctx.fill();

            ctx.fillStyle = dark ? "#ffffff" : ink;
            ctx.globalAlpha = (dark ? 0.7 : 0.55) * tw + 0.4 * hot;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5 + 0.8 * hot, 0, 6.2832);
            ctx.fill();

            if (hot > 0.1) {
              const s = 4 + 9 * hot;
              ctx.strokeStyle = tech;
              ctx.lineWidth = 0.9;
              ctx.lineCap = "round";
              ctx.globalAlpha = 0.5 * hot;
              ctx.beginPath();
              ctx.moveTo(p.x - s, p.y);
              ctx.lineTo(p.x + s, p.y);
              ctx.moveTo(p.x, p.y - s);
              ctx.lineTo(p.x, p.y + s);
              ctx.stroke();
            }
          });
        });
        ctx.globalAlpha = 1;
        if (!reduced) raf = requestAnimationFrame(draw);
      };

      raf = requestAnimationFrame(draw);
      if (reduced) draw(0);
    };

    start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ display: "block", width: "100%", height: "210px", marginTop: 6 }}
      className="max-[640px]:h-[160px]!"
    />
  );
}
