import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const post = await db.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    return NextResponse.json({ ok: false, error: "Не найдено" }, { status: 404 });
  }

  return NextResponse.json({ post });
}
