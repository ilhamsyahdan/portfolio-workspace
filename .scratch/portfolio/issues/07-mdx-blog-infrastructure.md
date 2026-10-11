# 07: MDX Blog Infrastructure

**What to build:** Vite MDX plugin configured and integrated into the build process. TypeScript interfaces defined for blog post frontmatter structure (title, date, description, tags, author). MDX file loader that reads files from [`content/blog/`](content/blog/:1) directory, parses frontmatter, and returns typed post data. Create one sample MDX blog post to verify the infrastructure works end-to-end.

**Blocked by:** 01 (Project Foundation & Build Setup)

**Status:** ready-for-agent

- [ ] Install and configure Vite MDX plugin (`@mdx-js/rollup`)
- [ ] Define TypeScript interface for frontmatter structure
- [ ] Create MDX file loader utility to read from [`content/blog/`](content/blog/:1)
- [ ] Implement frontmatter parsing (gray-matter or similar)
- [ ] Create sample MDX file with frontmatter in [`content/blog/`](content/blog/:1)
- [ ] Verify MDX renders as React component
- [ ] Test frontmatter type checking
- [ ] Add error handling for malformed MDX
