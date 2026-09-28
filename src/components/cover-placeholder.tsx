import { cn } from "@/lib/utils";

interface CoverPlaceholderProps {
  label: string;
  aspect?: string;
  className?: string;
}

export function CoverPlaceholder({ label, aspect = "16/10", className }: CoverPlaceholderProps) {
  return (
    <div
      className={cn("stripe-placeholder flex items-end p-[11px]", className)}
      style={{ aspectRatio: aspect }}
    >
      <span className="font-mono text-[10px] text-ink2">{label}</span>
    </div>
  );
}
