import { motion } from "framer-motion";
import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  index: number;
  selectedTech?: string | null;
  onTechClick?: (tech: string) => void;
}

export const ProjectCard = ({
  project,
  selectedTech,
  onTechClick,
}: ProjectCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
        <img
          src={project.imagePath}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover opacity-90"
        />
        {project.metadata?.featured && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        {project.metadata?.status === "in-progress" && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
            In Progress
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 bg-gradient-to-b from-slate-800/80 to-slate-800">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-slate-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <button
              key={tech}
              onClick={() => onTechClick?.(tech)}
              className={`text-xs px-2.5 py-1 rounded-md border transition-all duration-200 ${
                selectedTech === tech
                  ? "bg-blue-500 text-white border-blue-400 shadow-md"
                  : "bg-slate-700/70 text-slate-300 border-slate-600/50 hover:bg-slate-600 hover:border-slate-500 cursor-pointer"
              }`}
              aria-label={`Filter by ${tech}`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Links with Icons */}
        <div className="flex gap-4 pt-4 border-t border-slate-700">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              aria-label={`View demo of ${project.title}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
          {project.links.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              aria-label={`View source code of ${project.title}`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source
            </a>
          )}
          {project.links.caseStudy && (
            <a
              href={project.links.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              aria-label={`Read case study of ${project.title}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Case Study
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
