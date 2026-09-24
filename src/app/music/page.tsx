import { ComingSoon } from "@/components/ComingSoon";
import { MusicList } from "@/components/MusicList";
import { getAllMusic } from "@/lib/music";
import { musicCategories } from "@/lib/site";

export const metadata = { title: "Music — Duo Li" };

export default function MusicPage() {
  const entries = getAllMusic();

  if (entries.length === 0) {
    return (
      <ComingSoon
        title="Music"
        description="Personal music archive with metadata, notes and lightweight playback."
        categories={musicCategories}
        phase="Phase 4 — Music Archive"
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Music</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Personal music archive — metadata, notes and favorites.
      </p>

      <MusicList entries={entries} />
    </div>
  );
}
