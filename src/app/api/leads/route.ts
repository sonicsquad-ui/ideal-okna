import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendLeadEmail } from "@/lib/email";

// Создание заявки (обратный звонок, квиз, калькулятор, форма)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, type = "callback", message, data, source } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    // Сохраняем заявку в БД
    const lead = await db.lead.create({
      data: {
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 60),
        type: String(type).slice(0, 40),
        message: message ? String(message).slice(0, 2000) : null,
        data: data ? JSON.stringify(data) : null,
        source: source ? String(source).slice(0, 300) : null,
      },
    });

    // Отправляем уведомление на почту (не блокируем ответ при ошибке)
    const emailSent = await sendLeadEmail({
      name: String(name),
      phone: String(phone),
      type: String(type),
      message: message ? String(message) : null,
      data: data ? JSON.stringify(data) : null,
      source: source ? String(source) : null,
    });

    return NextResponse.json({
      ok: true,
      id: lead.id,
      emailSent,
    });
  } catch (e) {
    console.error("Lead create error:", e);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
