import { ComingSoon } from "@/components/ComingSoon";
import { readingCategories } from "@/lib/site";

export const metadata = { title: "Reading — Duo Li" };

export default function ReadingPage() {
  return (
    <ComingSoon
      title="Reading"
      description="Reading journal: books, summaries, key insights and personal reflections."
      categories={readingCategories}
      phase="Phase 2 — Knowledge System"
    />
  );
}
