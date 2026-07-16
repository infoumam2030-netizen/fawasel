import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-10 w-10", className)} aria-hidden="true">
      <rect x="2" y="4" width="60" height="56" rx="16" fill="#0A0F3D" />
      <rect x="2" y="4" width="60" height="56" rx="16" fill="none" stroke="#F5B731" strokeOpacity="0.25" strokeWidth="1" />
      <path
        d="M9 24c6-1 10-5 14-9M14 22c8 3 22 3 30-2 3-1.5 6-1 8 1"
        stroke="#EEF2F7"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="12.5" cy="16.5" r="1.4" fill="#EEF2F7" />
      <g transform="translate(24 27) rotate(45)">
        <path
          d="M-11 0a4 4 0 0 1 5.4-3.75L-2 0-3.75 1.75l-3.65-3.6A4 4 0 0 1-11 0Zm22 0a4 4 0 0 1-5.4 3.75L11 0l1.75-1.75 3.65 3.6A4 4 0 0 1 11 0Z"
          fill="#F5940A"
        />
        <rect x="-9" y="-1.7" width="18" height="3.4" rx="1.7" fill="#F5940A" />
      </g>
      <rect x="9" y="38" width="20" height="3.2" rx="1.6" fill="#EEF2F7" fillOpacity="0.9" />
      <rect x="9" y="45" width="14" height="3.2" rx="1.6" fill="#EEF2F7" fillOpacity="0.6" />
      <circle cx="45" cy="45" r="8" fill="#F5940A" />
      <circle cx="51" cy="45" r="8" fill="#C7CCD6" />
    </svg>
  );
}

export function Logo({ className, markClassName, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-en text-[1.05rem] font-extrabold tracking-tight text-white">
            MY CAR <span className="text-gold">CARD</span>
          </span>
        </span>
      )}
    </span>
  );
}
