import { useEffect, useState } from "react";
import { loadBlogPosts, loadBlogPost } from "../utils/mdxLoader";
import { BlogPostMetadata, BlogPost } from "../types/blog";

/**
 * Test component to verify MDX infrastructure works end-to-end
 * Demonstrates that MDX files can be loaded, parsed, and rendered as React components
 */
export function BlogTest() {
  const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogPosts()
      .then((loadedPosts) => {
        setPosts(loadedPosts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleLoadPost = async (slug: string) => {
    try {
      const post = await loadBlogPost(slug);
      setSelectedPost(post);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load post");
    }
  };

  if (loading) {
    return <div className="p-4">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className="p-4">No blog posts found.</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">MDX Blog Infrastructure Test</h2>

      {/* List of posts */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          Available Posts ({posts.length})
        </h3>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.slug} className="border p-4 rounded">
              <h4 className="text-lg font-semibold">
                {post.frontmatter.title}
              </h4>
              <p className="text-gray-600 text-sm">{post.frontmatter.date}</p>
              <p className="mt-2">{post.frontmatter.description}</p>
              <div className="mt-2 flex gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                By {post.frontmatter.author}
              </p>
              <button
                onClick={() => handleLoadPost(post.slug)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Load & Render MDX
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rendered MDX content */}
      {selectedPost && (
        <div className="border-t pt-8">
          <h3 className="text-xl font-semibold mb-4">
            Rendered MDX Component: {selectedPost.frontmatter.title}
          </h3>
          <div className="prose max-w-none">
            <selectedPost.content />
          </div>
        </div>
      )}
    </div>
  );
}
