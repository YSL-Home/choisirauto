export function ScoreIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 15a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 15l4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function PriceTagIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M11 4h6a1 1 0 0 1 1 1v6a1 1 0 0 1-.3.7l-8 8a1 1 0 0 1-1.4 0l-5.7-5.7a1 1 0 0 1 0-1.4l8-8A1 1 0 0 1 11 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function CoinIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v8M9.5 10a2 2 0 0 1 2-1.5h1a1.75 1.75 0 0 1 0 3.5h-1a1.75 1.75 0 0 0 0 3.5h1a2 2 0 0 0 2-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function VerdictIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LOW_SEGMENTS = new Set(["citadine", "berline"]);

export function CarIcon({ segment, className = "h-8 w-8" }: { segment?: string; className?: string }) {
  const tall = segment ? !LOW_SEGMENTS.has(segment) : false;
  return tall ? (
    <svg viewBox="0 0 48 28" fill="none" className={className}>
      <path
        d="M6 20V13.5c0-1 .5-1.9 1.4-2.4l3.6-2c.5-.3 1-.5 1.6-.6l5-.9a10 10 0 0 1 3.5 0l6 1c.9.15 1.7.6 2.3 1.3l2.6 3H41c1.7 0 3 1.3 3 3V20"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
      />
      <path d="M6 20h36" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="21" r="3.4" fill="currentColor" />
      <circle cx="34" cy="21" r="3.4" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 48 24" fill="none" className={className}>
      <path
        d="M5 18v-5.2c0-.9.5-1.7 1.3-2.1l2.9-1.5c.4-.2.8-.4 1.3-.5l4.6-1a9 9 0 0 1 3.8 0l6.3 1.3c.6.1 1.2.4 1.6.9l2.3 2.6H40c1.7 0 3 1.3 3 3V18"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
      />
      <path d="M5 18h38" stroke="currentColor" strokeWidth="2" />
      <circle cx="13" cy="19" r="3" fill="currentColor" />
      <circle cx="33" cy="19" r="3" fill="currentColor" />
    </svg>
  );
}
