import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/* --------------------------------- Icons ---------------------------------- */

function CloseIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

/* -------------------------------- Lightbox -------------------------------- */

interface LightboxProps {
  images: readonly string[];
  title: string;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Used in alt text, e.g. "screenshot" or "proof". */
  imageLabel?: string;
}

const SWIPE_THRESHOLD = 80;

const navButtonClass = `absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-slate-900/80 text-slate-200 backdrop-blur-md transition-colors hover:bg-slate-800 hover:text-white ${focusRing}`;

function Lightbox({
  images,
  title,
  index,
  onIndexChange,
  onClose,
  imageLabel = "image",
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const multiple = count > 1;

  const prev = useCallback(
    () => onIndexChange((index - 1 + count) % count),
    [index, count, onIndexChange],
  );
  const next = useCallback(
    () => onIndexChange((index + 1) % count),
    [index, count, onIndexChange],
  );

  // Lock page scroll and move focus into the dialog while it is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Keyboard: Esc closes, arrows navigate.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (multiple && e.key === "ArrowLeft") prev();
      else if (multiple && e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, prev, next, multiple]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-slate-950/90 backdrop-blur-md"
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white sm:text-lg">
            {title}
          </h3>
          {multiple && (
            <p className="font-mono text-xs text-slate-400">
              {index + 1} / {count}
            </p>
          )}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-white ${focusRing}`}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Image stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-6 sm:px-20">
        {multiple && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className={`${navButtonClass} left-2 sm:left-6`}
          >
            <ChevronIcon direction="left" />
          </button>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={images[index]}
            alt={`${title} – ${imageLabel} ${index + 1} of ${count}`}
            draggable={false}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            drag={multiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x > SWIPE_THRESHOLD) prev();
              else if (info.offset.x < -SWIPE_THRESHOLD) next();
            }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full select-none rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
          />
        </AnimatePresence>

        {multiple && (
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className={`${navButtonClass} right-2 sm:right-6`}
          >
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------ Public wrapper ----------------------------- */
/* Render this anywhere; it portals to <body> so transformed ancestors (cards,  */
/* Reveal) cannot break `position: fixed`.                                      */

interface ImageLightboxProps {
  images: readonly string[];
  title: string;
  /** Index of the image to show, or null when closed. */
  openIndex: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  imageLabel?: string;
}

export function ImageLightbox({
  images,
  title,
  openIndex,
  onIndexChange,
  onClose,
  imageLabel,
}: ImageLightboxProps) {
  return createPortal(
    <AnimatePresence>
      {openIndex !== null && (
        <Lightbox
          images={images}
          title={title}
          index={openIndex}
          onIndexChange={onIndexChange}
          onClose={onClose}
          imageLabel={imageLabel}
        />
      )}
    </AnimatePresence>,
    document.body,
  );
}