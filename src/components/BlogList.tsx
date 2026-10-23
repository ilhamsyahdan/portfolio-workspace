import { useEffect, useState } from "react";
import { loadBlogPosts } from "../utils/mdxLoader";
import type { BlogPostMetadata } from "../types/blog";
import { BlogListItem } from "./BlogListItem";

interface BlogListProps {
  onPostSelect: (slug: string) => void;
}

const SKELETON_ROWS: readonly number[] = [0, 1, 2];

function LoadingState() {
  return (
    <div role="status" aria-label="Loading blog posts" className="grid gap-4">
      {SKELETON_ROWS.map((row) => (
        <div
          key={row}
          className="animate-pulse rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
        >
          <div className="h-3 w-28 rounded-full bg-white/10" />
          <div className="mt-5 h-6 w-2/3 rounded-full bg-white/10" />
          <div className="mt-4 h-3 w-full rounded-full bg-white/5" />
          <div className="mt-2 h-3 w-4/5 rounded-full bg-white/5" />
        </div>
      ))}
      <span className="sr-only">Loading blog posts...</span>
    </div>
  );
}

interface MessageStateProps {
  title: string;
  message: string;
  tone?: "neutral" | "error";
}

function MessageState({ title, message, tone = "neutral" }: MessageStateProps) {
  const isError = tone === "error";
  return (
    <div
      role={isError ? "alert" : undefined}
      className={`rounded-3xl border px-6 py-14 text-center backdrop-blur-sm ${
        isError
          ? "border-red-400/20 bg-red-500/5"
          : "border-dashed border-white/10 bg-white/[0.02]"
      }`}
    >
      <h3
        className={`text-lg font-semibold ${
          isError ? "text-red-300" : "text-white"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mx-auto mt-2 max-w-md text-sm ${
          isError ? "text-red-300/80" : "text-slate-400"
        }`}
      >
        {message}
      </p>
    </div>
  );
}

/**
 * Chronological list of blog posts (newest first) with
 * skeleton, error and empty states.
 */
export function BlogList({ onPostSelect }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    loadBlogPosts()
      .then((loadedPosts) => {
        if (!active) return;
        setPosts(loadedPosts);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Failed to load blog posts",
        );
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <MessageState tone="error" title="Couldn't load posts" message={error} />
    );
  }

  if (posts.length === 0) {
    return (
      <MessageState
        title="No posts yet"
        message="Nothing has been published here yet. Check back soon."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <BlogListItem key={post.slug} post={post} onPostClick={onPostSelect} />
      ))}
    </div>
  );
}
