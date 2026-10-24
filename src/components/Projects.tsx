import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";
import { getAllProjects } from "../utils/projects";

const GITHUB_URL = "https://github.com/username";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
}

function FilterChip({ label, active, onClick, ariaLabel }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm backdrop-blur-md transition-all duration-200 ${focusRing} ${
        active
          ? "border-cyan-400/60 bg-cyan-500 font-semibold text-slate-950 shadow-[0_0_24px_-6px_rgba(6,182,212,0.8)]"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

export const Projects = () => {
  const allProjects = useMemo(() => getAllProjects(), []);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Unique tech stacks across all projects
  const allTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    allProjects.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) return allProjects;
    return allProjects.filter((project) =>
      project.techStack.includes(selectedTech),
    );
  }, [allProjects, selectedTech]);

  // Clicking the active tech again clears the filter
  const handleTechClick = (tech: string): void => {
    setSelectedTech((current) => (current === tech ? null : tech));
  };

  return (
    <section
      id="projects"
      className="relative isolate scroll-mt-24 overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      {/* Ambient glow + top divider */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <SectionHeader
          badge="Selected work"
          title="Featured projects"
          description="A selection of things I've built, from product dashboards to developer tools. Filter by technology to see what I use where."
          action={
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10 ${focusRing}`}
            >
              View all on GitHub
            </a>
          }
        />

        {/* Tech filter */}
        <div className="mt-12">
          <div
            role="group"
            aria-label="Filter projects by technology"
            className="flex flex-wrap gap-2"
          >
            <FilterChip
              label="All"
              active={selectedTech === null}
              onClick={() => setSelectedTech(null)}
              ariaLabel="Show all projects"
            />
            {allTechStacks.map((tech) => (
              <FilterChip
                key={tech}
                label={tech}
                active={selectedTech === tech}
                onClick={() => handleTechClick(tech)}
                ariaLabel={`Filter by ${tech}`}
              />
            ))}
          </div>

          <p aria-live="polite" className="mt-4 text-sm text-slate-400">
            {selectedTech
              ? `Showing ${filteredProjects.length} of ${allProjects.length} projects`
              : `${allProjects.length} projects`}
          </p>
        </div>

        {/* Grid: 1 col mobile → 2 tablet → 3 desktop */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                selectedTech={selectedTech}
                onTechClick={handleTechClick}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
