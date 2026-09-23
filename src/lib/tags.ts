import { getAllKnowledge } from "./knowledge";
import { getAllMusic } from "./music";
import { getAllNotes } from "./notes";
import { getAllReading } from "./reading";

export type TaggedKind = "knowledge" | "note" | "reading" | "music";

export interface TaggedItem {
  kind: TaggedKind;
  title: string;
  href: string;
  tags: string[];
}

// Tag text can contain characters that break as a URL path segment on Vercel's
// static hosting specifically: "+"/space have legacy form-encoding ambiguity
// even when percent-encoded, and (confirmed by testing) non-ASCII segments
// (e.g. CJK tags like "国语") 404 on Vercel's prerendered static routes even
// though they build fine locally and percent-encode unambiguously per spec.
// Routing by a guaranteed-pure-ASCII slug sidesteps both problems.
const SYMBOL_WORDS: Record<string, string> = { "+": "p", "#": "sharp", "&": "and" };

export function slugifyTag(tag: string): string {
  const substituted = tag.replace(/[+#&]/g, (ch) => SYMBOL_WORDS[ch] ?? "");
  const asciiSlug = substituted
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  if (asciiSlug) return asciiSlug;

  // Nothing ASCII survived (e.g. a pure-CJK tag) — fall back to a hex-encoded
  // UTF-8 byte string. Not pretty, but guaranteed to be a plain ASCII segment.
  return Buffer.from(tag, "utf8").toString("hex");
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

  return [...knowledge, ...notes, ...reading, ...music];
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

