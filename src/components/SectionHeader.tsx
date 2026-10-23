import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "./Badge";
import type { BadgeTone } from "./Badge";

interface SectionHeaderProps {
  /** Short label shown in the badge above the title. */
  badge: string;
  title: string;
  description?: string;
  /** Optional element on the right (desktop), e.g. a link or button. */
  action?: ReactNode;
  align?: "left" | "center";
  badgeTone?: BadgeTone;
  /** Set when other elements need aria-labelledby to point at the title. */
  titleId?: string;
  className?: string;
}

/**
 * Consistent header for every page section:
 * badge → title → description (+ optional action).
 */
export function SectionHeader({
  badge,
  title,
  description,
  action,
  align = "left",
  badgeTone = "cyan",
  titleId,
  className = "",
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion();
  const isCenter = align === "center";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-6 ${
        isCenter
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className="max-w-2xl">
        <Badge tone={badgeTone}>{badge}</Badge>

        <h2
          id={titleId}
          className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl"
        >
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}
