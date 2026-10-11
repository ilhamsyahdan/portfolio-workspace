import { motion } from "framer-motion";
import { getAllProjects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const projects = getAllProjects();

  return (
    <section id="projects" className="min-h-screen py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A collection of projects I've built, showcasing various technologies
            and problem-solving approaches
          </p>
        </motion.div>

        {/* Projects Grid - Responsive: 1 col mobile → 2 cols tablet → 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
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
