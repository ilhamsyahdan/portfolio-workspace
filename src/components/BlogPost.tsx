import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { MDXProvider } from "@mdx-js/react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { BlogPost as BlogPostType } from "../types/blog";
import { loadBlogPost } from "../utils/mdxLoader";
import { formatDate } from "../utils/formatDate";
import { mdxComponents } from "./mdx/MDXComponents";
import { Badge } from "./Badge";

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/* Requires @tailwindcss/typography for the `prose` utilities. */
const PROSE_CLASSES = [
  "prose prose-lg prose-invert max-w-none",
  "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white",
  "prose-p:text-slate-300 prose-li:text-slate-300",
  "prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline",
  "prose-strong:text-white",
  "prose-code:text-cyan-300 prose-code:before:content-none prose-code:after:content-none",
  "prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-slate-900/80",
  "prose-blockquote:border-cyan-400/40 prose-blockquote:text-slate-300",
  "prose-hr:border-white/10",
].join(" ");

interface BackButtonProps {
  onBack: () => void;
}

function BackButton({ onBack }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      className={`group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10 ${focusRing}`}
    >
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      >
        ←
      </span>
      Back to blog
    </button>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4">
      {children}
    </div>
  );
}

export function BlogPost({ slug, onBack }: BlogPostProps) {
  const reduceMotion = useReducedMotion();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Reading progress bar (hooks must run before any early return)
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    let mounted = true;

    async function loadPost(): Promise<void> {
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
        if (mounted) setLoading(false);
      }
    }

    void loadPost();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <PageShell>
        <div
          role="status"
          className="flex items-center gap-3 text-sm text-slate-400"
        >
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent motion-reduce:animate-none" />
          Loading post...
        </div>
      </PageShell>
    );
  }

  if (error || !post) {
    return (
      <PageShell>
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm">
          <h1 className="text-xl font-semibold text-white">
            {error ?? "Post not found"}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            The post you&apos;re looking for couldn&apos;t be loaded.
          </p>
          <div className="mt-6">
            <BackButton onBack={onBack} />
          </div>
        </div>
      </PageShell>
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

      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{
          scaleX: reduceMotion ? scrollYProgress : smoothProgress,
          transformOrigin: "0% 50%",
        }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-cyan-400 to-sky-500"
      />

      <article className="relative isolate min-h-screen overflow-hidden bg-slate-950 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-3xl">
          <BackButton onBack={onBack} />

          {/* Header */}
          <header className="mt-10 border-b border-white/10 pb-10">
            <Badge>Article</Badge>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
              {frontmatter.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              {frontmatter.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-cyan-600 text-xs font-bold text-slate-950"
                >
                  {frontmatter.author.charAt(0).toUpperCase()}
                </span>
                <span className="font-medium text-slate-200">
                  {frontmatter.author}
                </span>
              </span>
              <span aria-hidden className="text-slate-600">
                •
              </span>
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
            </div>

            {frontmatter.tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          {/* Content */}
          <div className={`mt-12 ${PROSE_CLASSES}`}>
            <MDXProvider components={mdxComponents}>
              <Content />
            </MDXProvider>
          </div>

          {/* Footer */}
          <footer className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
            <BackButton onBack={onBack} />
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reduceMotion ? "auto" : "smooth",
                })
              }
              className={`rounded-full px-3 py-2 text-sm text-slate-400 transition-colors hover:text-white ${focusRing}`}
            >
              Back to top ↑
            </button>
          </footer>
        </div>
      </article>
    </>
  );
}
