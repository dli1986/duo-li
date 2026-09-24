"use client";

import { useMusicPlayer } from "./MusicPlayerProvider";

export function MusicPlayButton({ slug }: { slug: string }) {
  const { playlist, currentTrack, isPlaying, play, toggle } = useMusicPlayer();
  const isCurrent = currentTrack?.slug === slug;

  return (
    <button
      onClick={() => {
        if (isCurrent) {
          toggle();
          return;
        }
        const index = playlist.findIndex((t) => t.slug === slug);
        if (index !== -1) play(index);
      }}
      className="mt-4 inline-flex items-center gap-2 rounded-full bg-black/[.05] px-4 py-2 text-sm hover:text-accent dark:bg-white/[.08]"
    >
      {isCurrent && isPlaying ? "⏸ Pause" : "▶ Play"}
    </button>
  );
}
