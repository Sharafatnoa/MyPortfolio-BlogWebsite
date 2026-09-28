import { STUDIES } from "@/content/data/education";

export function EducationTimeline() {
  return (
    <div className="flex max-w-[760px] flex-col border-l border-line">
      {STUDIES.map((s) => (
        <div key={s.degree} className="relative py-1 pb-[34px] pl-[30px]">
          <span
            className="absolute top-[9px] left-[-5px] h-[9px] w-[9px] rounded-full"
            style={{
              background: s.current ? "var(--tech)" : "var(--ink2)",
              boxShadow: `0 0 10px ${s.current ? "var(--tech)" : "var(--ink2)"}`,
            }}
          />
          <p className="m-0 font-mono text-xs text-ink2">{s.dates}</p>
          <h3 className="m-0 mt-2 text-[21px] font-semibold text-balance" style={{ lineHeight: 1.35, letterSpacing: "-0.4px" }}>
            {s.degree} <span className="text-tech">@ {s.school}</span>
          </h3>
          <p className="m-0 mt-1 text-sm text-ink2">{s.place}</p>
          <div className="mt-4 flex flex-col gap-[10px]">
            {s.points.map((pt) => (
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
          <div className="mt-4 flex flex-wrap gap-[6px]">
            {s.courses.map((c) => (
              <span
                key={c}
                className="rounded-[4px] border border-line bg-soft px-2 py-1 font-mono text-[10.5px] text-ink2"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
