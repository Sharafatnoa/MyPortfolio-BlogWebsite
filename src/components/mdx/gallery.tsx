import Image from "next/image";

export function Gallery({ images }: { images: string[] }) {
  return (
    <div className="mt-[26px] grid grid-cols-2 gap-[10px] sm:grid-cols-3">
      {images.map((src) => (
        <div key={src} className="overflow-hidden rounded-[8px] border border-line">
          <Image src={src} alt="" width={480} height={480} className="aspect-square h-auto w-full object-cover" />
        </div>
      ))}
    </div>
  );
}
