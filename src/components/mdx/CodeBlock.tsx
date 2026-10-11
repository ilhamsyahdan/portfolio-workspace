import { ReactNode } from "react";

interface CodeBlockProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Custom code block component for MDX
 * Works with rehype-highlight to provide syntax highlighting
 */
export function CodeBlock({
  children,
  className,
  ...props
}: CodeBlockProps & React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={`${className || ""} rounded-lg overflow-x-auto my-4 bg-gray-900 text-white p-4`}
      {...props}
    >
      {children}
    </pre>
  );
}
