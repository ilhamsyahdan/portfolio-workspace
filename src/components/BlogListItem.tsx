import { motion, useReducedMotion } from "framer-motion";
import type { BlogPostMetadata } from "../types/blog";
import { formatDate } from "../utils/formatDate";

interface BlogListItemProps {
  post: BlogPostMetadata;
  onPostClick: (slug: string) => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12L12 4M6 4h6v6" />
    </svg>
  );
}

/**
 * A single blog row. The title is a real link stretched over the whole card,
 * so the entire card is clickable and keyboard accessible.
 */
export function BlogListItem({ post, onPostClick }: BlogListItemProps) {
  const reduceMotion = useReducedMotion();
  const { title, date, description, tags } = post.frontmatter;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -48px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05] md:flex-row md:gap-10 md:p-8"
    >
      <time
        dateTime={date}
        className="shrink-0 text-sm text-slate-500 md:w-36 md:pt-1.5"
      >
        {formatDate(date)}
      </time>

      <div className="min-w-0 flex-1 pr-8">
        <h3 className="text-xl font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-300 md:text-2xl">
          <a
            href={`#blog/${post.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onPostClick(post.slug);
            }}
            className={`rounded-md after:absolute after:inset-0 after:rounded-3xl ${focusRing}`}
          >
            {title}
          </a>
        </h3>

        <p className="mt-2 max-w-3xl leading-relaxed text-slate-400">
          {description}
        </p>

        {tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <span
        aria-hidden
        className="absolute right-6 top-6 text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300 md:right-8 md:top-8"
      >
        <ArrowIcon />
      </span>
    </motion.article>
  );
}
