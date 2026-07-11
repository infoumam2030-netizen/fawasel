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

export function SnapchatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M12 3.5c-2.9 0-4.6 2-4.6 4.6 0 1 .1 1.8.1 2.4-.6.4-1.4.6-2 .6-.4 0-.6.5-.2.8.6.5 1.5.9 2 1-0.1.4-.4 1-1 1.5-.6.5-1.5.7-1.5 1.1 0 .5.9.7 1.8.9.1.3.2.8.4 1.1.3.4 1.4.2 2.3.5.7.3 1.4 1 2.7 1s2-.7 2.7-1c.9-.3 2-.1 2.3-.5.2-.3.3-.8.4-1.1.9-.2 1.8-.4 1.8-.9 0-.4-.9-.6-1.5-1.1-.6-.5-.9-1.1-1-1.5.5-.1 1.4-.5 2-1 .4-.3.2-.8-.2-.8-.6 0-1.4-.2-2-.6 0-.6.1-1.4.1-2.4 0-2.6-1.7-4.6-4.6-4.6Z" />
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
