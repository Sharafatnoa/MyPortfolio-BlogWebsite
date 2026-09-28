import Image from "next/image";

export function PortraitCard() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-line bg-panel">
      <div className="stripe-placeholder relative aspect-square overflow-hidden">
        <Image
          src="/portrait.jpeg"
          alt="Portrait of Shamsunnur Ibn Arefin"
          fill
          sizes="(max-width: 860px) 360px, 40vw"
          className="object-cover"
          priority
        />
        <div
          aria-hidden
          className="scan-line pointer-events-none absolute top-0 right-0 left-0 h-[16%]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--tech) 26%, transparent), transparent)",
            animation: "om-scan 4.2s linear infinite",
          }}
        />
        <div
          aria-hidden
          className="orbit-ring pointer-events-none absolute top-3 right-3 h-5 w-5 rounded-full border border-tech"
          style={{
            borderTopColor: "transparent",
            borderRightColor: "transparent",
            animation: "om-orbit 2.6s linear infinite",
          }}
        />
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-[14px] font-mono text-[11px] text-ink2">
        <span>Borås, SE</span>
        <span className="flex items-center gap-[6px]">
          <span className="blink h-[6px] w-[6px] rounded-full" style={{ background: "var(--tech)" }} />
          57.7°N
        </span>
      </div>
    </div>
  );
}
