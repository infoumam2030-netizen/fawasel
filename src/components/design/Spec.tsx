import { cn } from "@/lib/utils";

/** Layout primitives used only by the design-system review page. */

export function SpecSection({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border-soft pt-12">
      <h2 className="text-h3 text-foreground">{title}</h2>
      {note && <p className="mt-3 max-w-3xl text-body-sm text-muted">{note}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function SpecGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>{children}</div>;
}

/** A labelled specimen: the thing itself, with its token name underneath. */
export function Specimen({
  token,
  meta,
  children,
  className,
}: {
  token: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex min-h-24 items-center justify-center border border-border-soft bg-surface p-6">
        {children}
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <code className="latin text-caption text-lavender-soft">{token}</code>
        {meta && <span className="latin text-caption text-faint">{meta}</span>}
      </div>
    </div>
  );
}

/** Horizontal rail for showing several states of one component side by side. */
export function StateRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border-soft py-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-8">
      <span className="w-32 shrink-0 text-label uppercase text-faint">{label}</span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}
