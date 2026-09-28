"use client";

import { useState } from "react";
import { PostCard } from "./post-card";
import { cn } from "@/lib/utils";
import type { PostSummary, PostType } from "@/lib/posts";

type Filter = "all" | PostType;

const FILTERS: Array<[Filter, string]> = [
  ["all", "All"],
  ["technical", "Technical"],
  ["journal", "Journal"],
];

export function BlogList({ posts }: { posts: PostSummary[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = posts.filter((p) => filter === "all" || p.type === filter);

  return (
    <>
      <div className="mt-[30px] mb-[26px] flex gap-2">
        {FILTERS.map(([id, label]) => {
          const on = filter === id;
          return (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={cn(
                "rounded-full border px-[14px] py-[7px] font-mono text-[11.5px]",
                on ? "border-ink bg-ink text-bg" : "border-line bg-transparent text-ink2",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      {filtered.length > 0 ? (
        <div className="grid gap-[26px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} showReadTime />
          ))}
        </div>
      ) : (
        <p className="m-0 text-sm text-ink2">No posts in this category yet.</p>
      )}
    </>
  );
}
