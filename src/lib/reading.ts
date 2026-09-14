import { readMdxCollection } from "./mdx-collection";

export interface ReadingFrontmatter {
  slug: string;
  bookTitle: string;
  author: string;
  dateFinished: string;
  rating?: number;
  tags: string[];
  summary: string;
}

export interface ReadingEntry extends ReadingFrontmatter {
  content: string;
}

export function getAllReading(): ReadingEntry[] {
  return readMdxCollection<ReadingFrontmatter>("reading").sort(
    (a, b) => +new Date(b.dateFinished) - +new Date(a.dateFinished)
  );
}

export function getReadingBySlug(slug: string): ReadingEntry | undefined {
  return getAllReading().find((r) => r.slug === slug);
}
