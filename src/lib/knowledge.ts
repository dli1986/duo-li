import { readMdxCollection } from "./mdx-collection";

export type KnowledgeKind = "concept" | "entity" | "example" | "synthesis" | "article";
export type KnowledgeSourceType = "pkg-wiki" | "capture" | "pkg-legacy" | "manual";

export interface KnowledgeFrontmatter {
  title: string;
  slug: string;
  category: string;
  kind: KnowledgeKind;
  sourceType?: KnowledgeSourceType;
  lens?: string; // only meaningful when kind === "example" (capture-skill domain lens)
  tags: string[];
  summary: string;
  createdAt: string;
  updatedAt?: string;
  layout?: "wide"; // opt-in wider article container for entries with embedded nested/grid visualizations
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
