import { useEffect, useState } from "react";
import { loadBlogPosts } from "../utils/mdxLoader";
import { BlogPostMetadata } from "../types/blog";
import { BlogListItem } from "./BlogListItem";

interface BlogListProps {
  onPostSelect: (slug: string) => void;
}

/**
 * Blog list section component
 * Displays chronological list of blog posts sorted by date (newest first)
 * Includes loading spinner and error message handling
 */
export function BlogList({ onPostSelect }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogPosts()
      .then((loadedPosts) => {
        setPosts(loadedPosts);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Failed to load blog posts",
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            Error Loading Posts
          </h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-text-secondary text-lg">
            No blog posts found yet.
          </p>
          <p className="text-text-secondary text-sm mt-2">
            Check back soon for new content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      {posts.map((post) => (
        <BlogListItem key={post.slug} post={post} onPostClick={onPostSelect} />
      ))}
    </div>
  );
}
