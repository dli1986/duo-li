import { notFound } from "next/navigation";
import Link from "next/link";
import { Prose } from "@/components/Prose";
import { getAllMusic, getMusicBySlug } from "@/lib/music";

export function generateStaticParams() {
  return getAllMusic().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getMusicBySlug(slug);
  return { title: entry ? `${entry.title} — Duo Li` : "Music" };
}

export default async function MusicEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getMusicBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{entry.title}</h1>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">
        {entry.artist}
        {entry.album && ` · ${entry.album}`}
        {entry.year && ` · ${entry.year}`}
      </p>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
        {entry.composer && (
          <>
            <dt className="text-zinc-500">Composer</dt>
            <dd>{entry.composer}</dd>
          </>
        )}
        {entry.lyricist && (
          <>
            <dt className="text-zinc-500">Lyricist</dt>
            <dd>{entry.lyricist}</dd>
          </>
        )}
        {entry.arranger && (
          <>
            <dt className="text-zinc-500">Arranger</dt>
            <dd>{entry.arranger}</dd>
          </>
        )}
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
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

      {entry.musicbrainzUrl && (
        <a
          href={entry.musicbrainzUrl}
          className="mt-4 inline-block text-sm text-accent hover:underline"
        >
          View on MusicBrainz &rarr;
        </a>
      )}

      <Prose source={entry.content} className="mt-10" />
    </article>
  );
}
