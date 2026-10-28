import { useId } from "react";

/* ------------------------------- Medal icon ------------------------------- */
/* Medali perak dengan pita cyan (mengikuti warna aksen situs).               */

export function MedalIcon({ className = "h-11 w-11" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const disc = `${uid}-disc`;
  const ribbonL = `${uid}-ribbon-l`;
  const ribbonR = `${uid}-ribbon-r`;

  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      className={`${className} drop-shadow-[0_6px_14px_rgba(148,163,184,0.3)]`}
    >
      <defs>
        <linearGradient id={disc} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset="0.55" stopColor="#cbd5e1" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id={ribbonL} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id={ribbonR} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e7490" />
          <stop offset="1" stopColor="#164e63" />
        </linearGradient>
      </defs>

      {/* Pita */}
      <path d="M13 3h8l6 17-7 3z" fill={`url(#${ribbonL})`} />
      <path d="M35 3h-8l-6 17 7 3z" fill={`url(#${ribbonR})`} />

      {/* Cakram medali */}
      <circle cx="24" cy="30" r="13" fill={`url(#${disc})`} />
      <circle
        cx="24"
        cy="30"
        r="13"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <circle
        cx="24"
        cy="30"
        r="9.5"
        fill="none"
        stroke="#64748b"
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {/* Bintang */}
      <path
        d="M24 24.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8-3.4-1.8-3.4 1.8.7-3.8-2.8-2.7 3.8-.5z"
        fill="#475569"
      />
    </svg>
  );
}

/* ----------------------------- Placement badge ---------------------------- */
/* Warna mengikuti peringkat: 1st emas, 2nd perak, 3rd perunggu.              */

type Tier = "gold" | "silver" | "bronze" | "neutral";

function getTier(placement: string): Tier {
  const text = placement.toLowerCase();
  // urutan penting: "2nd Place Winner" mengandung kata "winner"
  if (/\b(2nd|second)\b|juara\s*2/.test(text)) return "silver";
  if (/\b(3rd|third)\b|juara\s*3/.test(text)) return "bronze";
  if (/\b(1st|first|champion)\b|juara\s*1/.test(text)) return "gold";
  return "neutral";
}

const TIER_STYLES: Record<Tier, string> = {
  gold: "from-amber-100 via-amber-300 to-amber-500 text-amber-950 shadow-[0_4px_16px_-4px_rgba(245,158,11,0.55)]",
  silver:
    "from-slate-50 via-slate-300 to-slate-400 text-slate-900 shadow-[0_4px_16px_-4px_rgba(148,163,184,0.55)]",
  bronze:
    "from-orange-200 via-orange-400 to-amber-700 text-orange-950 shadow-[0_4px_16px_-4px_rgba(234,88,12,0.5)]",
  neutral:
    "from-cyan-100 via-cyan-300 to-cyan-500 text-cyan-950 shadow-[0_4px_16px_-4px_rgba(34,211,238,0.5)]",
};

function StarGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="currentColor"
    >
      <path d="M8 1.5l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11.5l-3.9 2.1.8-4.4L1.7 6.1l4.4-.6z" />
    </svg>
  );
}

export function PlacementBadge({ placement }: { placement: string }) {
  const tier = getTier(placement);

  return (
    <span
      className={`group/badge relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-b px-3 py-1 text-xs font-bold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${TIER_STYLES[tier]}`}
    >
      <StarGlyph />
      {placement}
      {/* kilau yang menyapu saat di-hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/60 blur-sm transition-transform duration-700 group-hover/badge:translate-x-[400%] motion-reduce:hidden"
      />
    </span>
  );
}

/* -------------------------------- Seal icon -------------------------------- */
/* Perisai cyan dengan centang, untuk judul "Certifications".                  */

export function SealIcon({ className = "h-11 w-11" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const fill = `${uid}-seal`;
  const shield =
    "M24 3l17 6.5v13.2c0 10.6-7.2 18.9-17 22.3C14.2 41.6 7 33.3 7 22.7V9.5z";

  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      className={`${className} drop-shadow-[0_6px_14px_rgba(34,211,238,0.3)]`}
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#0e7490" />
        </linearGradient>
      </defs>
      <path d={shield} fill={`url(#${fill})`} />
      <path d={shield} fill="none" stroke="#ffffff" strokeOpacity="0.35" />
      <path
        d="m16.5 24 5.5 5.5L32 18.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
