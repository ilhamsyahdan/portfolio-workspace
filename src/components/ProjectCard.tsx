import { forwardRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  selectedTech?: string | null;
  onTechClick?: (tech: string) => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/* ------------------------------- Icons ------------------------------------ */

function ExternalIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

/* ------------------------------- Card ------------------------------------- */

/**
 * forwardRef is required: AnimatePresence (mode="popLayout") passes a ref to
 * its direct children, and plain function components cannot receive one.
 */
export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  function ProjectCard({ project, selectedTech, onTechClick }, ref) {
    const reduceMotion = useReducedMotion();
    const [imageFailed, setImageFailed] = useState<boolean>(false);

    const isFeatured = Boolean(project.metadata?.featured);
    const isInProgress = project.metadata?.status === "in-progress";

    return (
      <motion.article
        ref={ref}
        layout={reduceMotion ? false : true}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -48px 0px" }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30"
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          {imageFailed ? (
            <div
              aria-hidden
              className="grid h-full w-full place-items-center bg-gradient-to-br from-slate-800 to-slate-950 text-5xl font-semibold text-cyan-400/40"
            >
              {project.title.charAt(0)}
            </div>
          ) : (
            <img
              src={project.imagePath}
              alt={project.title}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
          />

          {isInProgress && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-slate-950/60 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              In progress
            </span>
          )}
          {isFeatured && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-slate-950/60 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => {
              const isSelected = selectedTech === tech;
              return (
                <li key={tech}>
                  <button
                    type="button"
                    onClick={() => onTechClick?.(tech)}
                    aria-label={`Filter by ${tech}`}
                    aria-pressed={isSelected}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors duration-200 ${focusRing} ${
                      isSelected
                        ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-200"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {tech}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Links */}
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                className={`inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 ${focusRing}`}
              >
                <ExternalIcon />
                Live demo
              </a>
            )}
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.title}`}
                className={`inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-400 transition-colors hover:text-white ${focusRing}`}
              >
                <GitHubIcon />
                Source
              </a>
            )}
            {project.links.caseStudy && (
              <a
                href={project.links.caseStudy}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read case study of ${project.title}`}
                className={`inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-400 transition-colors hover:text-white ${focusRing}`}
              >
                <DocIcon />
                Case study
              </a>
            )}
          </div>
        </div>
      </motion.article>
    );
  },
);
