"use client";

import { useState } from "react";
import { JOBS } from "@/content/data/jobs";
import { cn } from "@/lib/utils";

export function ExperienceTabs() {
  const [active, setActive] = useState(0);
  const job = JOBS[active];

  return (
    <div className="flex min-h-[330px] flex-wrap gap-[34px]">
      <div className="flex max-w-full flex-row overflow-x-auto border-b border-line min-[861px]:flex-col min-[861px]:overflow-visible min-[861px]:border-b-0 min-[861px]:border-l">
        {JOBS.map((j, i) => {
          const on = active === i;
          return (
            <button
              key={j.short}
              onClick={() => setActive(i)}
              className={cn(
                "border-l-2 py-3 pr-[22px] pl-[18px] font-mono text-xs whitespace-nowrap transition-colors hover:bg-soft hover:text-tech",
                on ? "bg-soft text-tech" : "text-ink2",
              )}
              style={{ borderLeftColor: on ? "var(--tech)" : "transparent", marginLeft: -1.5 }}
            >
              {j.short}
            </button>
          );
        })}
      </div>
      <div className="min-w-[280px] max-w-[620px] flex-1">
        <h3 className="m-0 text-[21px] font-semibold text-balance" style={{ lineHeight: 1.35, letterSpacing: "-0.4px" }}>
          {job.role} <span className="text-tech">@ {job.company}</span>
        </h3>
        <p className="m-0 mt-2 font-mono text-xs text-ink2">
          {job.dates} · {job.place}
        </p>
        <div className="mt-6 flex flex-col gap-[14px]">
          {job.points.map((pt) => (
            <div key={pt} className="flex items-start gap-[14px]">
              <span className="shrink-0 text-[11px] text-tech" style={{ lineHeight: 1.9 }}>
                ▹
              </span>
              <p className="m-0 text-[15px] text-balance text-ink2" style={{ lineHeight: 1.65 }}>
                {pt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
