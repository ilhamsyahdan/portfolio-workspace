import xora from "../assets/xora.webp";
import velvet from "../assets/dan-landing-mocktail.webp";
import sentriPostsImage from "../assets/sentriposts.webp";

import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "sentriposts",
    title: "SentriPosts — Social Media Management",
    description:
      "A social media content management platform that enables users to connect Instagram and LinkedIn accounts, manage posts, schedule publications, and monitor post performance from a single dashboard.",
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "Clerk",
      "Inngest",
      "Tailwind CSS",
    ],
    imagePath: sentriPostsImage,
    links: {
      demo: undefined, // Replace with the actual deployed demo URL
      source: "https://github.com/ilhamsyahdan/sentri-post",
    },
    metadata: {
      date: "2026-08",
      featured: true,
      order: 1,
    },
  },
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
  {
    id: "cocktail-landing",
    title: "Cocktail Landing Page",
    description: "…",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP"],
    imagePath: velvet, // hasil import, di-hash saat build
    links: {
      demo: "https://gsap-landing-cocktail.vercel.app/",
      source: "https://github.com/ilhamsyahdan/gsap_landing_cocktail",
    },
    metadata: {
      date: "2026-08",
      featured: true,
      status: "completed",
      order: 1,
    },
  },
];
