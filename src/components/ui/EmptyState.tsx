import { cn } from "@/lib/utils";

/** Used wherever the CMS has no rows yet — never fake content. */
export function EmptyState({ message, className }: { message: string; className?: string }) {
  return (
    <div
      className={cn(
        "glass relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-lg px-8 py-12 text-center",
        className,
      )}
    >
      <div className="grid-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <p className="relative text-sm text-muted">{message}</p>
    </div>
  );
}
