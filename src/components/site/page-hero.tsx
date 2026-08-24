import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b bg-primary text-primary-foreground",
        className
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -right-24 -top-24 size-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        {breadcrumb && <div className="mb-4 text-primary-foreground/70">{breadcrumb}</div>}
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
          </div>
        )}
        <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-balance text-primary-foreground/85 sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
