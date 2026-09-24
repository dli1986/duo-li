import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";
import { MusicPlayerBar } from "./MusicPlayerBar";

export function SiteHeader() {
  return (
    <header className="relative border-b border-black/[.08] dark:border-white/[.08]">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="font-medium tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute top-1/2 right-6 hidden -translate-y-1/2 lg:block">
        <MusicPlayerBar />
      </div>
      {/* Header has no room for the player below lg — give it its own row instead of hiding it. */}
      <div className="flex border-t border-black/[.06] px-6 py-2 lg:hidden dark:border-white/[.08]">
        <MusicPlayerBar className="ml-auto" />
      </div>
    </header>
  );
}
