import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Editorial section head: index tick, eyebrow, oversized title, thin rule. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  index,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  index?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        {index ? <span className="label text-accent">{index}</span> : null}
        {eyebrow ? <span className="label">{eyebrow}</span> : null}
        <span className="accent-rule h-px w-16 opacity-70" aria-hidden />
      </div>
      <h2 className="display mt-5 text-[clamp(2rem,5vw,3.75rem)]">{title}</h2>
      {intro ? <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">{intro}</p> : null}
    </Reveal>
  );
}
