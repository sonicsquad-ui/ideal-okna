import { db } from "../src/lib/db";
const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 3, select: { name: true, phone: true, type: true, source: true, createdAt: true } });
console.log(JSON.stringify(leads, null, 2));
await db.$disconnect();
