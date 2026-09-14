import { ComingSoon } from "@/components/ComingSoon";
import { knowledgeCategories } from "@/lib/site";

export const metadata = { title: "Knowledge — Duo Li" };

export default function KnowledgePage() {
  return (
    <ComingSoon
      title="Knowledge"
      description="Structured, evergreen technical knowledge base."
      categories={knowledgeCategories}
      phase="Phase 2 — Knowledge System"
    />
  );
}
