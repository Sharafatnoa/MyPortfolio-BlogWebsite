import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on data science and system design, and a slower record of life in Sweden.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-16 pb-[88px]">
      <SectionHeading as="h1" title="blog" ruleMaxWidth={360} />
      <p className="m-0 max-w-[56ch] text-base text-ink2" style={{ lineHeight: 1.6 }}>
        Notes on data science and system design, and a slower record of life in Sweden. Two kinds of
        writing, one feed.
      </p>
      <BlogList posts={posts} />
    </section>
  );
}
