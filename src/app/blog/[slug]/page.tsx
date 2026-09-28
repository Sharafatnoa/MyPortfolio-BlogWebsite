import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CoverPlaceholder } from "@/components/cover-placeholder";
import { mdxComponents } from "@/components/mdx";
import { formatDate } from "@/lib/utils";
import { getAllSlugs, getPost } from "@/lib/posts";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) return {};
  const { frontmatter } = getPost(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) notFound();

  const { frontmatter, content, attachments, readTimeText } = getPost(slug);
  const color = frontmatter.type === "journal" ? "var(--journal)" : "var(--tech)";

  return (
    <article className="mx-auto max-w-[700px] py-[52px] pb-[96px]">
      <Link href="/blog" className="font-mono text-[11.5px] text-ink2 hover:text-ink">
        ← blog
      </Link>

      <div className="mt-7 mb-4 flex items-center gap-[10px] font-mono text-[11px]">
        <span className="rounded-[4px] border px-[7px] py-[3px]" style={{ color, borderColor: color }}>
          {frontmatter.type}
        </span>
        <span className="text-ink2">{formatDate(frontmatter.date)}</span>
        <span className="text-ink2">· {readTimeText} read</span>
      </div>

      <h1
        className="m-0 text-[36px] font-semibold text-balance max-[640px]:text-[28px]"
        style={{ lineHeight: 1.14, letterSpacing: "-1px" }}
      >
        {frontmatter.title}
      </h1>

      <div className="mt-9 overflow-hidden rounded-[8px] border border-line">
        <CoverPlaceholder label={frontmatter.cover} aspect="16/9" />
      </div>

      <div className="post-body mt-[34px]">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {attachments.length > 0 && (
        <div className="mt-11 border-t border-line pt-6">
          <h3
            className="m-0 font-mono text-[11px] font-normal text-ink2"
            style={{ letterSpacing: "0.3px" }}
          >
            attachments ({attachments.length})
          </h3>
          <div className="mt-[14px] flex flex-col gap-2">
            {attachments.map((a) => (
              <a
                key={a.href}
                href={a.href}
                download
                className="flex items-center gap-[14px] rounded-[7px] border border-line bg-panel px-[15px] py-[13px] text-ink hover:border-ink2"
              >
                <span className="min-w-[46px] rounded-[4px] border border-tech px-[6px] py-[3px] text-center font-mono text-[10px] text-tech">
                  {a.ext}
                </span>
                <span className="flex-1 text-[14.5px]">{a.name}</span>
                <span className="font-mono text-[11px] text-ink2">{a.size}</span>
                <span className="font-mono text-[11px] text-ink2">↓</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-11 flex items-start gap-[18px] border-t border-line pt-[26px]">
        <div className="stripe-placeholder h-14 w-14 shrink-0 rounded-[6px] border border-line" />
        <div>
          <p className="m-0 text-[14.5px] text-ink2" style={{ lineHeight: 1.6 }}>
            <span className="font-semibold text-ink">Shamsunnur Ibn Arefin</span> is a data science
            student and former QA engineer, writing from Skövde, Sweden.
          </p>
          <Link href="/" className="mt-2 block font-mono text-[11.5px] text-tech">
            about →
          </Link>
        </div>
      </div>
    </article>
  );
}
