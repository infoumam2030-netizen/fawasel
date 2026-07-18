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
 * optimized <Image>. Falls back to a plain <img> for external URLs, since
 * those can come from the units Google Sheet (any image host a client
 * pastes in) and next/image's optimizer rejects any remote host that
 * isn't explicitly whitelisted ahead of time in next.config.ts — which
 * would otherwise require a code change every time someone adds a new
 * image source to the sheet.
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
