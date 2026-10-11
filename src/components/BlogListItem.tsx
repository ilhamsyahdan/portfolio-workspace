import { BlogPostMetadata } from "../types/blog";

interface BlogListItemProps {
  post: BlogPostMetadata;
  onPostClick: (slug: string) => void;
}

/**
 * Individual blog post list item
 * Displays post title, date, and description with click handler to view full post
 */
export function BlogListItem({ post, onPostClick }: BlogListItemProps) {
  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article
      onClick={() => onPostClick(post.slug)}
      className="group cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all duration-200"
    >
      <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent transition-colors duration-200 mb-2">
        {post.frontmatter.title}
      </h3>
      <time className="text-sm text-text-secondary mb-3 block">
        {formattedDate}
      </time>
      <p className="text-text-secondary leading-relaxed">
        {post.frontmatter.description}
      </p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {post.frontmatter.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-accent/10 text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
