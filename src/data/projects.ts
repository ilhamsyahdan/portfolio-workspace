/**
 * Project Data Utilities
 *
 * This module provides functions to load and access project data
 * with full type safety.
 */

import projectsData from "../../data/projects.json";
import type { Project, ProjectsData } from "../types/project";

/**
 * Validates that the loaded data matches the expected schema
 * @param data - The raw data to validate
 * @returns True if valid, throws error if invalid
 */
function validateProjectsData(data: unknown): data is ProjectsData {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid projects data: must be an object");
  }

  const typedData = data as Record<string, unknown>;

  if (!Array.isArray(typedData.projects)) {
    throw new Error("Invalid projects data: projects must be an array");
  }

  // Validate each project has required fields
  typedData.projects.forEach((project, index) => {
    if (!project || typeof project !== "object") {
      throw new Error(`Invalid project at index ${index}: must be an object`);
    }

    const p = project as Record<string, unknown>;

    const requiredFields = [
      "id",
      "title",
      "description",
      "techStack",
      "imagePath",
      "links",
    ];
    requiredFields.forEach((field) => {
      if (!(field in p)) {
        throw new Error(
          `Invalid project at index ${index}: missing required field '${field}'`,
        );
      }
    });

    if (!Array.isArray(p.techStack)) {
      throw new Error(
        `Invalid project at index ${index}: techStack must be an array`,
      );
    }

    if (typeof p.links !== "object" || p.links === null) {
      throw new Error(
        `Invalid project at index ${index}: links must be an object`,
      );
    }
  });

  return true;
}

/**
 * Load and validate project data
 * @returns Typed and validated projects data
 */
function loadProjects(): ProjectsData {
  // Validate the data at runtime
  if (validateProjectsData(projectsData)) {
    return projectsData as ProjectsData;
  }

  // This should never be reached due to validation throwing
  throw new Error("Failed to load projects data");
}

// Export the validated and typed data
const validatedData = loadProjects();

/**
 * Get all projects
 * @returns Array of all projects
 */
export function getAllProjects(): Project[] {
  return validatedData.projects;
}

/**
 * Get a project by ID
 * @param id - The project ID
 * @returns The project or undefined if not found
 */
export function getProjectById(id: string): Project | undefined {
  return validatedData.projects.find((project) => project.id === id);
}

/**
 * Get featured projects
 * @returns Array of featured projects, sorted by order
 */
export function getFeaturedProjects(): Project[] {
  return validatedData.projects
    .filter((project) => project.metadata?.featured === true)
    .sort((a, b) => {
      const orderA = a.metadata?.order ?? Infinity;
      const orderB = b.metadata?.order ?? Infinity;
      return orderA - orderB;
    });
}

/**
 * Get projects filtered by technology
 * @param tech - The technology to filter by
 * @returns Array of projects using the specified technology
 */
export function getProjectsByTech(tech: string): Project[] {
  return validatedData.projects.filter((project) =>
    project.techStack.some((t) => t.toLowerCase() === tech.toLowerCase()),
  );
}

/**
 * Get all unique technologies used across projects
 * @returns Sorted array of unique technology names
 */
export function getAllTechnologies(): string[] {
  const techSet = new Set<string>();

  validatedData.projects.forEach((project) => {
    project.techStack.forEach((tech) => techSet.add(tech));
  });

  return Array.from(techSet).sort();
}

// Export the raw data for direct access if needed
export const projects = validatedData.projects;
