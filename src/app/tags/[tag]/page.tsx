import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getItemsByTag, getTagBySlug } from "@/lib/tags";

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: slug } = await params;
  return { title: `#${getTagBySlug(slug) ?? slug} — Duo Li` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: slug } = await params;
  const items = getItemsByTag(slug);
  const displayTag = getTagBySlug(slug);

  if (items.length === 0 || !displayTag) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">#{displayTag}</h1>

      <ul className="mt-10 space-y-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="font-medium hover:text-accent">
              {item.title}
            </Link>
            <span className="ml-2 text-xs uppercase tracking-wide text-zinc-500">
              {item.kind}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
