import { notFound } from "next/navigation";
import Link from "next/link";
import { Prose } from "@/components/Prose";
import { getAllKnowledge, getKnowledgeBySlug } from "@/lib/knowledge";

export function generateStaticParams() {
  return getAllKnowledge().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getKnowledgeBySlug(slug);
  return { title: entry ? `${entry.title} — Duo Li` : "Knowledge" };
}

export default async function KnowledgeEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getKnowledgeBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm uppercase tracking-wide text-zinc-500">{entry.category}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{entry.title}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">{entry.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
          {entry.kind}
        </span>
        {entry.lens && (
          <span className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
            lens: {entry.lens}
          </span>
        )}
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

      <Prose source={entry.content} className="mt-10" />
    </article>
  );
}
