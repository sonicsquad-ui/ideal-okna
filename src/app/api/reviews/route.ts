import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendLeadEmail } from "@/lib/email";

// Получить одобренные отзывы
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") || "12"), 50);

  const reviews = await db.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 5;

  return NextResponse.json({ reviews, average: Math.round(avg * 10) / 10, count: reviews.length });
}

// Оставить отзыв (создаётся не одобренным)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, city, rating, text, service } = body;

    if (!name || !text) {
      return NextResponse.json(
        { ok: false, error: "Имя и текст отзыва обязательны" },
        { status: 400 }
      );
    }

    const review = await db.review.create({
      data: {
        name: String(name).slice(0, 120),
        city: city ? String(city).slice(0, 80) : "Орёл",
        rating: Math.max(1, Math.min(5, Number(rating) || 5)),
        text: String(text).slice(0, 2000),
        service: service ? String(service).slice(0, 200) : null,
        approved: false,
      },
    });

    // Уведомление на почту о новом отзыве (требует модерации)
    await sendLeadEmail({
      name: String(name),
      phone: `Оценка: ${Math.max(1, Math.min(5, Number(rating) || 5))}★, Город: ${city || "Орёл"}`,
      type: "review",
      message: String(text),
      source: service ? `Услуга: ${service}` : "Отзыв с сайта",
    });

    return NextResponse.json({ ok: true, id: review.id });
  } catch (e) {
    console.error("Review create error:", e);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
