# 08: Blog List Section

**What to build:** A Blog section accessible via #blog hash navigation, displaying a chronological list of blog posts sorted by date (newest first). Each list item shows the post title, publication date, and description from frontmatter. Clicking a post title navigates to the full post view. Section includes loading spinner while fetching posts and error message if posts fail to load.

**Blocked by:** 02 (Header Component with Hash Navigation), 07 (MDX Blog Infrastructure)

**Status:** ready-for-agent

- [ ] Create [`BlogList`](src/features/blog/BlogList.tsx:1) component
- [ ] Load all blog posts from MDX file loader
- [ ] Sort posts by date in descending order
- [ ] Create [`BlogListItem`](src/components/BlogListItem.tsx:1) component for each post
- [ ] Display title, date, and description
- [ ] Implement click handler to navigate to post detail
- [ ] Add loading spinner component
- [ ] Add error message display
- [ ] Style list with proper spacing and hover states
- [ ] Ensure section accessible via #blog hash
