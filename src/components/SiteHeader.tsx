import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";
import { MusicPlayerBar } from "./MusicPlayerBar";

export function SiteHeader() {
  return (
    <header className="border-b border-black/[.08] dark:border-white/[.08]">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="font-medium tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
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
        <MusicPlayerBar />
      </div>
    </header>
  );
}
