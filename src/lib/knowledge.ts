import { readMdxCollection } from "./mdx-collection";

export interface KnowledgeFrontmatter {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  createdAt: string;
  updatedAt?: string;
}

export interface KnowledgeEntry extends KnowledgeFrontmatter {
  content: string;
}

export function getAllKnowledge(): KnowledgeEntry[] {
  return readMdxCollection<KnowledgeFrontmatter>("knowledge").sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
}

export function getKnowledgeBySlug(slug: string): KnowledgeEntry | undefined {
  return getAllKnowledge().find((k) => k.slug === slug);
}
