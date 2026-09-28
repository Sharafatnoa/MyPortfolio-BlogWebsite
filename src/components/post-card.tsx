import Link from "next/link";
import { CoverPlaceholder } from "./cover-placeholder";
import { formatDate } from "@/lib/utils";
import type { PostSummary } from "@/lib/posts";

interface PostCardProps {
  post: PostSummary;
  showReadTime?: boolean;
}

export function PostCard({ post, showReadTime = false }: PostCardProps) {
  const color = post.type === "journal" ? "var(--journal)" : "var(--tech)";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[8px] border border-line bg-panel text-ink transition-colors hover:border-ink2"
    >
      <CoverPlaceholder label={post.cover} />
      <div className="flex flex-1 flex-col gap-[9px] px-[17px] pt-[16px] pb-[18px]">
        <div className="flex items-center gap-[9px] font-mono text-[10.5px]">
          <span
            className="rounded-[4px] border px-[6px] py-[2.5px]"
            style={{ color, borderColor: color }}
          >
            {post.type}
          </span>
          <span className="text-ink2">{formatDate(post.date)}</span>
          {showReadTime && <span className="ml-auto text-ink2">{post.readTimeText} read</span>}
        </div>
        <h3
          className={`m-0 mt-[2px] font-semibold text-balance ${showReadTime ? "text-[17.5px]" : "text-[17px]"}`}
          style={{ lineHeight: 1.28, letterSpacing: "-0.3px" }}
        >
          {post.title}
        </h3>
        <p className="m-0 text-[14px] text-balance text-ink2" style={{ lineHeight: 1.55 }}>
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
