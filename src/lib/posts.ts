import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostType = "technical" | "journal";

export interface AttachmentRef {
  file: string;
  label: string;
}

export interface ResolvedAttachment {
  name: string;
  ext: string;
  size: string;
  href: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  type: PostType;
  excerpt: string;
  cover: string;
  readTime?: number;
  attachments?: AttachmentRef[];
  draft?: boolean;
}

export interface PostSummary extends PostFrontmatter {
  slug: string;
  readTimeText: string;
}

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

function postDir(slug: string) {
  return path.join(POSTS_DIR, slug);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((slug) => fs.existsSync(path.join(postDir(slug), "index.mdx")));
}

function readFrontmatter(slug: string): { frontmatter: PostFrontmatter; content: string } {
  const raw = fs.readFileSync(path.join(postDir(slug), "index.mdx"), "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as PostFrontmatter, content };
}

function readTimeText(frontmatter: PostFrontmatter, content: string): string {
  if (frontmatter.readTime) return `${frontmatter.readTime} min`;
  const minutes = Math.max(1, Math.round(readingTime(content).minutes));
  return `${minutes} min`;
}

export function getAllPosts(): PostSummary[] {
  return getAllSlugs()
    .map((slug) => {
      const { frontmatter, content } = readFrontmatter(slug);
      return {
        ...frontmatter,
        slug,
        readTimeText: readTimeText(frontmatter, content),
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function resolveAttachments(slug: string, attachments: AttachmentRef[] | undefined): ResolvedAttachment[] {
  if (!attachments) return [];
  return attachments
    .map((a) => {
      const rel = a.file.replace(/^\.\//, "");
      const abs = path.join(postDir(slug), rel);
      if (!fs.existsSync(abs)) return null;
      const stat = fs.statSync(abs);
      return {
        name: a.label,
        ext: path.extname(rel).slice(1),
        size: formatSize(stat.size),
        href: `/blog/${slug}/files/${encodeURIComponent(rel)}`,
      };
    })
    .filter((a): a is ResolvedAttachment => a !== null);
}

export function getPost(slug: string) {
  const { frontmatter, content } = readFrontmatter(slug);
  return {
    frontmatter,
    content,
    readTimeText: readTimeText(frontmatter, content),
    attachments: resolveAttachments(slug, frontmatter.attachments),
  };
}

export function resolveAttachmentPath(slug: string, file: string): string | null {
  const abs = path.join(postDir(slug), file);
  const normalizedDir = path.normalize(postDir(slug) + path.sep);
  const normalizedAbs = path.normalize(abs);
  if (!normalizedAbs.startsWith(normalizedDir)) return null;
  if (!fs.existsSync(normalizedAbs)) return null;
  return normalizedAbs;
}
