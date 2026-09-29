interface LogoProps {
  size?: number;
  withWordmark?: boolean;
}

export const LogoMark = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#0B0F17" />
    <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" stroke="#ffffff" strokeOpacity="0.16" />
    <g fill="#F1F5F9">
      <rect x="16" y="20" width="10" height="10" rx="2" />
      <rect x="26" y="14" width="14" height="14" rx="2" />
      <rect x="10" y="28" width="32" height="12" rx="2" />
    </g>
    <rect x="10" y="36" width="32" height="4" rx="2" fill="#94A3B8" fillOpacity="0.55" />
    <g>
      <path d="M46 32l9 5v10l-9 5-9-5V37z" fill="#06B6D4" />
      <path d="M46 32l9 5-9 5-9-5z" fill="#8FF8FF" />
      <path d="M46 42v10l-9-5V37z" fill="#0E7490" />
      <path d="M46 32l9 5v10l-9 5-9-5V37z" stroke="#ffffff" strokeOpacity="0.35" />
    </g>
  </svg>
);

export const Logo = ({ size = 36, withWordmark = true }: LogoProps) => (
  <span className="inline-flex items-center gap-2.5" data-testid="brand-logo">
    <LogoMark size={size} />
    {withWordmark && (
      <span className="font-heading text-lg font-bold tracking-tight text-white">
        Dreamer<span className="text-dream">Host</span>
      </span>
    )}
  </span>
);
