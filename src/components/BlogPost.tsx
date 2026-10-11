import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MDXProvider } from "@mdx-js/react";
import { BlogPost as BlogPostType } from "../types/blog";
import { loadBlogPost } from "../utils/mdxLoader";
import { mdxComponents } from "./mdx/MDXComponents";

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

export function BlogPost({ slug, onBack }: BlogPostProps) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadPost() {
      try {
        setLoading(true);
        setError(null);
        const loadedPost = await loadBlogPost(slug);

        if (!mounted) return;

        if (!loadedPost) {
          setError("Post not found");
          return;
        }

        setPost(loadedPost);
      } catch (err) {
        if (!mounted) return;
        setError("Failed to load post");
        console.error("Error loading post:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">
            {error || "Post not found"}
          </p>
          <button
            onClick={onBack}
            className="text-accent hover:text-accent-hover transition-colors"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const { frontmatter, content: Content } = post;

  return (
    <>
      <Helmet>
        <title>{frontmatter.title} | Portfolio</title>
        <meta name="description" content={frontmatter.description} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={frontmatter.date} />
        <meta property="article:author" content={frontmatter.author} />
        {frontmatter.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
      </Helmet>

      <article className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="text-accent hover:text-accent-hover transition-colors mb-8 flex items-center gap-2 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Back to Blog
          </button>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm">
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{frontmatter.author}</span>
            </div>

            {frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <MDXProvider components={mdxComponents}>
              <Content />
            </MDXProvider>
          </div>
        </div>
      </article>
    </>
  );
}
