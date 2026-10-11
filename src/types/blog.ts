export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: React.ComponentType;
}

export interface BlogPostMetadata {
  slug: string;
  frontmatter: BlogFrontmatter;
}
