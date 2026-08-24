import { cn } from "@/lib/utils";

export function SectionDivider({
  variant = "gold-line",
  className,
}: {
  variant?: "gold-line" | "dots" | "wave" | "gradient";
  className?: string;
}) {
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-2 py-2", className)} aria-hidden="true">
        <span className="size-1.5 rounded-full bg-accent/60" />
        <span className="size-2 rounded-full bg-accent" />
        <span className="size-1.5 rounded-full bg-accent/60" />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={cn("flex items-center justify-center py-2", className)} aria-hidden="true">
        <svg
          width="120"
          height="12"
          viewBox="0 0 120 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accent"
        >
          <path
            d="M0 6 Q 15 0, 30 6 T 60 6 T 90 6 T 120 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className={cn("flex items-center justify-center py-2", className)} aria-hidden="true">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>
    );
  }

  // gold-line (default)
  return (
    <div className={cn("flex items-center justify-center gap-3 py-2", className)} aria-hidden="true">
      <span className="h-px w-12 bg-accent/40" />
      <span className="size-1.5 rotate-45 bg-accent" />
      <span className="h-px w-12 bg-accent/40" />
    </div>
  );
}
