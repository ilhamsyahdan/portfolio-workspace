/**
 * All About-section content lives here, so you can edit text, tech stack,
 * achievements and certifications without touching the component.
 * Replace every placeholder value with your own.
 */
import fotoProfile from "../assets/me.webp";
import usbTeam from "../assets/picture-3.webp";
import usbThropy from "../assets/picture-2.webp";
import usbCertificate from "../assets/picture-1.webp";

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
  readonly images?: string[];
}

export type CertificationStatus = "issued" | "pending";

export interface CompetencyUnit {
  readonly title: string;
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly year: string;
  readonly status?: CertificationStatus; // default "issued"
  readonly credentialUrl?: string;
  readonly units?: readonly CompetencyUnit[];
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
    "I'm a software engineer who builds full-stack web products that are clear, fast and accessible. I care about the details that make an interface feel effortless: motion, typography, and performance.",
    "I enjoy working across the stack, from designing APIs and database schemas to shaping the interface on top of them, and I keep my code readable and easy to maintain.",
    "Outside of work I write about what I learn, contribute to side projects, and keep experimenting with new tools.",
  ],
  skills: [
    "Full-stack web development",
    "Frontend architecture",
    "Responsive UI",
    "Accessibility",
    "API design",
    "Performance optimisation",
  ],
  techStack: [
    {
      name: "Frontend",
      items: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "GSAP",
      ],
    },
    {
      name: "Backend",
      items: ["Node.js", "REST APIs", "PostgreSQL", "Python"],
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
      event: "Unlimited Software Building (USB), Gunadarma University",
      year: "2024",
      description:
        "Achieved second place in a data mining competition by contributing to data cleaning, feature engineering, data visualization, and presentation using Python and Random Forest.",
      images: [usbTeam, usbThropy, usbCertificate],
    },
  ],
  certifications: [
    {
      name: "Junior Web Programmer",
      issuer: "BNSP",
      year: "2026",
      status: "pending", // ganti ke "issued" + credentialUrl setelah terbit
      units: [
        { title: "Using data structures" },
        { title: "Implementing user interfaces" },
        { title: "Installing programming tools" },
        { title: "Writing code to guidelines and best practices" },
        { title: "Implementing structured programming" },
        { title: "Using pre-existing libraries and components" },
        { title: "Documenting program code" },
        { title: "Debugging" },
      ],
    },
  ],
};
