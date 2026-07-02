const SEGMENT_STYLE: Record<string, { body: string; body2: string; window: string }> = {
  citadine: { body: "#1a56db", body2: "#3b74f0", window: "#dbe8ff" },
  berline: { body: "#7c3aed", body2: "#9b6bf5", window: "#ece3ff" },
  SUV: { body: "#0f9d58", body2: "#34c07a", window: "#d9f5e6" },
  "SUV familial": { body: "#d97706", body2: "#f0a13a", window: "#ffe9cc" },
  utilitaire: { body: "#4a5568", body2: "#6b7789", window: "#e4e8ee" },
};

export default function CarIllustration({
  segment = "citadine",
  className = "w-full h-full",
}: {
  segment?: string;
  className?: string;
}) {
  const s = SEGMENT_STYLE[segment] ?? SEGMENT_STYLE.citadine;
  const tall = segment !== "citadine" && segment !== "berline";

  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="102" rx="80" ry="10" fill="#0d1526" opacity="0.06" />

      {tall ? (
        <>
          <path
            d="M22 82V60c0-5 3-9 7.5-11l18-8c3-1.3 6-2 9-2.5l28-4.5a44 44 0 0 1 16 0l30 5c4.5.7 8.5 3 11 6.5l12 16H178c8 0 14 6 14 14v6"
            fill={s.body}
          />
          <path d="M22 82h170" stroke={s.body2} strokeWidth="4" />
          <path
            d="M52 60l4-15c1-3 3.5-5 6.5-5.5l20-3.3a34 34 0 0 1 12 0l24 4c2 .4 4 1.6 5 3.3l8 12.5-4 4H56Z"
            fill={s.window}
          />
          <line x1="90" y1="41" x2="88" y2="60" stroke={s.body} strokeWidth="2" />
          <line x1="122" y1="43" x2="126" y2="60" stroke={s.body} strokeWidth="2" />
          <circle cx="62" cy="85" r="14" fill="#0d1526" />
          <circle cx="62" cy="85" r="6" fill="#c9d2e0" />
          <circle cx="146" cy="85" r="14" fill="#0d1526" />
          <circle cx="146" cy="85" r="6" fill="#c9d2e0" />
          <rect x="30" y="66" width="10" height="5" rx="2" fill="#ffe27a" />
        </>
      ) : (
        <>
          <path
            d="M18 78V64c0-4.5 2.7-8.5 7-10.2l14-5.6c2.7-1 5.5-1.7 8.4-2l24-2.6a40 40 0 0 1 13 .7l22 4.3c3.8.75 7.2 2.9 9.5 6l9 12H172c7 0 12.5 5.5 12.5 12.5v3.8"
            fill={s.body}
          />
          <path d="M18 78h166.5" stroke={s.body2} strokeWidth="4" />
          <path
            d="M46 55.5l3-11c.8-2.8 3.2-4.8 6-5.2l17-2.2a32 32 0 0 1 10.6.5l18 3.6c2 .4 3.7 1.6 4.8 3.3l6.4 9.6-3 3.4H50Z"
            fill={s.window}
          />
          <line x1="80" y1="37" x2="78" y2="55" stroke={s.body} strokeWidth="2" />
          <line x1="106" y1="38.5" x2="110" y2="55" stroke={s.body} strokeWidth="2" />
          <circle cx="56" cy="80" r="12.5" fill="#0d1526" />
          <circle cx="56" cy="80" r="5.2" fill="#c9d2e0" />
          <circle cx="140" cy="80" r="12.5" fill="#0d1526" />
          <circle cx="140" cy="80" r="5.2" fill="#c9d2e0" />
          <rect x="24" y="62" width="9" height="4.5" rx="2" fill="#ffe27a" />
        </>
      )}
    </svg>
  );
}
