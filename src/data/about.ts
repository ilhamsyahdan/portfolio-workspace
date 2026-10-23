/**
 * All About-section content lives here, so you can edit text, tech stack,
 * achievements and certifications without touching the component.
 * Replace every placeholder value with your own.
 */
import fotoProfile from "../assets/me.webp";

export interface TechCategory {
  readonly name: string;
  readonly items: readonly string[];
}

export interface Achievement {
  /** Short result, e.g. "2nd Place". */
  readonly placement: string;
  readonly title: string;
  /** Organizer / competition name. */
  readonly event: string;
  readonly year: string;
  readonly description: string;
  /** Optional link (announcement, write-up, repo). */
  readonly href?: string;
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly year: string;
  readonly credentialUrl?: string;
}

export interface ProfilePhotoData {
  readonly src: string;
  readonly alt: string;
}

export interface AboutContent {
  readonly name: string;
  /** Optional. Omit to hide the photo column entirely. */
  readonly photo?: ProfilePhotoData;
  readonly bio: readonly string[];
  readonly skills: readonly string[];
  readonly techStack: readonly TechCategory[];
  readonly achievements: readonly Achievement[];
  readonly certifications: readonly Certification[];
}

export const aboutContent: AboutContent = {
  name: "Ilham Syahdan Rochusy",
  photo: { src: fotoProfile, alt: "Portrait of Your Name" },
  bio: [
    "I'm a full-stack developer who enjoys turning messy problems into clear, fast and accessible products. I care about the details that make an interface feel effortless: motion, typography, and performance.",
    "I also work with data. Mining patterns out of raw datasets taught me to question assumptions and validate ideas with evidence, a habit I bring into every product I build.",
    "Outside of work I write about what I learn, contribute to side projects, and keep experimenting with new tools.",
  ],
  skills: [
    "Frontend architecture",
    "Responsive UI",
    "Accessibility",
    "API design",
    "Data mining & analysis",
    "Performance optimisation",
  ],
  techStack: [
    {
      name: "Frontend",
      items: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Next.js",
      ],
    },
    {
      name: "Backend",
      items: ["Node.js", "PostgreSQL", "REST APIs"],
    },
    {
      name: "Data",
      items: ["Python", "pandas", "scikit-learn", "Jupyter"],
    },
    {
      name: "Tools",
      items: ["Git", "Docker", "Vite", "Linux (WSL)"],
    },
  ],
  achievements: [
    {
      placement: "2nd Place",
      title: "Data Mining Competition",
      event: "Competition name / organizer",
      year: "Year",
      description:
        "Placed second by building a pipeline for feature engineering, model selection and validation. Add a sentence on your approach, the dataset and the result.",
      href: undefined,
    },
  ],
  certifications: [
    {
      name: "Certification name",
      issuer: "Issuing organization",
      year: "Year",
      credentialUrl: undefined,
    },
  ],
};
