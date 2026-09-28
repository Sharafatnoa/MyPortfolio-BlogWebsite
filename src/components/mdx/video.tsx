export function Video({ src }: { src: string }) {
  return (
    <div className="mt-[26px] overflow-hidden rounded-[8px] border border-line">
      <video src={src} muted autoPlay loop playsInline className="block h-auto w-full" />
    </div>
  );
}
