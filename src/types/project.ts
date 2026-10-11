/**
 * Project Data Types
 *
 * This file defines the TypeScript interfaces for portfolio project data.
 * Used to ensure type safety when loading and displaying project information.
 */

/**
 * Represents a single project in the portfolio
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;

  /** Project title */
  title: string;

  /** Short description of the project */
  description: string;

  /** Array of technologies used in the project */
  techStack: string[];

  /** Path to the project image (relative to public/) */
  imagePath: string;

  /** Links related to the project */
  links: ProjectLinks;

  /** Optional metadata */
  metadata?: ProjectMetadata;
}

/**
 * Project-related links
 */
export interface ProjectLinks {
  /** URL to live demo (optional) */
  demo?: string;

  /** URL to source code repository (optional) */
  source?: string;

  /** URL to case study or detailed write-up (optional) */
  caseStudy?: string;
}

/**
 * Additional project metadata
 */
export interface ProjectMetadata {
  /** Project completion/publish date */
  date?: string;

  /** Whether the project is featured */
  featured?: boolean;

  /** Project status */
  status?: "completed" | "in-progress" | "archived";

  /** Order/priority for display */
  order?: number;
}

/**
 * Type for the projects data file
 */
export interface ProjectsData {
  projects: Project[];
}
