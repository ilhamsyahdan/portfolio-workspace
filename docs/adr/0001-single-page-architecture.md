# ADR-0001: Single-Page Architecture with Hash Navigation

**Status:** Accepted  
**Date:** 2026-10-11  
**Context:** Portfolio Structure

## Decision

Build the portfolio as a single-page application (SPA) using hash-based navigation rather than multi-page routing with React Router.

## Context

The portfolio needs to present multiple content sections (Hero, Projects, Blog, About, Contact) in a cohesive experience. Two primary architectural approaches were considered:

1. **Multi-page with React Router**: Separate routes (`/`, `/projects`, `/blog`, `/about`) with distinct page components
2. **Single-page with hash navigation**: All sections on one page, navigated via hash links (`#projects`, `#blog`)

## Rationale

### Why Single-Page

- **Unified Experience**: Portfolio content is closely related and benefits from a continuous browsing experience
- **Simpler Implementation**: No router library dependency, fewer complexity layers
- **Smooth Scrolling**: Natural fit for animated scroll transitions between sections via Framer Motion
- **Performance**: All content loads together, no route-change delays (acceptable for portfolio scale)
- **Visual Continuity**: Maintains fixed header and design flow across all sections

### Why Hash Navigation

- **Works Without JavaScript**: Hash links function as fallback if JS fails
- **Simple State Management**: No routing state or history management needed
- **Direct Section Access**: URLs like `portfolio.com/#blog` link directly to sections
- **Browser History**: Hash changes create history entries for back/forward navigation
- **Active State Tracking**: Easy to detect which section is in viewport for nav highlighting

### Trade-offs Accepted

- **SEO Considerations**: Single-page may be less optimal for SEO than separate routes, but mitigated by:
  - SEO meta tags via react-helmet-async
  - Sections still crawlable (single HTML document with all content)
  - Portfolio sites prioritize direct sharing over search discovery
- **Initial Load Size**: All content loads upfront rather than code-split by route
  - Acceptable for portfolio scale (limited content)
  - Images use lazy loading to mitigate
- **Deep Linking Limitations**: Cannot share route-specific URLs like `/blog/post-title`
  - Blog post detail views could be implemented as separate routes if needed later
- **No React Router**: Eliminates dependency but gives up ecosystem benefits
  - Could migrate to Router later if navigation needs grow

## Consequences

### Positive

- Simpler codebase without routing abstraction
- Smoother user experience with scroll animations
- Fixed header navigation always accessible
- Easier to implement page-wide animations and transitions
- No route-based code splitting complexity

### Negative

- Blog post detail views will need custom solution (modal, slide-over, or separate route)
- Cannot use React Router's Link component or navigation guards
- Less conventional for larger web applications
- May need refactoring if site grows significantly

### Implementation Requirements

- Implement smooth scroll behavior (CSS + JS fallback)
- Build intersection observer for active section tracking
- Handle hash changes in browser history
- Ensure all sections have unique IDs for hash targets
- Implement scroll-to-top behavior for home navigation

## Alternatives Considered

### React Router Multi-Page

**Pros:** Better for SEO, clearer separation of concerns, route-based code splitting, conventional approach

**Cons:** More complex, requires router library, loses smooth-scroll continuity, more overhead for portfolio scale

**Why Rejected:** Complexity doesn't match portfolio needs; single-page provides better UX for this content type

### File-Based Routing

**Pros:** Convention over configuration, automatic route generation

**Cons:** Requires additional Vite plugin, still multi-page architecture, less control

**Why Rejected:** Adds dependency for marginal benefit; hash navigation is simpler
