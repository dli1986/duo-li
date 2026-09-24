"use client";

import Link from "next/link";
import { useMusicPlayer } from "./MusicPlayerProvider";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
      <polygon points="6,4 20,12 6,20" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
      <rect x="5" y="4" width="2.5" height="16" />
      <polygon points="19,4 19,20 8,12" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
      <rect x="16.5" y="4" width="2.5" height="16" />
      <polygon points="5,4 5,20 16,12" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 6h3.5L16 18h4.5" />
      <path d="M17 6h4v4" />
      <path d="M3 18h3.5l3-4" />
      <path d="M17 18h4v-4" />
    </svg>
  );
}

function RepeatOneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      <path d="M12 8.5v4" />
      <path d="M11 9.2l1-.7" />
    </svg>
  );
}

export function MusicPlayerBar() {
  const { playlist, currentTrack, isPlaying, shuffle, repeatOne, toggle, next, prev, toggleShuffle, toggleRepeatOne } =
    useMusicPlayer();

  if (playlist.length === 0) return null;

  return (
    <div className="flex items-center gap-0.5 rounded-full bg-black/[.04] py-1 pl-1 pr-3 dark:bg-white/[.06]">
      <button
        onClick={toggleShuffle}
        aria-label="Toggle shuffle"
        aria-pressed={shuffle}
        title={shuffle ? "Shuffle: on" : "Shuffle: off"}
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
          shuffle
            ? "text-accent"
            : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        }`}
      >
        <ShuffleIcon />
      </button>
      <button
        onClick={toggleRepeatOne}
        aria-label="Toggle repeat one"
        aria-pressed={repeatOne}
        title={repeatOne ? "Repeat one: on" : "Repeat one: off"}
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
          repeatOne
            ? "text-accent"
            : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        }`}
      >
        <RepeatOneIcon />
      </button>
      {currentTrack && (
        <button
          onClick={prev}
          aria-label="Previous track"
          className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          <PrevIcon />
        </button>
      )}
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-black/[.08] text-zinc-800 transition-colors hover:text-accent dark:bg-white/[.12] dark:text-zinc-100"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      {currentTrack && (
        <button
          onClick={next}
          aria-label="Next track"
          className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          <NextIcon />
        </button>
      )}
      <Link
        href={currentTrack ? `/music/${currentTrack.slug}` : "/music"}
        title={currentTrack ? `${currentTrack.title} · ${currentTrack.artist}` : "Music"}
        className="ml-1 max-w-[6rem] truncate text-xs text-zinc-500 hover:text-accent"
      >
        {currentTrack ? currentTrack.title : "Music"}
      </Link>
    </div>
  );
}
