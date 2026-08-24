import nodemailer from "nodemailer";

// Транспорт для отправки почты на idealokna57@mail.ru
// Используется SMTP mail.ru
function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP_USER и SMTP_PASS должны быть заданы в .env");
  }

  return nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // SSL
    auth: { user, pass },
  });
}

export interface LeadEmailData {
  name: string;
  phone: string;
  type: string;
  message?: string | null;
  source?: string | null;
  data?: string | null;
}

const TYPE_LABELS: Record<string, string> = {
  callback: "Обратный звонок",
  quiz: "Квиз на главной",
  calculator: "Калькулятор стоимости",
  contact: "Форма контактов",
  service: "Заявка на услугу/товар",
  promotion: "Подписка на акции",
  chat: "Онлайн-чат",
  review: "Новый отзыв (требует модерации)",
  qa_test: "Тестовая заявка",
};

export async function sendLeadEmail(lead: LeadEmailData): Promise<boolean> {
  const to = process.env.LEADS_EMAIL || "idealokna57@mail.ru";
  const from = process.env.SMTP_USER || "idealokna57@mail.ru";

  const typeLabel = TYPE_LABELS[lead.type] || lead.type;
  const subject = `Новая заявка с сайта ИДЕАЛ: ${typeLabel}`;

  let extraHtml = "";
  if (lead.data) {
    try {
      const parsed = JSON.parse(lead.data);
      extraHtml = `<p><strong>Доп. данные:</strong></p><pre style="background:#f4f4f4;padding:10px;border-radius:4px;white-space:pre-wrap;">${JSON.stringify(parsed, null, 2)}</pre>`;
    } catch {
      extraHtml = `<p><strong>Доп. данные:</strong> ${lead.data}</p>`;
    }
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1e3a5f; color: #fff; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">Новая заявка с сайта ИДЕАЛ</h1>
        <p style="margin: 5px 0 0; opacity: 0.9;">ideal-okna57.ru</p>
      </div>
      <div style="background: #fff; border: 1px solid #e0e0e0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #555;">Тип заявки:</td>
            <td style="padding: 8px 0;">${typeLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Имя:</td>
            <td style="padding: 8px 0;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Телефон:</td>
            <td style="padding: 8px 0;"><a href="tel:${lead.phone}" style="color: #1e3a5f;">${lead.phone}</a></td>
          </tr>
          ${lead.source ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Источник:</td><td style="padding: 8px 0;">${lead.source}</td></tr>` : ""}
          ${lead.message ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Комментарий:</td><td style="padding: 8px 0;">${lead.message}</td></tr>` : ""}
        </table>
        ${extraHtml}
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; margin: 0;">
          Письмо отправлено автоматически с сайта ideal-okna57.ru.<br>
          Дата: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}
        </p>
      </div>
    </div>
  `;

  const text = `Новая заявка с сайта ИДЕАЛ (${typeLabel})\n\nИмя: ${lead.name}\nТелефон: ${lead.phone}\n${lead.source ? `Источник: ${lead.source}\n` : ""}${lead.message ? `Комментарий: ${lead.message}\n` : ""}`;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Сайт ИДЕАЛ" <${from}>`,
      to,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}
