import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 3h4.2l4 5.6L16.8 3H20l-6.4 8.2L20.4 21H16.2l-4.4-6.1L6.8 21H3.6l6.9-8.8L4 3Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 3c.4 2 1.8 3.5 3.8 3.8v2.9c-1.4 0-2.7-.4-3.8-1.2v6.4c0 3.3-2.6 5.6-5.6 5.6-1.5 0-2.9-.6-3.9-1.6a5.6 5.6 0 0 1 5.9-9.3v3.1a2.6 2.6 0 1 0 1.9 2.5V3h1.7Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 7.02a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92Z" />
      <path d="M9.5 8.5H12.75V10.05H12.8C13.26 9.18 14.38 8.26 16.06 8.26C19.5 8.26 20.13 10.52 20.13 13.46V20.5H16.76V14.15C16.76 12.68 16.73 10.8 14.72 10.8C12.68 10.8 12.37 12.39 12.37 14.05V20.5H9V8.5H9.5Z" />
    </svg>
  );
}
