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

  // group by the site's known category order first, then any custom categories found in content
  const usedCategories = [
    ...knowledgeCategories.filter((c) => entries.some((e) => e.category === c)),
    ...[...new Set(entries.map((e) => e.category))].filter((c) => !knowledgeCategories.includes(c)),
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Knowledge</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Structured, evergreen technical knowledge base.
      </p>

      {usedCategories.map((category) => (
        <section key={category} className="mt-12 first:mt-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {category}
          </h2>
          <ul className="space-y-8">
            {entries
              .filter((entry) => entry.category === category)
              .map((entry) => (
                <li key={entry.slug} className="border-b border-black/[.06] pb-8 dark:border-white/[.08]">
                  <div className="flex items-center gap-2">
                    <Link href={`/knowledge/${entry.slug}`} className="text-lg font-medium hover:text-accent">
                      {entry.title}
                    </Link>
                    <span className="rounded-full bg-black/[.05] px-2 py-0.5 text-xs text-zinc-500 dark:bg-white/[.08] dark:text-zinc-400">
                      {entry.kind}
                    </span>
                  </div>
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
        </section>
      ))}
    </div>
  );
}

