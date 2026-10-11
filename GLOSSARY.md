# Glossary

## Portfolio

The complete website showcasing the developer's work, skills, and professional identity. Built with React + Vite + TypeScript, styled with Tailwind CSS, and deployed to Netlify. Contains multiple content sections (Hero, Projects, Blog, About, Contact) and features a dark theme with cyan accent color (#06b6d4). Implemented as a single-page application with hash-based navigation and smooth scrolling between sections. Uses Framer Motion for animations and Vercel Analytics for tracking.

## Hero Section

The landing section at the top of the portfolio, displayed before other content sections. Contains the developer's name, one-line tagline, brief introduction (1-2 sentences), and a CTA button (e.g., "View Projects"). Serves as the first impression and entry point to the portfolio.

## Header

The top navigation component of the portfolio containing personal logo/initials and hash navigation links to each content section (#projects, #blog, #about, #contact). Fixed (sticky) at the top of the viewport for constant accessibility. Includes active state tracking to indicate current section. Built first in the progressive implementation order.

## Project

A completed or ongoing software development work item that is showcased in the portfolio. Each project has metadata (title, description, technologies, links) stored in JSON format at `/data/projects.json`. Projects displayed as cards with hover effects, showing project image, title, tech stack, and description. Can be filtered by tech stack.

## Project Card

A card component displaying a single project in the Projects section. Shows project image/screenshot, title, tech stack badges (filterable), brief description, and links to live demo and source code. Features hover effects via Framer Motion for interactivity.

## Blog Post

Written content articles published on the portfolio, typically covering technical topics, tutorials, or professional insights. Stored as individual MDX files under `/content/blog/` with frontmatter metadata. Displayed in a chronological list sorted by date with title and date visible. Features syntax-highlighted code snippets using Prism or Shiki. Distinct from projects in that they are text-based content rather than software artifacts.

## Content Section

A major subdivision of the portfolio (e.g., Hero, Projects, Blog, About, Contact). Each section represents a distinct category of information with its own purpose and content structure. Accessed via hash-based navigation (`#projects`, `#blog`, etc.) with smooth scrolling in the single-page layout. Built progressively starting with header, then individual sections.

## MDX

Markdown with JSX—a file format that allows writing Markdown content with embedded React components. Used for blog posts to enable rich, interactive technical content with custom components. Processed via Vite MDX plugin during build. Includes loading and error states for content fetch.

## Tech Stack

The set of technologies, frameworks, and tools used to build a project. Used as metadata for projects to enable filtering and showcasing technical expertise. Stored as an array of strings in project JSON data. Displayed as tech badges on project cards.

## Tech Badge

A small UI element (badge/pill) displaying a single technology name from a project's tech stack. Used for visual tech stack display and as interactive filters to show/hide projects based on selected technologies.

## Feature

A self-contained domain area with its own components, logic, and data handling (e.g., blog feature includes post listing, post reader, MDX processing). Organized under `features/` directory for complex sections that have significant internal structure.

## Component

A reusable React UI element shared across multiple features or pages. Stored in the `components/` directory. Examples: Header, Footer, Button, Card, CodeBlock, SectionNav, ErrorBoundary, LoadingSpinner, ProjectCard, BlogListItem.

## Frontmatter

YAML metadata block at the top of an MDX file containing structured data about the blog post (title, date, description, tags, author, etc.). Parsed during build and used for post listings, chronological sorting, filtering, and SEO meta tags via react-helmet-async.

## Syntax Highlighting

Visual formatting of code snippets in blog posts to improve readability by color-coding language keywords, strings, functions, etc. Implemented using a syntax highlighting library (Prism or Shiki) integrated with MDX rendering.

## Hash Navigation

URL-based navigation using fragment identifiers (`#projects`, `#blog`) that trigger smooth scrolling to the corresponding section on the page. Works without JavaScript as fallback but enhanced with scroll behavior and active state tracking. Implemented in header navigation.

## Framer Motion

A React animation library used for creating smooth, performant animations and transitions. Used for scroll-triggered fade-ins, section transitions, project card hover effects, and interactive UI elements in the portfolio.

## Loading State

UI indication that content is being fetched or processed, typically shown while MDX blog posts are loading. Prevents layout shift and provides user feedback during asynchronous operations.

## Error Boundary

A React component pattern that catches JavaScript errors in child components, logs them, and displays a fallback UI instead of crashing the entire application. Used to handle MDX rendering errors gracefully.

## Lazy Loading

Performance optimization technique where images are only loaded when they enter or are about to enter the viewport. Implemented using the native `loading="lazy"` attribute on img tags. Reduces initial page load time for image-heavy sections like Projects. Images stored in `/public/images/`.

## Pre-commit Hook

Git hook that runs automated checks (linting via ESLint, formatting via Prettier) before allowing a commit. Implemented using Husky and lint-staged to ensure code quality standards are met before code enters version control.

## Conventional Commits

A commit message convention that structures commits with a type prefix (feat:, fix:, docs:, style:, refactor:, test:, chore:) followed by a description. Enables automated changelog generation and clearer project history. Enforced via git commit workflow.

## Design System

The visual design specifications for the portfolio including colors, typography, spacing, and component styles. Uses dark gray backgrounds (#0a0a0a to #1a1a1a), cyan accent color (#06b6d4), Inter font for UI text, and JetBrains Mono for code blocks. Implemented via Tailwind CSS configuration with mobile-first responsive design.
