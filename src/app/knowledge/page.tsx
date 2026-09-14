import Link from "next/link";
import { ComingSoon } from "@/components/ComingSoon";
import { getAllKnowledge } from "@/lib/knowledge";
import { knowledgeCategories } from "@/lib/site";

export const metadata = { title: "Knowledge — Duo Li" };

export default function KnowledgePage() {
  const entries = getAllKnowledge();

  if (entries.length === 0) {
    return (
      <ComingSoon
        title="Knowledge"
        description="Structured, evergreen technical knowledge base."
        categories={knowledgeCategories}
        phase="Phase 2 — Knowledge System"
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Knowledge</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Structured, evergreen technical knowledge base.
      </p>

      <ul className="mt-10 space-y-8">
        {entries.map((entry) => (
          <li key={entry.slug} className="border-b border-black/[.06] pb-8 dark:border-white/[.08]">
            <p className="text-sm uppercase tracking-wide text-zinc-500">{entry.category}</p>
            <Link href={`/knowledge/${entry.slug}`} className="text-lg font-medium hover:text-accent">
              {entry.title}
            </Link>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{entry.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 hover:text-accent dark:bg-white/[.08] dark:text-zinc-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
