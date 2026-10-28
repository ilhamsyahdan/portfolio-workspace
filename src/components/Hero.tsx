import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { scrollToSection } from "../utils/scroll";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface DeveloperProfile {
  readonly role: string;
  readonly focus: readonly string[];
  readonly stack: readonly string[];
  readonly status: string;
}

interface HeroProps {
  name?: string;
  profile?: DeveloperProfile;
}

type TokenKind = "kw" | "id" | "prop" | "str" | "punct";

interface Token {
  readonly text: string;
  readonly kind: TokenKind;
}

interface PositionedToken extends Token {
  /** Index of this token's first character in the whole snippet. */
  readonly start: number;
}

/* -------------------------------------------------------------------------- */
/*  Defaults – replace with your own content                                  */
/* -------------------------------------------------------------------------- */

const DEFAULT_PROFILE: DeveloperProfile = {
  role: "Software Engineer",
  focus: ["Frontend", "Backend"],
  stack: ["React", "TypeScript"],
  status: "Open to work",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/** Typing speed: characters revealed per tick, and tick length in ms. */
const TYPE_START_DELAY = 900;
const TYPE_CHARS_PER_TICK = 2;
const TYPE_TICK_MS = 24;

const TOKEN_COLORS: Record<TokenKind, string> = {
  kw: "text-sky-400",
  id: "text-cyan-200",
  prop: "text-slate-200",
  str: "text-emerald-300",
  punct: "text-slate-500",
};

/* -------------------------------------------------------------------------- */
/*  Motion variants – one orchestrated entrance                               */
/* -------------------------------------------------------------------------- */

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { y: 18 },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, delay: 0.35, ease: EASE },
  },
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const tok = (text: string, kind: TokenKind): Token => ({ text, kind });

function arrayTokens(items: readonly string[]): Token[] {
  const out: Token[] = [tok("[", "punct")];
  items.forEach((item, i) => {
    if (i > 0) out.push(tok(", ", "punct"));
    out.push(tok(JSON.stringify(item), "str"));
  });
  out.push(tok("]", "punct"));
  return out;
}

/** Turns profile data into syntax-highlighted lines of a TS object literal. */
function buildCodeLines(
  name: string,
  profile: DeveloperProfile,
): PositionedToken[][] {
  const raw: Token[][] = [
    [tok("const ", "kw"), tok("developer", "id"), tok(" = {", "punct")],
    [
      tok("  name", "prop"),
      tok(": ", "punct"),
      tok(JSON.stringify(name), "str"),
      tok(",", "punct"),
    ],
    [
      tok("  role", "prop"),
      tok(": ", "punct"),
      tok(JSON.stringify(profile.role), "str"),
      tok(",", "punct"),
    ],
    [
      tok("  focus", "prop"),
      tok(": ", "punct"),
      ...arrayTokens(profile.focus),
      tok(",", "punct"),
    ],
    [
      tok("  stack", "prop"),
      tok(": ", "punct"),
      ...arrayTokens(profile.stack),
      tok(",", "punct"),
    ],
    [
      tok("  status", "prop"),
      tok(": ", "punct"),
      tok(JSON.stringify(profile.status), "str"),
      tok(",", "punct"),
    ],
    [tok("};", "punct")],
  ];

  let cursor = 0;
  return raw.map((line) =>
    line.map((token) => {
      const positioned: PositionedToken = { ...token, start: cursor };
      cursor += token.text.length;
      return positioned;
    }),
  );
}

/** Reveals `total` characters over time; jumps straight to the end if disabled. */
function useTyping(total: number, enabled: boolean): number {
  const [count, setCount] = useState<number>(enabled ? 0 : total);

  useEffect(() => {
    if (!enabled) {
      setCount(total);
      return;
    }

    setCount(0);
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      let n = 0;
      interval = window.setInterval(() => {
        n = Math.min(n + TYPE_CHARS_PER_TICK, total);
        setCount(n);
        if (n >= total) window.clearInterval(interval);
      }, TYPE_TICK_MS);
    }, TYPE_START_DELAY);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [total, enabled]);

  return count;
}

const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
  maskImage: "radial-gradient(ellipse at center, black 25%, transparent 72%)",
  WebkitMaskImage:
    "radial-gradient(ellipse at center, black 25%, transparent 72%)",
};

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-48 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[130px]" />
      <div className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-sky-600/10 blur-[130px]" />
      <div className="absolute inset-0" style={gridStyle} />
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** Zero-width blinking caret, so it never shifts the surrounding text. */
function Caret() {
  return (
    <span aria-hidden className="relative inline-block w-0">
      <span className="absolute -top-[0.1em] left-0 h-[1.2em] w-[2px] bg-cyan-400 motion-safe:animate-pulse" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Code editor card (typing effect + hover tilt + cursor glare)              */
/* -------------------------------------------------------------------------- */

interface CodeEditorProps {
  name: string;
  profile: DeveloperProfile;
}

function CodeEditor({ name, profile }: CodeEditorProps) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => buildCodeLines(name, profile), [name, profile]);
  const total = useMemo(
    () =>
      lines.reduce(
        (sum, line) =>
          sum + line.reduce((lineSum, token) => lineSum + token.text.length, 0),
        0,
      ),
    [lines],
  );
  const typed = useTyping(total, !reduceMotion);

  // Pointer position normalised to 0..1, smoothed with a spring.
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);

  const rotateY = useTransform(smoothX, [0, 1], [-9, 9]);
  const rotateX = useTransform(smoothY, [0, 1], [9, -9]);
  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(34,211,238,0.16), transparent 60%)`;

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>): void => {
    if (reduceMotion || e.pointerType === "touch") return;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = (): void => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const lastLine = lines[lines.length - 1];
  const lastToken = lastLine?.[lastLine.length - 1];

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto w-full max-w-md py-6 lg:max-w-[28rem]"
      style={{ perspective: 1200 }}
    >
      {/* Glow mesh sitting behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 scale-110"
      >
        <div className="absolute left-0 top-4 h-56 w-56 rounded-full bg-cyan-400/25 blur-[90px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-500/20 blur-[100px]" />
      </div>

      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3 shadow-[0_32px_80px_-24px_rgba(6,182,212,0.35)] backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/30"
      >
        {/* Cursor-following glare */}
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        />

        {/* Editor window */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/80">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full bg-rose-400/80"
            />
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full bg-amber-400/80"
            />
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full bg-emerald-400/80"
            />
            <span className="ml-3 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300">
              developer.ts
            </span>
          </div>

          {/* Code */}
          <div
            role="img"
            aria-label={`Code snippet describing ${name}, a ${profile.role}`}
            className="overflow-x-auto px-4 py-5 font-mono text-[11px] leading-6 sm:text-[13px] sm:leading-7"
          >
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="flex">
                <span
                  aria-hidden
                  className="mr-4 w-4 shrink-0 select-none text-right text-slate-600"
                >
                  {lineIndex + 1}
                </span>
                <code className="whitespace-pre">
                  {line.map((token) => {
                    const typedLen = Math.max(
                      0,
                      Math.min(token.text.length, typed - token.start),
                    );
                    const hasCaret =
                      (typed >= token.start &&
                        typed < token.start + token.text.length) ||
                      (typed >= total && token === lastToken);

                    return (
                      <span
                        key={token.start}
                        className={TOKEN_COLORS[token.kind]}
                      >
                        {token.text.slice(0, typedLen)}
                        {hasCaret && <Caret />}
                        {/* Untyped text still takes space, so the card never resizes */}
                        <span className="invisible">
                          {token.text.slice(typedLen)}
                        </span>
                      </span>
                    );
                  })}
                </code>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 font-mono text-[11px] text-slate-500">
            <span>TypeScript</span>
            <span>Ln {lines.length}, Col 3 · UTF-8</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero({
  name = "Ilham Syahdan Rochusy",
  profile = DEFAULT_PROFILE,
}: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 px-4 pb-20 pt-32 sm:px-6 lg:px-8"
    >
      <Backdrop />

      <motion.div
        variants={stagger}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
      >
        {/* Left column */}
        <motion.div variants={stagger} className="max-w-2xl">
          <motion.div variants={rise}>
            <SectionHeader badge="Available For Work" title="" />
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            I build web products
            <span className="block bg-gradient-to-r from-cyan-200 via-cyan-400 to-sky-500 bg-clip-text pb-1 text-transparent">
              that feel effortless to use.
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            I&apos;m {name}, a {profile.role.toLowerCase()}. I design and ship
            fast, accessible interfaces backed by clean, maintainable code.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className={`group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 text-base font-semibold text-slate-950 shadow-[0_0_36px_-6px_rgba(6,182,212,0.7)] transition-colors hover:bg-cyan-400 ${focusRing}`}
            >
              View projects
              <ArrowIcon />
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-base font-medium text-slate-100 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10 ${focusRing}`}
            >
              Get in touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div variants={cardEntrance}>
          <CodeEditor name={name} profile={profile} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export type { DeveloperProfile, HeroProps };
export default Hero;
