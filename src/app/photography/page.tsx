import { ComingSoon } from "@/components/ComingSoon";
import { photographyCategories } from "@/lib/site";

export const metadata = { title: "Photography — Duo Li" };

export default function PhotographyPage() {
  return (
    <ComingSoon
      title="Photography"
      description="Photography showcase and archive."
      categories={photographyCategories}
      phase="Phase 3 — Photography"
    />
  );
}
