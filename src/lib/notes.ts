import { readMdxCollection } from "./mdx-collection";

export interface NoteFrontmatter {
  slug: string;
  title?: string;
  tags: string[];
  timestamp: string;
}

export interface NoteEntry extends NoteFrontmatter {
  content: string;
}

export function getAllNotes(): NoteEntry[] {
  return readMdxCollection<NoteFrontmatter>("notes").sort(
    (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)
  );
}

export function getNoteBySlug(slug: string): NoteEntry | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}
