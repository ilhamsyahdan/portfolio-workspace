# ADR-0004: Tailwind CSS for Styling

**Status:** Accepted  
**Date:** 2026-10-11  
**Context:** Styling Strategy

## Decision

Use Tailwind CSS as the primary styling solution with a custom design system configuration, rather than CSS modules, styled-components, or vanilla CSS.

## Context

The portfolio requires a styling approach that balances rapid development, maintainability, and design consistency. Design requirements include:

- Dark theme with cyan accent (#06b6d4)
- Dark gray backgrounds (#0a0a0a to #1a1a1a)
- Inter font for UI, JetBrains Mono for code
- Mobile-first responsive design
- Consistent spacing and component styles

## Rationale

### Why Tailwind CSS

- **Rapid Development**: Utility classes enable fast UI implementation
- **Design System Integration**: Configuration file enforces design tokens (colors, spacing, typography)
- **Consistency**: Constrained utilities prevent arbitrary values
- **Mobile-First**: Built-in responsive breakpoints match requirements
- **No CSS Files**: Co-located styling with components reduces cognitive load
- **Tree-Shaking**: Unused utilities purged in production build
- **Type Safety**: Can generate TypeScript types for custom config
- **Dark Mode**: Built-in dark mode utilities (though we only use dark theme)
- **Community**: Extensive plugin ecosystem and component examples

### Configuration Strategy

Custom Tailwind config will define:

- **Colors**: Dark gray scale + cyan accent
- **Typography**: Inter and JetBrains Mono font families
- **Spacing**: Consistent scale for layouts
- **Animations**: Subtle transitions and motion

### Trade-offs Accepted

- **Class Name Length**: HTML can become verbose with many utility classes
  - Mitigated: Extract common patterns into components
- **Learning Curve**: Team must learn utility class names
  - Mitigated: Excellent documentation and IDE autocomplete
- **CSS-in-JS Migration**: Different from styled-components mental model
  - Acceptable: Utility-first is increasingly standard
- **Specificity**: All styles at same specificity level
  - Generally positive: reduces cascade issues

## Consequences

### Positive

- Rapid UI development with utility classes
- Design system enforced through configuration
- No CSS file management or naming conventions needed
- Responsive design via mobile-first breakpoints
- Automatic purging keeps bundle size small
- Easy to implement dark theme design system
- Can extend with custom utilities as needed

### Negative

- Utility classes can clutter component JSX
- Custom complex animations may require CSS
- Non-Tailwind developers face learning curve
- Some developers dislike utility-first approach philosophically

### Implementation Requirements

- Install and configure `tailwindcss` and PostCSS
- Create `tailwind.config.js` with custom design tokens:
  - Color palette (grays, cyan accent)
  - Font families (Inter, JetBrains Mono)
  - Custom spacing/sizing if needed
  - Animation configurations for Framer Motion integration
- Set up PostCSS with Tailwind plugin
- Create base styles for typography and globals
- Define reusable component patterns for consistency
- Configure PurgeCSS for production optimization
- Consider Tailwind UI or Headless UI for complex components

## Alternatives Considered

### CSS Modules

**Pros:** Scoped styles, familiar CSS syntax, no learning curve, explicit naming

**Cons:** More files to manage, no design system enforcement, manual responsive design, larger bundle without careful optimization

**Why Rejected:** Slower development velocity, lacks design system constraints, more cognitive overhead managing separate CSS files

### Styled-Components (CSS-in-JS)

**Pros:** Component-scoped styles, dynamic styling via props, TypeScript integration, familiar CSS syntax

**Cons:** Runtime overhead, larger bundle size, flash of unstyled content, complexity, theme provider setup, testing challenges

**Why Rejected:** Runtime performance cost, complexity doesn't match portfolio needs, Tailwind is faster for utility-heavy designs

### Vanilla CSS/SCSS

**Pros:** Full control, no dependencies, familiar, powerful preprocessor features (SCSS)

**Cons:** Global namespace, naming convention overhead (BEM), no design system enforcement, manual responsive design, larger bundles

**Why Rejected:** Too much manual work for responsive design, no built-in design system, naming conventions add cognitive load

### UnoCSS

**Pros:** Faster than Tailwind, more flexible, presets available

**Cons:** Smaller ecosystem, less mature, fewer community resources and examples

**Why Rejected:** Tailwind's maturity and ecosystem outweigh marginal performance benefits
