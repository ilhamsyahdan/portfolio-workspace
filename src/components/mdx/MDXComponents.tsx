import { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";

/**
 * Custom components to be used in MDX content
 * These override default HTML elements and add custom components
 */
export const mdxComponents: MDXComponents = {
  // Custom components
  Callout,

  // Override default pre/code for better styling
  pre: (props) => <CodeBlock {...props} />,

  // Override other HTML elements for better typography
  h1: (props) => (
    <h1
      className="text-4xl font-bold text-text-primary mt-8 mb-4 first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2 className="text-3xl font-bold text-text-primary mt-8 mb-4" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-2xl font-bold text-text-primary mt-6 mb-3" {...props} />
  ),
  p: (props) => (
    <p className="text-text-secondary mb-4 leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul
      className="list-disc list-inside text-text-secondary mb-4 space-y-2"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside text-text-secondary mb-4 space-y-2"
      {...props}
    />
  ),
  li: (props) => <li className="ml-4" {...props} />,
  a: (props) => (
    <a
      className="text-accent hover:text-accent-hover underline transition-colors"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-accent pl-4 py-2 my-4 italic text-text-secondary"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-gray-100 text-accent px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
};
