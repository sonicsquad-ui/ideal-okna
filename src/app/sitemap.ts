import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import {
  CONSTRUCTIONS,
  CANVASES,
  COMPONENTS,
  SERVICES,
  SITE,
} from "@/lib/site-data";

export const revalidate = 86400; // раз в сутки

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/katalog/konstrukcii`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/katalog/polotna`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/komplektuyushchie`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/uslugi`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ceny`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kalkulyator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sravnenie`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/o-kompanii`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/galereya`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/otzyvy`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/akcii`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/instrukciya-zamera`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/garantii`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/kontakty`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const constructionRoutes: MetadataRoute.Sitemap = CONSTRUCTIONS.map((c) => ({
    url: `${base}/katalog/konstrukcii/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const canvasRoutes: MetadataRoute.Sitemap = CANVASES.map((c) => ({
    url: `${base}/katalog/polotna/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const componentRoutes: MetadataRoute.Sitemap = COMPONENTS.map((c) => ({
    url: `${base}/komplektuyushchie/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/uslugi/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    /* noop */
  }

  return [
    ...staticRoutes,
    ...constructionRoutes,
    ...canvasRoutes,
    ...componentRoutes,
    ...serviceRoutes,
    ...blogRoutes,
  ];
}
