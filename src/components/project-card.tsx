import type { Project } from "@/content/data/types";

function kindColor(kind: Project["kind"]) {
  return kind === "personal" ? "var(--journal)" : "var(--tech)";
}

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-[9px] rounded-[8px] border border-line bg-panel px-[18px] pt-[18px] pb-[16px]">
      <span className="font-mono text-[10.5px] text-ink2">{project.kind}</span>
      <h3 className="m-0 text-[16px] font-semibold" style={{ letterSpacing: "-0.3px" }}>
        {project.title}
      </h3>
      <p className="m-0 flex-1 text-[13.5px] text-balance text-ink2" style={{ lineHeight: 1.55 }}>
        {project.desc}
      </p>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="mt-1 font-mono text-[11px]"
      >
        github ↗
      </a>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const color = kindColor(project.kind);
  return (
    <div className="flex flex-col rounded-[8px] border border-line bg-panel">
      <div className="flex items-center gap-[9px] px-[19px] pt-[18px] font-mono text-[10.5px]">
        <span className="rounded-[4px] border px-[6px] py-[2.5px]" style={{ color, borderColor: color }}>
          {project.kind}
        </span>
        <span className="ml-auto text-ink2">{project.year}</span>
      </div>
      <div className="flex flex-1 flex-col gap-[10px] px-[19px] pt-[13px] pb-[19px]">
        <h3 className="m-0 text-[17px] font-semibold" style={{ letterSpacing: "-0.3px" }}>
          {project.title}
        </h3>
        <p className="m-0 flex-1 text-[14px] text-balance text-ink2" style={{ lineHeight: 1.58 }}>
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-[6px]">
          {project.stack.map((s) => (
            <span key={s} className="rounded-[4px] bg-soft px-[7px] py-[4px] font-mono text-[10.5px] text-ink2">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-1 flex gap-4 border-t border-line pt-[13px]">
          <a href={project.href} target="_blank" rel="noreferrer" className="font-mono text-[11px]">
            github ↗
          </a>
          <span className="ml-auto font-mono text-[11px] text-ink2">{project.meta}</span>
        </div>
      </div>
    </div>
  );
}
