import { notFound } from "next/navigation";
import Link from "next/link";
import { Prose } from "@/components/Prose";
import { getAllReading, getReadingBySlug } from "@/lib/reading";
import { slugifyTag } from "@/lib/tags";

export function generateStaticParams() {
  return getAllReading().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getReadingBySlug(slug);
  return { title: entry ? `${entry.bookTitle} — Duo Li` : "Reading" };
}

export default async function ReadingEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getReadingBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{entry.bookTitle}</h1>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">{entry.author}</p>
      {entry.rating && <p className="mt-1 text-sm text-zinc-500">Rating: {entry.rating}/5</p>}
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">{entry.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
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

      <Prose source={entry.content} className="mt-10" />
    </article>
  );
}
