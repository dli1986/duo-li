import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** Shared MDX renderer with GFM tables + KaTeX math support, used by Projects/Knowledge/Reading/Notes. */
export function Prose({ source, className = "" }: { source: string; className?: string }) {
  return (
    <div className={`prose prose-zinc max-w-none dark:prose-invert ${className}`}>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        }}
      />
    </div>
  );
}
