import Image from "next/image";

interface FigureProps {
  src: string;
  caption: string;
  alt?: string;
}

export function Figure({ src, caption, alt }: FigureProps) {
  return (
    <figure className="m-0 mt-[26px]">
      <div className="overflow-hidden rounded-[8px] border border-line">
        <Image
          src={src}
          alt={alt ?? caption}
          width={1200}
          height={750}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="m-0 mt-[11px] font-mono text-[11px] text-ink2">{caption}</figcaption>
    </figure>
  );
}
