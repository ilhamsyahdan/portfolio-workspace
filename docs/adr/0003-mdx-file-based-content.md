# ADR-0003: MDX for Blog Content with File-Based Storage

**Status:** Accepted  
**Date:** 2026-10-11  
**Context:** Content Management

## Decision

Store blog posts as MDX files in `/content/blog/` with YAML frontmatter, processed via Vite MDX plugin, rather than using a headless CMS or database.

## Context

The portfolio includes a blog for technical articles. Content storage options considered:

1. **File-based MDX/Markdown** in the repository
2. **Headless CMS** (Contentful, Sanity, Strapi)
3. **Database-backed** with rich text editor

## Rationale

### Why MDX

- **Developer-Friendly**: Write content in familiar Markdown syntax
- **Version Control**: Blog posts tracked in Git alongside code
- **Rich Content**: Embed React components for interactive demos, code playgrounds
- **Type Safety**: Can define TypeScript interfaces for frontmatter structure
- **Offline Editing**: Write content without external service dependencies
- **Syntax Highlighting**: Natural integration with Prism/Shiki for code blocks
- **No Build Dependencies**: Content bundled with application, no API calls

### Why File-Based Storage

- **Simple Workflow**: Create file, write content, commit
- **Zero Cost**: No CMS subscription or database hosting
- **Fast Builds**: Vite processes MDX at build time
- **Portable**: Content moves with codebase
- **Review Process**: Content changes go through Git review like code
- **Full Control**: Complete ownership of content format and structure

### Trade-offs Accepted

- **Non-Technical Editing**: Requires comfort with Markdown and file editing
  - Acceptable: developer writing technical content
- **No Web UI**: Cannot edit content through browser interface
  - Could add CMS later if needed (e.g., Tina CMS for Git-backed editing)
- **Build-Time Processing**: New posts require rebuild and deploy
  - Acceptable: blog posts aren't time-critical like news
- **Limited Dynamic Features**: No user-generated content, comments managed externally
  - Can integrate third-party comment system if needed (Giscus, Utterances)

## Consequences

### Positive

- Content lives alongside code, single source of truth
- Write blog posts in familiar editor with syntax highlighting
- Can embed custom React components in posts
- Type-safe frontmatter structure
- Content versioned and backed up via Git
- No external API dependencies or failure points
- Supports code-heavy technical content naturally

### Negative

- Must rebuild/redeploy to publish new posts
- No collaborative editing UI for non-developers
- Cannot schedule posts without CI/CD automation
- No built-in media management for images

### Implementation Requirements

- Install and configure `@mdx-js/rollup` or Vite MDX plugin
- Define TypeScript interface for frontmatter structure
- Create MDX file loader to read files from `/content/blog/`
- Parse frontmatter for metadata (title, date, tags, description)
- Implement chronological sorting by date
- Add syntax highlighting library (Prism or Shiki)
- Create loading and error states for MDX content
- Optimize image loading for blog post images in `/public/images/blog/`

## Alternatives Considered

### Headless CMS (Contentful, Sanity)

**Pros:** Non-technical editing UI, content scheduling, media management, collaboration features, webhooks for builds

**Cons:** External dependency, API complexity, potential costs, requires network calls, vendor lock-in, overkill for single-author blog

**Why Rejected:** Complexity and cost don't justify benefits for developer portfolio with single author

### Database-Backed Content

**Pros:** Dynamic content, real-time updates, no rebuild needed, search capabilities

**Cons:** Requires backend infrastructure, database hosting costs, more complex deployment, authentication for admin panel, less portable

**Why Rejected:** Introduces significant infrastructure complexity for minimal benefit; static content is sufficient for portfolio blog

### Plain Markdown (Not MDX)

**Pros:** Simpler, no JSX processing, faster parsing

**Cons:** Cannot embed interactive React components, less flexibility for rich technical content

**Why Rejected:** MDX's ability to embed components enables richer technical blog posts (interactive demos, custom callouts) worth the minimal additional complexity
