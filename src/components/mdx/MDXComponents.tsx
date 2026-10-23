import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";

export const mdxComponents: MDXComponents = {
  Callout,
  pre: (props) => <CodeBlock {...props} />,
};
