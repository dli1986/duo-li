import { getAllKnowledge } from "./knowledge";
import { getAllMusic } from "./music";
import { getAllNotes } from "./notes";
import { getAllPhotos } from "./photos";
import { getAllReading } from "./reading";
import { slugifyTag } from "./slugify-tag";

export { slugifyTag } from "./slugify-tag";

export type TaggedKind = "knowledge" | "note" | "reading" | "music" | "photo";

export interface TaggedItem {
  kind: TaggedKind;
  title: string;
  href: string;
  tags: string[];
}

function collectTaggedItems(): TaggedItem[] {
  const knowledge: TaggedItem[] = getAllKnowledge().map((k) => ({
    kind: "knowledge",
    title: k.title,
    href: `/knowledge/${k.slug}`,
    tags: k.tags,
  }));

  const notes: TaggedItem[] = getAllNotes().map((n) => ({
    kind: "note",
    title: n.title ?? n.content.slice(0, 60),
    href: `/notes#${n.slug}`,
    tags: n.tags,
  }));

  const reading: TaggedItem[] = getAllReading().map((r) => ({
    kind: "reading",
    title: r.bookTitle,
    href: `/reading/${r.slug}`,
    tags: r.tags,
  }));

  const music: TaggedItem[] = getAllMusic().map((m) => ({
    kind: "music",
    title: m.title,
    href: `/music/${m.slug}`,
    tags: m.tags,
  }));

  const photos: TaggedItem[] = getAllPhotos().map((p) => ({
    kind: "photo",
    title: p.title,
    href: `/photography/${p.slug}`,
    tags: p.tags,
  }));

  return [...knowledge, ...notes, ...reading, ...music, ...photos];
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  // Keyed by slug so two different-looking tags that happen to slugify the
  // same are merged (rare with this tag set, but safe either way) — display
  // text is whichever original tag string was seen first.
  const bySlug = new Map<string, { tag: string; count: number }>();

  for (const item of collectTaggedItems()) {
    for (const tag of item.tags) {
      const slug = slugifyTag(tag);
      const existing = bySlug.get(slug);
      bySlug.set(slug, { tag: existing?.tag ?? tag, count: (existing?.count ?? 0) + 1 });
    }
  }

  return [...bySlug.entries()]
    .map(([slug, { tag, count }]) => ({ tag, slug, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTagBySlug(slug: string): string | undefined {
  return getAllTags().find((t) => t.slug === slug)?.tag;
}

export function getItemsByTag(slug: string): TaggedItem[] {
  return collectTaggedItems().filter((item) => item.tags.some((tag) => slugifyTag(tag) === slug));
}

