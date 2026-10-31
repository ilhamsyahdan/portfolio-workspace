import xora from "../assets/xora.webp";
import velvet from "../assets/dan-landing-mocktail.webp";
import sentriPostsImage from "../assets/sentriposts.webp";
import posHomeImage from "../assets/projects/pos/home-pos.webp";
import posOrdersImage from "../assets/projects/pos/orders-pos.webp";
import posOverviewImage from "../assets/projects/pos/overview-pos.webp";
import posSystemImage from "../assets/projects/pos/pos.webp";

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
    id: "pos-system",
    title: "POS System — Restaurant Point of Sale",
    description:
      "A full-stack point of sale application for restaurants that handles order taking, table management, menu and stock tracking, and payments through Midtrans (Sandbox). It includes a dashboard with live earnings and order statistics, plus invoice and sales report modules.",
    techStack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Redux Toolkit",
      "TanStack Query",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Midtrans",
      "Cloudinary",
    ],
    imagePath: posSystemImage,
    links: {
      demo: undefined,
      source: "https://github.com/ilhamsyahdan/POS-System-UMKM",
    },
    screenshots: [posHomeImage, posOrdersImage, posOverviewImage],
    metadata: {
      date: "2026-10",
      featured: true,
      order: 2,
    },
  },
  {
    id: "xora-landing",
    title: "XORA AI — Video Editor Landing Page",
    description:
      "An animated landing page for a cocktail bar concept, built to practice scroll-driven animation with GSAP. It features animated hero and menu sections, smooth transitions, and a fully responsive layout. Design inspired by JavaScript Mastery.",
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
      order: 3,
    },
  },
  {
    id: "cocktail-landing",
    title: "Cocktail Landing Page",
    description:
      "A responsive marketing page for XORA AI, an AI video editor concept, built to practice turning a polished design into clean, reusable React components with Tailwind CSS. Design inspired by JavaScript Mastery.",
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
      order: 4,
    },
  },
];
