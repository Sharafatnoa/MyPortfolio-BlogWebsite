import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] flex-col justify-center py-16">
      <p className="m-0 font-mono text-xs text-tech">404</p>
      <h1
        className="m-0 mt-2 text-[32px] font-semibold"
        style={{ letterSpacing: "-0.6px" }}
      >
        Page not found
      </h1>
      <p className="m-0 mt-3 max-w-[46ch] text-sm text-ink2" style={{ lineHeight: 1.6 }}>
        Nothing lives at this address. Try the homepage, or the blog.
      </p>
      <div className="mt-6 flex gap-4 font-mono text-[11.5px] text-tech">
        <Link href="/">home →</Link>
        <Link href="/blog">blog →</Link>
      </div>
    </section>
  );
}
