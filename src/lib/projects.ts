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
  /** Optional — if omitted and `repository` is a github.com URL, auto-filled from the repo's creation date at build time. */
  startDate?: string;
}

export interface ProjectEntry extends ProjectFrontmatter {
  content: string;
  startDate: string;
}

function parseGithubRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)\/?$/);
  return match ? { owner: match[1], repo: match[2] } : null;
}

async function fetchGithubCreatedAt(repoUrl: string): Promise<string | null> {
  const parsed = parseGithubRepo(repoUrl);
  if (!parsed) return null;

  try {
    const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.created_at === "string" ? data.created_at : null;
  } catch {
    return null;
  }
}

export async function getAllProjects(): Promise<ProjectEntry[]> {
  const raw = readMdxCollection<ProjectFrontmatter>("projects");

  const resolved = await Promise.all(
    raw.map(async (project) => {
      if (project.startDate) return project as ProjectEntry;

      const fetched = project.repository ? await fetchGithubCreatedAt(project.repository) : null;
      if (!fetched) {
        console.warn(`[projects] no startDate for "${project.slug}" and GitHub lookup failed — sorting it last`);
      }
      return { ...project, startDate: fetched ?? new Date(0).toISOString() };
    })
  );

  return resolved.sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate));
}

export async function getProjectBySlug(slug: string): Promise<ProjectEntry | undefined> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug);
}


