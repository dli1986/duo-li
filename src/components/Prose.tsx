import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Static-site walkthroughs (nanoGPT/llama2c) and true external links are full page
// navigations that leave the Next.js app shell — open them in a new tab so the
// persistent header/music bar in the current tab isn't interrupted.
function isNewTabLink(href?: string) {
  if (!href) return false;
  return /^https?:\/\//.test(href) || href.startsWith("/nanogpt-learning") || href.startsWith("/llama2c-learning");
}

function ProseLink({ href, ...rest }: React.ComponentProps<"a">) {
  const newTab = isNewTabLink(href);
  return <a href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined} {...rest} />;
}

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
        components={{ a: ProseLink }}
      />
    </div>
  );
}
