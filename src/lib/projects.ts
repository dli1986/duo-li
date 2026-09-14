import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectStatus = "active" | "paused" | "archived";

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  status: ProjectStatus;
  technologies: string[];
  summary: string;
  repository?: string;
  order?: number;
}

export interface ProjectEntry extends ProjectFrontmatter {
  content: string;
}

export function getAllProjects(): ProjectEntry[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as ProjectFrontmatter), content };
  });

  return projects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
