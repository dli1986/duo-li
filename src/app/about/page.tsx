import { aboutBio, siteConfig } from "@/lib/site";

export const metadata = { title: "About — Duo Li" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{siteConfig.name}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{aboutBio.intro}</p>

      <div className="mt-8">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Interests
        </h2>
        <div className="flex flex-wrap gap-2">
          {aboutBio.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-10 text-zinc-700 dark:text-zinc-300">{aboutBio.statement}</p>
    </div>
  );
}
