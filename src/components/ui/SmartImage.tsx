import Image from "next/image";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders local/static assets (paths starting with "/") through Next's
 * optimized <Image>, and falls back to a plain <img> for anything remote.
 *
 * Phase 03 note: once media moves to Supabase Storage there is exactly one
 * known remote host, which gets whitelisted in next.config.ts — at that point
 * the remote branch below should go away and everything should run through
 * next/image, as the brief requires.
 */
export function SmartImage({ src, alt, fill, width, height, sizes, priority, className }: SmartImageProps) {
  const isLocal = src.startsWith("/");

  if (isLocal) {
    return fill ? (
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={width ?? 400}
        height={height ?? 300}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional: external, non-whitelisted host
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={cn(fill && "absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
