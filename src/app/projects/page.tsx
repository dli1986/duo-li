import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects — Duo Li",
};

function formatMonthYear(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Long-term project archive, newest first.
      </p>

      <ol className="mt-10 border-l border-black/[.08] pl-6 dark:border-white/[.12]">
        {projects.map((project) => (
          <li key={project.slug} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[calc(1.5rem+4px)] top-1.5 h-2 w-2 rounded-full bg-accent" />
            <time className="text-sm text-zinc-500">{formatMonthYear(project.startDate)}</time>
            <Link href={`/projects/${project.slug}`} className="mt-1 block text-lg font-medium hover:text-accent">
              {project.title}
            </Link>
            <p className="text-sm uppercase tracking-wide text-zinc-500">{project.status}</p>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{project.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
