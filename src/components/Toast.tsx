import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* -------------------------------- Types ----------------------------------- */

type ToastType = "success" | "error";

export interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  /** Auto-dismiss delay in ms. */
  duration?: number;
}

interface ToastData {
  id: number;
  title: string;
  description?: string;
  type: ToastType;
  duration: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const MAX_TOASTS = 3;
const DEFAULT_DURATION = 4500;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

const ToastContext = createContext<ToastContextValue | null>(null);

/* -------------------------------- Icons ----------------------------------- */

function CheckIcon() {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AlertIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
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

/* ------------------------------- Toast item ------------------------------- */

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: number) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const isError = toast.type === "error";

  // Auto-dismiss; the timer restarts after the pointer or focus leaves.
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => window.clearTimeout(timer);
  }, [paused, toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      layout={!reduceMotion}
      role={isError ? "alert" : "status"}
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 16,
        scale: reduceMotion ? 1 : 0.96,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        scale: reduceMotion ? 1 : 0.96,
        transition: { duration: 0.15 },
      }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`pointer-events-auto flex w-full items-start gap-3 rounded-2xl border bg-slate-900/90 p-4 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl ${
        isError ? "border-red-400/30" : "border-emerald-400/30"
      }`}
    >
      <span
        aria-hidden
        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
          isError
            ? "bg-red-400/15 text-red-300"
            : "bg-emerald-400/15 text-emerald-300"
        }`}
      >
        {isError ? <AlertIcon /> : <CheckIcon />}
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-sm leading-relaxed text-slate-400">
            {toast.description}
          </p>
        )}
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className={`-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:bg-white/10 hover:text-white ${focusRing}`}
      >
        <CloseIcon />
      </button>
    </motion.div>
  );
}

/* -------------------------------- Provider -------------------------------- */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions): number => {
    const id = nextId.current++;
    const data: ToastData = {
      id,
      title: options.title,
      description: options.description,
      type: options.type ?? "success",
      duration: options.duration ?? DEFAULT_DURATION,
    };
    setToasts((prev) => [...prev, data].slice(-MAX_TOASTS));
    return id;
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        role="region"
        aria-label="Notifications"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:justify-end sm:px-6 sm:pb-6"
      >
        <div className="flex w-full max-w-sm flex-col gap-3">
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

/* ---------------------------------- Hook ---------------------------------- */

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return context;
}
