import matter from "gray-matter";
import { BlogFrontmatter, BlogPostMetadata } from "../types/blog";

/**
 * Loads all MDX blog posts from the content/blog directory
 * Returns metadata for all posts (slug + frontmatter)
 */
export async function loadBlogPosts(): Promise<BlogPostMetadata[]> {
  try {
    // Use Vite's glob import to load all MDX files
    const modules = import.meta.glob("/content/blog/*.mdx", {
      query: "?raw",
      import: "default",
    });

    const posts: BlogPostMetadata[] = [];

    for (const path in modules) {
      try {
        const content = (await modules[path]()) as string;
        const { data } = matter(content);

        // Extract slug from file path
        const slug = path.replace("/content/blog/", "").replace(".mdx", "");

        // Validate frontmatter structure
        if (!isValidFrontmatter(data)) {
          console.error(`Invalid frontmatter in ${path}`, data);
          continue;
        }

        posts.push({
          slug,
          frontmatter: data as BlogFrontmatter,
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
 */
export async function loadBlogPost(
  slug: string,
): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  try {
    const path = `/content/blog/${slug}.mdx`;
    const module = import.meta.glob("/content/blog/*.mdx", {
      query: "?raw",
      import: "default",
    });

    const loader = module[path];
    if (!loader) {
      console.error(`Blog post not found: ${slug}`);
      return null;
    }

    const content = (await loader()) as string;
    const { data, content: mdxContent } = matter(content);

    if (!isValidFrontmatter(data)) {
      console.error(`Invalid frontmatter in ${slug}`, data);
      return null;
    }

    return {
      frontmatter: data as BlogFrontmatter,
      content: mdxContent,
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
