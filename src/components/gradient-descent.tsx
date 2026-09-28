"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GradientDescentProps {
  defaultLr?: number;
  steps?: number;
}

const LR_OPTIONS: Array<[number, string]> = [
  [0.02, "0.02 · too small"],
  [0.1, "0.1 · good"],
  [0.23, "0.23 · zig-zag"],
  [0.26, "0.26 · diverges"],
];

type Status = "running…" | "converged" | "diverged" | "still descending";

function f(x: number, y: number) {
  return 0.5 * (x * x + 8 * y * y);
}

function buildPath(lr: number, steps: number) {
  const path: [number, number][] = [[-4.4, 1.55]];
  let diverged = false;
  for (let i = 0; i < steps; i++) {
    const [x, y] = path[path.length - 1];
    const nx = x - lr * x;
    const ny = y - lr * 8 * y;
    path.push([nx, ny]);
    if (Math.abs(nx) > 6 || Math.abs(ny) > 2.6) {
      diverged = true;
      break;
    }
  }
  return { path, diverged };
}

export function GradientDescent({ defaultLr = 0.1, steps = 40 }: GradientDescentProps) {
  const [lr, setLr] = useState(defaultLr);
  const [runId, setRunId] = useState(0);
  const [gdStep, setGdStep] = useState("0");
  const [gdLoss, setGdLoss] = useState("—");
  const [gdStatus, setGdStatus] = useState<Status>("running…");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const { path, diverged } = buildPath(lr, steps);
    const STEP = 120;
    const t0 = performance.now();
    let shown = -1;
    let raf = 0;

    const render = (t: number, forceFinal: boolean) => {
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (cv.width !== Math.round(w * dpr)) {
        cv.width = w * dpr;
        cv.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cs = getComputedStyle(document.documentElement);
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      const ink = cs.getPropertyValue("--ink").trim() || "#000";
      const tech = cs.getPropertyValue("--tech").trim() || "#39f";
      const warn = cs.getPropertyValue("--journal").trim() || "#e84";
      const sc = Math.min(w / 10.6, h / 4.8);
      const cx = w / 2;
      const cy = h / 2;
      const X = (x: number) => cx + x * sc;
      const Y = (y: number) => cy - y * sc;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = ink;
      ctx.lineWidth = 0.8;
      [0.3, 1, 2.2, 4, 6.5, 9.5, 13, 17].forEach((c, i) => {
        ctx.globalAlpha = (dark ? 0.2 : 0.16) - i * 0.013;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.sqrt(2 * c) * sc, Math.sqrt((2 * c) / 8) * sc, 0, 0, 6.2832);
        ctx.stroke();
      });

      const tw = reduced ? 1 : 0.7 + 0.3 * Math.sin(t / 500);
      let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16);
      g.addColorStop(0, tech);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.globalAlpha = 0.55 * tw;
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, 6.2832);
      ctx.fill();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = dark ? "#fff" : tech;
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, 6.2832);
      ctx.fill();
      ctx.strokeStyle = tech;
      ctx.globalAlpha = 0.5 * tw;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 9, cy);
      ctx.lineTo(cx + 9, cy);
      ctx.moveTo(cx, cy - 9);
      ctx.lineTo(cx, cy + 9);
      ctx.stroke();

      let k: number;
      let e: number;
      if (forceFinal) {
        k = path.length - 1;
        e = 1;
      } else {
        const el = Math.max(0, t - t0);
        const total = (path.length - 1) * STEP;
        const loopT = el % (total + 2200);
        k = Math.max(0, Math.min(path.length - 1, Math.floor(loopT / STEP)));
        const fr = loopT >= total ? 1 : (loopT % STEP) / STEP;
        e = fr * fr * (3 - 2 * fr);
      }
      const col = diverged ? warn : tech;

      ctx.lineWidth = 1.3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = col;
      ctx.globalAlpha = dark ? 0.6 : 0.5;
      ctx.beginPath();
      ctx.moveTo(X(path[0][0]), Y(path[0][1]));
      for (let i = 1; i <= k; i++) ctx.lineTo(X(path[i][0]), Y(path[i][1]));
      const a = path[k];
      const b = path[Math.min(k + 1, path.length - 1)];
      const px = a[0] + (b[0] - a[0]) * e;
      const py = a[1] + (b[1] - a[1]) * e;
      ctx.lineTo(X(px), Y(py));
      ctx.stroke();
      ctx.fillStyle = col;
      for (let i = 0; i <= k; i++) {
        ctx.globalAlpha = dark ? 0.7 : 0.55;
        ctx.beginPath();
        ctx.arc(X(path[i][0]), Y(path[i][1]), 1.8, 0, 6.2832);
        ctx.fill();
      }

      g = ctx.createRadialGradient(X(px), Y(py), 0, X(px), Y(py), 11);
      g.addColorStop(0, col);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(X(px), Y(py), 11, 0, 6.2832);
      ctx.fill();
      ctx.fillStyle = dark ? "#fff" : col;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(X(px), Y(py), 2.6, 0, 6.2832);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (k !== shown) {
        shown = k;
        const done = k >= path.length - 1;
        const loss = f(path[k][0], path[k][1]);
        setGdStep(String(k));
        setGdLoss(loss > 999 ? loss.toExponential(1) : loss.toFixed(3));
        setGdStatus(!done ? "running…" : diverged ? "diverged" : loss < 0.01 ? "converged" : "still descending");
      }
    };

    if (reduced) {
      render(0, true);
    } else {
      const loop = (t: number) => {
        render(t, false);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(raf);
  }, [lr, runId, steps]);

  const statusColor =
    gdStatus === "diverged" ? "var(--journal)" : gdStatus === "converged" ? "var(--tech)" : "var(--ink2)";

  return (
    <figure className="m-0 mt-[26px]">
      <div className="overflow-hidden rounded-[8px] border border-line bg-panel">
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-[14px] py-[12px]">
          <span className="mr-1 font-mono text-[11px] text-ink2">η =</span>
          {LR_OPTIONS.map(([v, label]) => {
            const on = lr === v;
            return (
              <button
                key={v}
                onClick={() => {
                  setLr(v);
                  setRunId((r) => r + 1);
                }}
                className={cn(
                  "rounded-full border px-[11px] py-[5px] font-mono text-[11px]",
                  on ? "border-ink bg-ink text-bg" : "border-line bg-transparent text-ink2",
                )}
              >
                {label}
              </button>
            );
          })}
          <button
            onClick={() => setRunId((r) => r + 1)}
            className="ml-auto rounded-full border border-line px-[11px] py-[5px] font-mono text-[11px] text-ink2 hover:border-ink2 hover:text-ink"
          >
            ↻ replay
          </button>
        </div>
        <canvas ref={canvasRef} className="block w-full" style={{ aspectRatio: "16/8" }} />
        <div className="flex flex-wrap gap-5 border-t border-line px-[14px] py-[11px] font-mono text-[11px] text-ink2">
          <span>
            step <span className="text-ink">{gdStep}</span>
          </span>
          <span>
            loss <span className="text-ink">{gdLoss}</span>
          </span>
          <span className="ml-auto" style={{ color: statusColor }}>
            {gdStatus}
          </span>
        </div>
      </div>
      <figcaption className="m-0 mt-[11px] font-mono text-[11px] text-ink2">
        Fig. 1 — {steps} steps from the same starting point. Choose a learning rate above.
      </figcaption>
    </figure>
  );
}
