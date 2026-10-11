# 09: Blog Post Viewer with Syntax Highlighting

**What to build:** Full blog post detail view displaying rendered MDX content with syntax-highlighted code blocks using Prism or Shiki. Supports custom MDX components like callouts, code playgrounds, or interactive demos embedded in posts. Includes "Back to Blog" navigation. SEO meta tags dynamically update per post using react-helmet-async (title, description, og:image).

**Blocked by:** 08 (Blog List Section)

**Status:** ready-for-agent

- [ ] Install syntax highlighting library (Prism or Shiki)
- [ ] Create [`BlogPost`](src/features/blog/BlogPost.tsx:1) component
- [ ] Render MDX content with syntax highlighting applied
- [ ] Create custom MDX components (Callout, CodeBlock, etc.)
- [ ] Add "Back to Blog" navigation button
- [ ] Install and configure react-helmet-async
- [ ] Implement dynamic meta tag updates per post
- [ ] Add og:image and twitter:card meta tags
- [ ] Style post content with proper typography
- [ ] Verify code blocks render with syntax highlighting
- [ ] Test custom MDX components work in posts
