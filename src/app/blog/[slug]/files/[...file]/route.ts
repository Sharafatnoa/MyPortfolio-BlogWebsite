import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { resolveAttachmentPath } from "@/lib/posts";

const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  csv: "text/csv",
  ipynb: "application/x-ipynb+json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  mp4: "video/mp4",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; file: string[] }> },
) {
  const { slug, file } = await params;
  const relPath = file.join("/");
  const absPath = resolveAttachmentPath(slug, relPath);
  if (!absPath) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(absPath).slice(1).toLowerCase();
  const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";
  const buffer = fs.readFileSync(absPath);
  const filename = path.basename(absPath);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(buffer.length),
    },
  });
}
