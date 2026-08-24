import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Список статей блога
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") || "20"), 50);
  const category = url.searchParams.get("category");

  const posts = await db.blogPost.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      image: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ posts });
}
