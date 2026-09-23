import Link from "next/link";
import { getAllTags } from "@/lib/tags";

export const metadata = { title: "Tags — Duo Li" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Tags</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Browse Knowledge, Notes and Reading entries by tag.
      </p>

      {tags.length === 0 ? (
        <p className="mt-10 text-sm text-zinc-500">No tagged content yet.</p>
      ) : (
        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded-full bg-black/[.05] px-3 py-1 text-sm text-zinc-600 hover:text-accent dark:bg-white/[.08] dark:text-zinc-300"
            >
              {tag} <span className="text-zinc-400">({count})</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
