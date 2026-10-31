import { useCallback, useRef, useState } from "react";
import type { Achievement } from "../data/about";
import { ImageLightbox } from "./Lightbox";
import { PlacementBadge } from "./Medal";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/* --------------------------------- Icons ---------------------------------- */

function ExternalIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12L12 4M6 4h6v6" />
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

/* ---------------------------- Achievement card ---------------------------- */

export function AchievementCard({ item }: { item: Achievement }) {
  const images = item.images ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus(); // return focus to the thumbnail that opened it
  }, []);

  return (
    <li className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      {/* shared top highlight: same treatment on every card in this section */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <PlacementBadge placement={item.placement} />
        <span className="font-mono text-xs text-slate-400">{item.year}</span>
      </div>

      <h4 className="mt-4 text-xl font-semibold tracking-tight text-white">
        {item.title}
      </h4>
      <p className="mt-1 text-sm font-medium text-slate-300">{item.event}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {item.description}
      </p>

      {/* Proof gallery */}
      {images.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">
            Proof · {images.length} {images.length === 1 ? "image" : "images"}
          </p>
          <ul className="grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
            {images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  aria-label={`View proof ${i + 1} of ${images.length}`}
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setOpenIndex(i);
                  }}
                  className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900 transition-colors hover:border-cyan-400/40 ${focusRing}`}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center bg-slate-950/0 text-white opacity-0 transition duration-200 group-hover:bg-slate-950/50 group-hover:opacity-100 group-focus-visible:bg-slate-950/50 group-focus-visible:opacity-100"
                  >
                    <ZoomIcon />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.href && (
        <div className="mt-5 border-t border-white/5 pt-4">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 ${focusRing}`}
          >
            View on LinkedIn
            <ExternalIcon />
          </a>
        </div>
      )}

      <ImageLightbox
        images={images}
        title={item.title}
        openIndex={openIndex}
        onIndexChange={setOpenIndex}
        onClose={close}
        imageLabel="proof"
      />
    </li>
  );
}
