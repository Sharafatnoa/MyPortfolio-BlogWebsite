import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  id?: string;
  as?: "h1" | "h2";
  linkHref?: string;
  linkLabel?: string;
  ruleMaxWidth?: number;
}

export function SectionHeading({
  title,
  id,
  as = "h2",
  linkHref,
  linkLabel,
  ruleMaxWidth = 320,
}: SectionHeadingProps) {
  const Tag = as as "h2";
  const sizeClass =
    as === "h1"
      ? "text-[36px] tracking-[-0.9px] max-[640px]:text-[26px]"
      : "text-[28px] tracking-[-0.6px] max-[640px]:text-[22px]";
  return (
    <div id={id} className="mb-[28px] flex scroll-mt-16 items-center gap-[18px]">
      <Tag className={`m-0 flex items-baseline gap-[10px] font-semibold whitespace-nowrap ${sizeClass}`}>
        <span className="font-mono font-normal text-tech">/</span>
        {title}
      </Tag>
      <div className="h-px flex-1 bg-line" style={{ maxWidth: ruleMaxWidth }} />
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="link-arrow ml-auto shrink-0 font-mono text-xs whitespace-nowrap text-tech"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
