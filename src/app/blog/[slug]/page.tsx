import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBanner } from "@/components/site/cta-banner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Tag,
  Share2,
  Clock,
} from "lucide-react";

export const revalidate = 300;

// ---------- Статические пути ----------
export async function generateStaticParams() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

// ---------- Метаданные ----------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    return { title: "Статья не найдена" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ideal-okna57.ru";

  return {
    title: `${post.title}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: post.tags
        ? post.tags.split(",").map((t) => t.trim())
        : [post.category],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ---------- Утилиты ----------
function formatDate(iso: Date): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(iso);
  } catch {
    return "";
  }
}

function formatDateTime(iso: Date): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(iso);
  } catch {
    return "";
  }
}

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180));
  return `${minutes} мин`;
}

// ---------- Лёгкий markdown-рендерер ----------
// Поддерживает: ## Заголовки, - списки, **жирный**, обычные абзацы.
function renderInline(text: string, keyBase: string): React.ReactNode[] {
  // Разбиваем по **жирным** фрагментам
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyBase}-b-${i}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${keyBase}-t-${i}`}>{part}</span>;
  });
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = [...listBuffer];
    const key = `ul-${listKey++}`;
    blocks.push(
      <ul key={key} className="my-3 space-y-1.5 pl-5">
        {items.map((item, i) => (
          <li key={`${key}-li-${i}`} className="list-disc text-muted-foreground">
            <span className="text-foreground/90">
              {renderInline(item, `${key}-i-${i}`)}
            </span>
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushList();
      return;
    }

    // Заголовок H2
    if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2
          key={`h2-${idx}`}
          className="mt-7 mb-3 text-2xl font-bold tracking-tight text-foreground"
        >
          {line.slice(3).trim()}
        </h2>
      );
      return;
    }

    // Заголовок H3
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3
          key={`h3-${idx}`}
          className="mt-6 mb-2 text-xl font-semibold tracking-tight text-foreground"
        >
          {line.slice(4).trim()}
        </h3>
      );
      return;
    }

    // Пункт списка
    if (line.startsWith("- ") || line.startsWith("* ")) {
      listBuffer.push(line.slice(2).trim());
      return;
    }

    // Нумерованный список (примитивно: "1. ", "2. ")
    const orderedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (orderedMatch) {
      listBuffer.push(orderedMatch[2]);
      return;
    }

    // Обычный абзац
    flushList();
    blocks.push(
      <p key={`p-${idx}`} className="my-3 leading-relaxed text-muted-foreground">
        {renderInline(line, `p-${idx}`)}
      </p>
    );
  });

  flushList();

  return <div className="blog-content">{blocks}</div>;
}

// ---------- Страница ----------
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  // Похожие статьи (приоритет — той же категории)
  const related = await db.blogPost.findMany({
    where: {
      published: true,
      slug: { not: slug },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const sameCategory = related.filter((p) => p.category === post.category);
  const others = related.filter((p) => p.category !== post.category);
  const relatedPosts = [...sameCategory, ...others].slice(0, 3);

  const tags = post.tags
    ? post.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const shareUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://ideal-okna57.ru"
  }/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    articleSection: post.category,
    keywords: post.tags || post.category,
    url: shareUrl,
    author: {
      "@type": "Organization",
      name: "ИДЕАЛ",
      url: "https://ideal-okna57.ru",
    },
    publisher: {
      "@type": "Organization",
      name: "ИДЕАЛ",
      logo: {
        "@type": "ImageObject",
        url: "https://ideal-okna57.ru/logo-ideal.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumb={
          <Breadcrumbs
            items={[
              { title: "Блог", href: "/blog" },
              { title: post.title.length > 50 ? post.title.slice(0, 50) + "…" : post.title },
            ]}
            className="text-primary-foreground/70"
          />
        }
      >
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary-foreground/80">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4 text-accent" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4 text-accent" />
            {readingTime(post.content)}
          </span>
          <Badge className="bg-accent/90 text-accent-foreground">
            {post.category}
          </Badge>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_320px] lg:px-6">
          {/* Контент статьи */}
          <article className="min-w-0">
            <div className="prose prose-sm sm:prose-base max-w-none">
              <MarkdownContent content={post.content} />
            </div>

            {/* Теги */}
            {tags.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <Tag className="size-4 text-accent" /> Теги:
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Поделиться / Назад */}
            <div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button asChild variant="ghost">
                <Link href="/blog">
                  <ArrowLeft className="size-4" /> Назад к блогу
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Share2 className="size-4 text-accent" /> Поделиться:
                </span>
                <Button asChild size="sm" variant="outline">
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(
                      shareUrl
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a
                    href={`https://vk.com/share.php?url=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ВКонтакте
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      post.title + " " + shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </article>

          {/* Сайдбар */}
          <aside className="space-y-6">
            <Card className="p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Информация о статье
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Категория</dt>
                  <dd className="text-right font-medium">{post.category}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Опубликовано</dt>
                  <dd className="text-right font-medium">
                    {formatDate(post.createdAt)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Обновлено</dt>
                  <dd className="text-right font-medium">
                    {formatDateTime(post.updatedAt)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Время чтения</dt>
                  <dd className="text-right font-medium">
                    {readingTime(post.content)}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card className="bg-primary p-5 text-primary-foreground">
              <h3 className="font-semibold">Нужна консультация?</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Остались вопросы после статьи? Позвоните — поможем выбрать
                москитную сетку под ваш проём.
              </p>
              <div className="mt-4 space-y-2">
                <Button asChild variant="secondary" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href="tel:+79536187596">+7 953 618 75 96</a>
                </Button>
                <Button asChild variant="outline" className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/kontakty">Все контакты</Link>
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </section>

      {/* Похожие статьи */}
      {relatedPosts.length > 0 && (
        <section className="border-t bg-secondary/40 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="h-px w-6 bg-accent" />
                  Смотрите также
                </div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Похожие статьи
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/blog">
                  Все статьи <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <Card
                  key={p.id}
                  className="group flex h-full flex-col p-5 transition-all hover:border-primary hover:shadow-md"
                >
                  <Link href={`/blog/${p.slug}`} className="flex h-full flex-col">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <Badge variant="secondary">{p.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        {formatDate(p.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-semibold leading-snug group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                      {p.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-accent">
                      Читать
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
