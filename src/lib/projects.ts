import { readMdxCollection } from "./mdx-collection";

export type ProjectStatus = "active" | "paused" | "archived";

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  status: ProjectStatus;
  technologies: string[];
  summary: string;
  repository?: string;
  demoUrl?: string;
  order?: number;
}

export interface ProjectEntry extends ProjectFrontmatter {
  content: string;
}

export function getAllProjects(): ProjectEntry[] {
  return readMdxCollection<ProjectFrontmatter>("projects").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
}

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

