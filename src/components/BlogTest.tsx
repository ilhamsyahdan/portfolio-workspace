import { useEffect, useState } from "react";
import { loadBlogPosts } from "../utils/mdxLoader";
import { BlogPostMetadata } from "../types/blog";

/**
 * Test component to verify MDX infrastructure works
 * This can be imported in App.tsx to test the blog loading
 */
export function BlogTest() {
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
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Blog Posts ({posts.length})</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.slug} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{post.frontmatter.title}</h3>
            <p className="text-gray-600">{post.frontmatter.date}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
}
