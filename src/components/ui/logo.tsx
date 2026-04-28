export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="1" y="1" width="26" height="26" rx="6" className="fill-navy-deep" />
      <path
        d="M8 18.5 L8 9.5 L14 9.5 Q17 9.5 17 12 Q17 14.2 14 14.2 L10 14.2 L20 18.5"
        className="stroke-gold"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="20.5" cy="18.5" r="1.5" className="fill-teal" />
    </svg>
  );
}
