"use client";

import Link from "next/link";
import { slugifyTag } from "@/lib/slugify-tag";
import { useMusicPlayer } from "./MusicPlayerProvider";

interface MusicListEntry {
  slug: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  tags: string[];
  audioUrl?: string;
}

export function MusicList({ entries }: { entries: MusicListEntry[] }) {
  const { playlist, currentTrack, isPlaying, play, toggle } = useMusicPlayer();

  return (
    <ul className="mt-10 space-y-8">
      {entries.map((entry) => {
        const isCurrent = currentTrack?.slug === entry.slug;
        return (
          <li key={entry.slug} className="border-b border-black/[.06] pb-8 dark:border-white/[.08]">
            <div className="flex items-center gap-3">
              {entry.audioUrl && (
                <button
                  onClick={() => {
                    if (isCurrent) {
                      toggle();
                      return;
                    }
                    const index = playlist.findIndex((t) => t.slug === entry.slug);
                    if (index !== -1) play(index);
                  }}
                  aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
                  className="shrink-0 rounded-full bg-black/[.05] px-2.5 py-1.5 text-sm hover:text-accent dark:bg-white/[.08]"
                >
                  {isCurrent && isPlaying ? "⏸" : "▶"}
                </button>
              )}
              <Link href={`/music/${entry.slug}`} className="text-lg font-medium hover:text-accent">
                {entry.title}
              </Link>
            </div>
            <p className="mt-1 text-sm text-zinc-500">
              {entry.artist}
              {entry.album && ` · ${entry.album}`}
              {entry.year && ` · ${entry.year}`}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugifyTag(tag)}`}
                  className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 hover:text-accent dark:bg-white/[.08] dark:text-zinc-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
