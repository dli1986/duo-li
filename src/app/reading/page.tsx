import Link from "next/link";
import { ComingSoon } from "@/components/ComingSoon";
import { getAllReading } from "@/lib/reading";
import { readingCategories } from "@/lib/site";

export const metadata = { title: "Reading — Duo Li" };

export default function ReadingPage() {
  const entries = getAllReading();

  if (entries.length === 0) {
    return (
      <ComingSoon
        title="Reading"
        description="Reading journal: books, summaries, key insights and personal reflections."
        categories={readingCategories}
        phase="Phase 2 — Knowledge System"
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Reading</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Books and reflections.</p>

      <ul className="mt-10 space-y-8">
        {entries.map((entry) => (
          <li key={entry.slug} className="border-b border-black/[.06] pb-8 dark:border-white/[.08]">
            <Link href={`/reading/${entry.slug}`} className="text-lg font-medium hover:text-accent">
              {entry.bookTitle}
            </Link>
            <p className="text-sm text-zinc-500">{entry.author}</p>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{entry.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
