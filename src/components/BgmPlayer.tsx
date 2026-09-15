"use client";

import { useRef, useState } from "react";

// Local-only for now: unset in production until there's a public stream endpoint
// (self-hosted Navidrome isn't publicly reachable yet — see duo-nas repo).
const BGM_URL = process.env.NEXT_PUBLIC_BGM_STREAM_URL;
const BGM_TITLE = process.env.NEXT_PUBLIC_BGM_TITLE ?? "Now Playing";

export function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!BGM_URL) return null;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={BGM_URL} loop preload="none" />
      <button
        onClick={toggle}
        className="rounded-full bg-background px-4 py-2 text-sm text-foreground shadow-lg ring-1 ring-black/[.08] hover:text-accent dark:ring-white/[.12]"
      >
        {playing ? "⏸" : "▶"} {BGM_TITLE}
      </button>
    </div>
  );
}
