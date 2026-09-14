import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getItemsByTag } from "@/lib/tags";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return { title: `#${tag} — Duo Li` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const items = getItemsByTag(tag);

  if (items.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">#{tag}</h1>

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
