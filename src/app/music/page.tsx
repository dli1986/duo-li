import Link from "next/link";
import { ComingSoon } from "@/components/ComingSoon";
import { getAllMusic } from "@/lib/music";
import { musicCategories } from "@/lib/site";
import { slugifyTag } from "@/lib/tags";

export const metadata = { title: "Music — Duo Li" };

export default function MusicPage() {
  const entries = getAllMusic();

  if (entries.length === 0) {
    return (
      <ComingSoon
        title="Music"
        description="Personal music archive with metadata, notes and lightweight playback."
        categories={musicCategories}
        phase="Phase 4 — Music Archive"
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Music</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Personal music archive — metadata, notes and favorites.
      </p>

      <ul className="mt-10 space-y-8">
        {entries.map((entry) => (
          <li key={entry.slug} className="border-b border-black/[.06] pb-8 dark:border-white/[.08]">
            <Link href={`/music/${entry.slug}`} className="text-lg font-medium hover:text-accent">
              {entry.title}
            </Link>
            <p className="text-sm text-zinc-500">
              {entry.artist}
              {entry.album && ` · ${entry.album}`}
              {entry.year && ` · ${entry.year}`}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugifyTag(tag)}`}
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
