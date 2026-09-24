"use client";

import Link from "next/link";
import { useMusicPlayer } from "./MusicPlayerProvider";

export function MusicPlayerBar() {
  const { currentTrack, isPlaying, toggle, next, prev } = useMusicPlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/[.08] bg-background/95 backdrop-blur dark:border-white/[.1]">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <button
          onClick={prev}
          aria-label="Previous track"
          className="shrink-0 rounded-full px-2 py-1 text-lg text-zinc-600 hover:text-accent dark:text-zinc-300"
        >
          ⏮
        </button>
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="shrink-0 rounded-full bg-black/[.06] px-3 py-1.5 text-lg hover:text-accent dark:bg-white/[.1]"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={next}
          aria-label="Next track"
          className="shrink-0 rounded-full px-2 py-1 text-lg text-zinc-600 hover:text-accent dark:text-zinc-300"
        >
          ⏭
        </button>
        <Link
          href={`/music/${currentTrack.slug}`}
          className="min-w-0 flex-1 truncate text-sm hover:text-accent"
        >
          <span className="font-medium">{currentTrack.title}</span>
          <span className="text-zinc-500"> · {currentTrack.artist}</span>
        </Link>
      </div>
    </div>
  );
}
