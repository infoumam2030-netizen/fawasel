import { cn } from "@/lib/utils";

/**
 * Colour specimen. Contrast ratios are measured against #08080A, not
 * estimated — they decide whether a token is allowed to carry text.
 */
export function Swatch({
  token,
  value,
  contrast,
  usage,
  className,
}: {
  token: string;
  value: string;
  contrast?: string;
  usage: string;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-4 border border-border-soft bg-surface p-4">
      <div
        className={cn("size-14 shrink-0 border border-border", className)}
        style={{ background: value }}
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <code className="latin text-body-sm text-foreground">{token}</code>
        <span className="latin text-caption uppercase text-faint">{value}</span>
        <span className="text-caption text-muted">
          {usage}
          {contrast && <span className="latin text-faint"> · {contrast}</span>}
        </span>
      </div>
    </div>
  );
}
