import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects — Duo Li",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Long-term project archive.
      </p>

      <ul className="mt-10 space-y-8">
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-black/[.06] pb-8 dark:border-white/[.08]">
            <Link href={`/projects/${project.slug}`} className="text-lg font-medium hover:text-accent">
              {project.title}
            </Link>
            <p className="mt-1 text-sm uppercase tracking-wide text-zinc-500">
              {project.status}
            </p>
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
      </ul>
    </div>
  );
}
