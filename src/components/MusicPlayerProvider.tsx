"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface MusicTrack {
  slug: string;
  title: string;
  artist: string;
  audioUrl: string;
}

interface MusicPlayerContextValue {
  playlist: MusicTrack[];
  currentTrack: MusicTrack | null;
  currentIndex: number;
  isPlaying: boolean;
  play: (index: number) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export function MusicPlayerProvider({
  playlist,
  children,
}: {
  playlist: MusicTrack[];
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(
    (index: number) => {
      if (playlist.length === 0) return;
      const safeIndex = ((index % playlist.length) + playlist.length) % playlist.length;
      setCurrentIndex(safeIndex);
      setIsPlaying(true);
    },
    [playlist]
  );

  const next = useCallback(() => {
    if (currentIndex === -1) {
      play(0);
      return;
    }
    play(currentIndex + 1);
  }, [currentIndex, play]);

  const prev = useCallback(() => {
    if (currentIndex === -1) {
      play(0);
      return;
    }
    play(currentIndex - 1);
  }, [currentIndex, play]);

  const toggle = useCallback(() => {
    if (currentIndex === -1) {
      play(0);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }, [currentIndex, isPlaying, play]);

  // Load + play whenever the current track changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIndex === -1) return;
    const track = playlist[currentIndex];
    if (!track) return;
    audio.src = track.audioUrl;
    audio.play().catch(() => setIsPlaying(false));
  }, [currentIndex, playlist]);

  const currentTrack = currentIndex === -1 ? null : (playlist[currentIndex] ?? null);

  const value = useMemo<MusicPlayerContextValue>(
    () => ({ playlist, currentTrack, currentIndex, isPlaying, play, toggle, next, prev }),
    [playlist, currentTrack, currentIndex, isPlaying, play, toggle, next, prev]
  );

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onEnded={next}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  return ctx;
}
