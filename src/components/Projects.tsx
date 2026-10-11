import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProjects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const allProjects = getAllProjects();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Extract all unique tech stacks from projects
  const allTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    allProjects.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [allProjects]);

  // Filter projects based on selected tech
  const filteredProjects = useMemo(() => {
    if (!selectedTech) return allProjects;
    return allProjects.filter((project) =>
      project.techStack.includes(selectedTech),
    );
  }, [allProjects, selectedTech]);

  // Handle tech badge click - toggle filter
  const handleTechClick = (tech: string) => {
    setSelectedTech((current) => (current === tech ? null : tech));
  };

  return (
    <section id="projects" className="min-h-screen py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A collection of projects I've built, showcasing various technologies
            and problem-solving approaches
          </p>
        </motion.div>

        {/* Tech Stack Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {allTechStacks.map((tech) => (
              <button
                key={tech}
                onClick={() => handleTechClick(tech)}
                className={`text-sm px-4 py-2 rounded-lg border transition-all duration-300 ${
                  selectedTech === tech
                    ? "bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/30"
                    : "bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-slate-700 hover:border-slate-600"
                }`}
                aria-label={`Filter by ${tech}`}
                aria-pressed={selectedTech === tech}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Filtered Count Display */}
          <motion.p
            key={selectedTech || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center text-slate-400 text-sm"
          >
            {selectedTech
              ? `Showing ${filteredProjects.length} of ${allProjects.length} projects`
              : `Showing all ${allProjects.length} projects`}
          </motion.p>
        </motion.div>

        {/* Projects Grid - Responsive: 1 col mobile → 2 cols tablet → 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                selectedTech={selectedTech}
                onTechClick={handleTechClick}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-slate-800 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
          >
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};
