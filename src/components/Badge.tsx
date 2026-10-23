import type { ReactNode } from "react";

export type BadgeTone = "cyan" | "emerald" | "amber" | "neutral";

interface BadgeProps {
  children: ReactNode;
  /** Colour of the leading dot. */
  tone?: BadgeTone;
  /** Adds a soft ping animation to the dot (disabled for reduced motion). */
  pulse?: boolean;
  className?: string;
}

const DOT_COLORS: Record<BadgeTone, string> = {
  cyan: "bg-cyan-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  neutral: "bg-slate-400",
};

/**
 * Glass pill badge with a leading status dot.
 * Used for section labels ("Selected work", "Writing", "About me")
 * and for status indicators ("Available for work").
 */
export function Badge({
  children,
  tone = "cyan",
  pulse = false,
  className = "",
}: BadgeProps) {
  const dot = DOT_COLORS[tone];

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-sm font-medium text-slate-300 backdrop-blur-md ${className}`}
    >
      <span aria-hidden className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping ${dot}`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {children}
    </span>
  );
}
