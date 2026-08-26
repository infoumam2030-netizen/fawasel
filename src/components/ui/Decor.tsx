import { cn } from "@/lib/utils";

/** Crosshair corner mark used around images and cards. */
export function Crosshair({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute h-3 w-3", className)}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-line-strong)]" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[var(--color-line-strong)]" />
    </span>
  );
}

/** Barcode-ish data ticks. Purely decorative. */
export function DataTicks({ count = 22, className }: { count?: number; className?: string }) {
  return (
    <span aria-hidden className={cn("flex items-end gap-[3px]", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-px bg-[var(--color-line-strong)]"
          style={{ height: `${6 + ((i * 7) % 16)}px`, opacity: 0.35 + ((i % 4) * 0.15) }}
        />
      ))}
    </span>
  );
}

/** Small technical caption, e.g. `LAT 24.7136 / LNG 46.6753`. */
export function TechLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("label text-[0.625rem] text-dim", className)}>{children}</span>;
}
