import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { Section } from "@/components/Section";
import { currentFocus, siteConfig } from "@/lib/site";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="py-16">
        <h1 className="text-3xl font-semibold tracking-tight">{siteConfig.name}</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          {siteConfig.role}
        </p>
        <p className="mt-1 text-sm text-accent">{siteConfig.tagline}</p>
      </section>

      <Section title="Current Focus">
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
          {currentFocus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Featured Projects">
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="font-medium hover:text-accent"
              >
                {project.title}
              </Link>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {project.summary}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Photography">
        <p className="text-zinc-600 dark:text-zinc-400">
          Gallery coming soon.{" "}
          <Link href="/photography" className="hover:text-accent">
            Preview categories &rarr;
          </Link>
        </p>
      </Section>

      <Section title="Now Playing">
        <p className="text-zinc-600 dark:text-zinc-400">
          Music archive coming soon.{" "}
          <Link href="/music" className="hover:text-accent">
            Preview categories &rarr;
          </Link>
        </p>
      </Section>

      <Section title="Recent Notes">
        <p className="text-zinc-600 dark:text-zinc-400">
          No notes published yet.{" "}
          <Link href="/notes" className="hover:text-accent">
            Visit notes &rarr;
          </Link>
        </p>
      </Section>

      <Section title="Recent Reading">
        <p className="text-zinc-600 dark:text-zinc-400">
          No reading entries yet.{" "}
          <Link href="/reading" className="hover:text-accent">
            Visit reading log &rarr;
          </Link>
        </p>
      </Section>
    </div>
  );
}
