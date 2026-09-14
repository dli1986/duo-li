import { getAllKnowledge } from "./knowledge";
import { getAllNotes } from "./notes";
import { getAllReading } from "./reading";

export type TaggedKind = "knowledge" | "note" | "reading";

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

  return [...knowledge, ...notes, ...reading];
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const item of collectTaggedItems()) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getItemsByTag(tag: string): TaggedItem[] {
  return collectTaggedItems().filter((item) => item.tags.includes(tag));
}
