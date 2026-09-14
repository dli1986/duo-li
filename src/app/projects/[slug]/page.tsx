import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.title} — Duo Li` : "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm uppercase tracking-wide text-zinc-500">{project.status}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.repository && (
        <a
          href={project.repository}
          className="mt-4 inline-block text-sm text-accent hover:underline"
        >
          View repository &rarr;
        </a>
      )}

      {project.demoUrl && (
        <a
          href={project.demoUrl}
          className="mt-4 ml-4 inline-block text-sm text-accent hover:underline"
        >
          View live walkthrough &rarr;
        </a>
      )}

      <div className="prose prose-zinc mt-10 max-w-none dark:prose-invert">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}
