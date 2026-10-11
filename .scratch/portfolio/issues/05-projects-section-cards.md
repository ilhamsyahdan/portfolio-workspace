# 05: Projects Section with Cards

**What to build:** A Projects section accessible via #projects hash navigation, displaying project cards in a responsive grid layout. Each card shows the project image (lazy-loaded), title, tech stack badges, description excerpt, and links to demo/source. Cards have hover effects animated with Framer Motion (scale up, shadow increase). Grid adapts from single column on mobile to multi-column on larger screens.

**Blocked by:** 02 (Header Component with Hash Navigation), 04 (Projects Data Structure & Type System)

**Status:** ready-for-agent

- [ ] Create [`ProjectCard`](src/components/ProjectCard.tsx:1) component
- [ ] Create [`Projects`](src/components/Projects.tsx:1) section component
- [ ] Display projects in responsive grid layout (1 col mobile → 2-3 cols desktop)
- [ ] Render project image with lazy loading attribute
- [ ] Display tech stack as badge/pill elements
- [ ] Add demo and source links with icons
- [ ] Implement Framer Motion hover animations
- [ ] Add section heading and description
- [ ] Verify grid responsiveness and lazy loading
- [ ] Ensure section accessible via #projects hash
