import { BlogFrontmatter, BlogPostMetadata, BlogPost } from "../types/blog";

/**
 * Loads all MDX blog posts from the content/blog directory
 * Returns metadata for all posts (slug + frontmatter)
 * Uses Vite's build-time MDX compilation
 */
export async function loadBlogPosts(): Promise<BlogPostMetadata[]> {
  try {
    // Use Vite's glob import to load all MDX files as modules (not raw)
    // Note: Vite requires the glob pattern to be a string literal
    const modules = import.meta.glob<{ frontmatter: BlogFrontmatter }>(
      "/content/blog/*.mdx",
      { eager: false },
    );

    const posts: BlogPostMetadata[] = [];

    for (const path in modules) {
      try {
        const module = await modules[path]();

        // Extract slug from file path
        const slug = path.replace("/content/blog/", "").replace(".mdx", "");

        // Validate frontmatter structure
        if (!module.frontmatter || !isValidFrontmatter(module.frontmatter)) {
          console.error(`Invalid frontmatter in ${path}`, module.frontmatter);
          continue;
        }

        posts.push({
          slug,
          frontmatter: module.frontmatter,
        });
      } catch (error) {
        console.error(`Error loading blog post from ${path}:`, error);
      }
    }

    // Sort by date, newest first
    return posts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

/**
 * Loads a single blog post by slug
 * Returns the frontmatter and the MDX content as a React component
 */
export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const path = `/content/blog/${slug}.mdx`;
    const modules = import.meta.glob<{
      default: React.ComponentType;
      frontmatter: BlogFrontmatter;
    }>("/content/blog/*.mdx");

    const loader = modules[path];
    if (!loader) {
      console.error(`Blog post not found: ${slug}`);
      return null;
    }

    const module = await loader();

    if (!module.frontmatter || !isValidFrontmatter(module.frontmatter)) {
      console.error(`Invalid frontmatter in ${slug}`, module.frontmatter);
      return null;
    }

    return {
      slug,
      frontmatter: module.frontmatter,
      content: module.default,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Type guard to validate frontmatter structure
 */
function isValidFrontmatter(data: unknown): data is BlogFrontmatter {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const fm = data as Record<string, unknown>;

  return (
    typeof fm.title === "string" &&
    typeof fm.date === "string" &&
    typeof fm.description === "string" &&
    Array.isArray(fm.tags) &&
    fm.tags.every((tag: unknown) => typeof tag === "string") &&
    typeof fm.author === "string"
  );
}
