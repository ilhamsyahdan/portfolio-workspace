import type { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import type { TechCategory } from "../data/about";

const getIconUrl = (tech: string) => {
  const map: Record<string, string> = {
    "Next.js": "nextdotjs",
    "Node.js": "nodedotjs",
    "Tailwind CSS": "tailwindcss",
    "Framer Motion": "framer",
    PostgreSQL: "postgresql",
    "REST APIs": "insomnia",
    "scikit-learn": "scikitlearn",
    "Linux (WSL)": "linux",
  };
  const slug = map[tech] || tech.toLowerCase().replace(/\s+/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
};

/* ----------------------------- Spotlight card ----------------------------- */
/* Border + permukaan kartu menyala mengikuti posisi kursor (desktop).        */

function SpotlightCard({ children }: { children: ReactNode }) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMove}
      className="group relative h-full rounded-3xl bg-white/10 p-px"
    >
      {/* glow di border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(34,211,238,0.6), transparent 65%)",
        }}
      />
      <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-slate-950 p-5 sm:p-6">
        {/* permukaan kartu + glow lembut */}
        <div aria-hidden className="absolute inset-0 bg-white/[0.03]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--x, 50%) var(--y, 50%), rgba(34,211,238,0.09), transparent 70%)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------- Tech tile ------------------------------- */

function TechTile({ tech }: { tech: string }) {
  return (
    <motion.li
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group/tile flex w-[5.25rem] flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-3.5 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 sm:w-24"
    >
      <img
        src={getIconUrl(tech)}
        alt=""
        loading="lazy"
        draggable={false}
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="h-7 w-7 object-contain opacity-70 grayscale transition duration-300 group-hover/tile:opacity-100 group-hover/tile:grayscale-0"
      />
      <span className="text-center text-xs leading-tight text-slate-300 transition-colors group-hover/tile:text-white">
        {tech}
      </span>
    </motion.li>
  );
}

/* -------------------------------- Tech stack ------------------------------ */

interface TechStackProps {
  categories: readonly TechCategory[];
}

export function TechStack({ categories }: TechStackProps) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {categories.map((category, index) => (
        <SpotlightCard key={category.name}>
          <div className="flex items-baseline justify-between">
            <h4 className="text-lg font-semibold tracking-tight text-white">
              {category.name}
            </h4>
            <span className="font-mono text-xs text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-cyan-300/80">
            {category.items.length} tools
          </p>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            {category.items.map((tech) => (
              <TechTile key={tech} tech={tech} />
            ))}
          </ul>
        </SpotlightCard>
      ))}
    </div>
  );
}
