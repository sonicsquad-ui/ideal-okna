import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, PhoneCall, ArrowLeft } from "lucide-react";
import { SITE } from "@/lib/site-data";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-primary px-4 py-20 text-primary-foreground">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -right-24 -top-24 size-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative text-center">
        <div className="mb-4 text-[120px] font-extrabold leading-none text-accent sm:text-[160px]">
          404
        </div>
        <h1 className="mb-3 text-2xl font-bold sm:text-3xl">
          Страница не найдена
        </h1>
        <p className="mx-auto mb-8 max-w-md text-balance text-primary-foreground/80">
          К сожалению, такой страницы не существует. Возможно, она была перемещена
          или вы перешли по устаревшей ссылке. Вернитесь на главную или позвоните нам — поможем!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">
              <Home className="size-4" /> На главную
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <Link href="/katalog/konstrukcii">
              <Search className="size-4" /> В каталог
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <a href={SITE.phoneHref}>
              <PhoneCall className="size-4" /> {SITE.phone}
            </a>
          </Button>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-accent"
          >
            <ArrowLeft className="size-3.5" /> Вернуться назад
          </Link>
        </div>
      </div>
    </section>
  );
}
