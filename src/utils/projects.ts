import { projects } from "../data/projects";
import type { Project } from "../types/project";

export const getAllProjects = (): Project[] => projects;

export const getProjectById = (id: string) => projects.find((p) => p.id === id);

export const getFeaturedProjects = (): Project[] =>
  projects
    .filter((p) => p.metadata?.featured === true)
    .sort(
      (a, b) =>
        (a.metadata?.order ?? Infinity) - (b.metadata?.order ?? Infinity),
    );

export const getProjectsByTech = (tech: string): Project[] =>
  projects.filter((p) =>
    p.techStack.some((t) => t.toLowerCase() === tech.toLowerCase()),
  );

export const getAllTechnologies = (): string[] =>
  Array.from(new Set(projects.flatMap((p) => p.techStack))).sort();
