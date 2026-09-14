import { ComingSoon } from "@/components/ComingSoon";
import { musicCategories } from "@/lib/site";

export const metadata = { title: "Music — Duo Li" };

export default function MusicPage() {
  return (
    <ComingSoon
      title="Music"
      description="Personal music archive with metadata, notes and lightweight playback."
      categories={musicCategories}
      phase="Phase 4 — Music Archive"
    />
  );
}
