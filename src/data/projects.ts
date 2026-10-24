import xora from "../assets/xora.webp";
import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "xora-landing",
    title: "Xora Landing Page",
    description: "…",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    imagePath: xora, // hasil import, di-hash saat build
    links: {
      demo: "https://xora-landing-one.vercel.app/",
      source: "https://github.com/ilhamsyahdan/xora-landing",
    },
    metadata: {
      date: "2026-08",
      featured: true,
      status: "completed",
      order: 1,
    },
  },
];
