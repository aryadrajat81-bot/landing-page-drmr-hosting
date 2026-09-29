interface LogoProps {
  size?: number;
  withWordmark?: boolean;
}

export const LogoMark = ({ size = 36 }: { size?: number }) => (
  <img
    src="/logo.png"
    alt="Dreamer Host logo"
    width={size}
    height={size}
    className="rounded-xl object-cover"
    style={{ width: size, height: size }}
  />
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
