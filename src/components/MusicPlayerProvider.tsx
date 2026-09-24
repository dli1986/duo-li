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
  shuffle: boolean;
  play: (index: number) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  toggleShuffle: () => void;
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
  const [shuffle, setShuffle] = useState(false);
  // Tracks played-index history so prev() can retrace shuffled jumps.
  const historyRef = useRef<number[]>([]);

  const play = useCallback(
    (index: number) => {
      if (playlist.length === 0) return;
      const safeIndex = ((index % playlist.length) + playlist.length) % playlist.length;
      setCurrentIndex((prevIndex) => {
        if (prevIndex !== -1 && prevIndex !== safeIndex) {
          historyRef.current.push(prevIndex);
        }
        return safeIndex;
      });
      setIsPlaying(true);
    },
    [playlist]
  );

  const randomIndex = useCallback(
    (exclude: number) => {
      if (playlist.length <= 1) return 0;
      let idx = exclude;
      while (idx === exclude) {
        idx = Math.floor(Math.random() * playlist.length);
      }
      return idx;
    },
    [playlist]
  );

  const next = useCallback(() => {
    if (playlist.length === 0) return;
    if (currentIndex === -1) {
      play(shuffle ? randomIndex(-1) : 0);
      return;
    }
    play(shuffle ? randomIndex(currentIndex) : currentIndex + 1);
  }, [currentIndex, playlist, shuffle, play, randomIndex]);

  const prev = useCallback(() => {
    if (playlist.length === 0) return;
    const previousIndex = historyRef.current.pop();
    if (previousIndex !== undefined) {
      setCurrentIndex(previousIndex);
      setIsPlaying(true);
      return;
    }
    if (currentIndex === -1) {
      play(0);
      return;
    }
    play(currentIndex - 1);
  }, [currentIndex, playlist, play]);

  const toggle = useCallback(() => {
    if (currentIndex === -1) {
      play(shuffle ? randomIndex(-1) : 0);
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
  }, [currentIndex, isPlaying, play, shuffle, randomIndex]);

  const toggleShuffle = useCallback(() => setShuffle((s) => !s), []);

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
    () => ({
      playlist,
      currentTrack,
      currentIndex,
      isPlaying,
      shuffle,
      play,
      toggle,
      next,
      prev,
      toggleShuffle,
    }),
    [playlist, currentTrack, currentIndex, isPlaying, shuffle, play, toggle, next, prev, toggleShuffle]
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
