import { socialLinks } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.08]">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400">
        <span>&copy; {year} Duo Li</span>
        <div className="flex gap-4">
          <a href={socialLinks.github} className="hover:text-zinc-950 dark:hover:text-zinc-50">
            GitHub
          </a>
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} className="hover:text-zinc-950 dark:hover:text-zinc-50">
              LinkedIn
            </a>
          )}
          <a href={socialLinks.rss} className="hover:text-zinc-950 dark:hover:text-zinc-50">
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
