import { useRef } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
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

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface ProjectMetric {
  readonly value: string;
  readonly label: string;
}

interface FeaturedProject {
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly metric: ProjectMetric;
  /** Values for the sparkline inside the preview card. */
  readonly trend: readonly number[];
  readonly href: string;
}

interface HeroProps {
  name?: string;
  featuredProject?: FeaturedProject;
}

/* -------------------------------------------------------------------------- */
/*  Defaults – replace with your own content                                  */
/* -------------------------------------------------------------------------- */

const DEFAULT_PROJECT: FeaturedProject = {
  title: "Pulse",
  description:
    "A real-time analytics dashboard that turns raw event streams into decisions your team can act on.",
  tags: ["Next.js", "TypeScript", "PostgreSQL"],
  metric: { value: "12.4k", label: "active users this week" },
  trend: [18, 26, 22, 34, 30, 44, 40, 58, 52, 70, 66, 84],
  href: "#projects",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

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

interface SparkPaths {
  readonly line: string;
  readonly area: string;
  readonly end: { readonly x: number; readonly y: number };
}

/** Builds a smooth SVG line + filled area path from a list of values. */
function buildSparkPaths(
  values: readonly number[],
  width: number,
  height: number,
  pad: number,
): SparkPaths {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? (width - pad * 2) / (values.length - 1) : 0;

  const points = values.map((v, i) => ({
    x: pad + i * step,
    y: height - pad - ((v - min) / range) * (height - pad * 2),
  }));

  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) {
    return { line: "", area: "", end: { x: 0, y: 0 } };
  }

  let line = `M ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    if (!prev || !curr) continue;
    const cx = (prev.x + curr.x) / 2;
    line += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const area = `${line} L ${last.x} ${height} L ${first.x} ${height} Z`;
  return { line, area, end: { x: last.x, y: last.y } };
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

interface GlassChipProps {
  children: ReactNode;
  className?: string;
  /** translateZ depth in px – gives the chip parallax against the card. */
  depth: number;
}

function GlassChip({ children, className = "", depth }: GlassChipProps) {
  return (
    <motion.div
      style={{ z: depth }}
      className={`absolute flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
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

/* -------------------------------------------------------------------------- */
/*  Interactive project preview (hover tilt + cursor glare)                   */
/* -------------------------------------------------------------------------- */

interface ProjectShowcaseProps {
  project: FeaturedProject;
}

function ProjectShowcase({ project }: ProjectShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

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

  const { line, area, end } = buildSparkPaths(project.trend, 320, 120, 8);

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

        {/* Visual */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/80 p-5">
          <p className="text-3xl font-semibold tracking-tight text-white">
            {project.metric.value}
          </p>
          <p className="mt-1 text-sm text-slate-400">{project.metric.label}</p>

          <svg
            viewBox="0 0 320 120"
            className="mt-4 h-28 w-full"
            role="img"
            aria-label={`Trend chart for ${project.metric.label}`}
          >
            <defs>
              <linearGradient id="hero-area-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={area}
              fill="url(#hero-area-fill)"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            />
            <motion.path
              d={line}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.7, ease: EASE }}
            />
            <circle cx={end.x} cy={end.y} r="9" fill="#22d3ee" opacity="0.18" />
            <circle cx={end.x} cy={end.y} r="4" fill="#67e8f9" />
          </svg>
        </div>

        {/* Details */}
        <div className="px-3 pb-3 pt-5">
          <h2 className="text-xl font-semibold tracking-tight text-white">
            {project.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          <a
            href={project.href}
            className={`group mt-5 inline-flex items-center gap-2 rounded-full text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 ${focusRing}`}
          >
            View case study
            <ArrowIcon />
          </a>
        </div>

        {/* Floating chips (parallax depth) */}
        <GlassChip depth={70} className="-left-3 top-10 sm:-left-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          In production
        </GlassChip>
        <GlassChip depth={50} className="-right-3 bottom-28 sm:-right-8">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          Lighthouse 100
        </GlassChip>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero({
  name = "Your Name",
  featuredProject = DEFAULT_PROJECT,
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
            I&apos;m {name}, a full-stack developer. I design and ship fast,
            accessible interfaces backed by clean, maintainable code.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#projects"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className={`group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 text-base font-semibold text-slate-950 shadow-[0_0_36px_-6px_rgba(6,182,212,0.7)] transition-colors hover:bg-cyan-400 ${focusRing}`}
            >
              View projects
              <ArrowIcon />
            </motion.a>

            <motion.a
              href="#contact"
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
          <ProjectShowcase project={featuredProject} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export type { FeaturedProject, HeroProps };
export default Hero;
