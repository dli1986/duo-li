// Pure, client-safe tag-slug logic — kept separate from tags.ts because that
// module also aggregates server-only (fs-based) content collections, and
// importing slugifyTag from tags.ts in a Client Component would otherwise
// pull that entire server-only import graph into the client bundle.

// Tag text can contain characters that break as a URL path segment on Vercel's
// static hosting specifically: "+"/space have legacy form-encoding ambiguity
// even when percent-encoded, and (confirmed by testing) non-ASCII segments
// (e.g. CJK tags like "国语") 404 on Vercel's prerendered static routes even
// though they build fine locally and percent-encode unambiguously per spec.
// Routing by a guaranteed-pure-ASCII slug sidesteps both problems.
const SYMBOL_WORDS: Record<string, string> = { "+": "p", "#": "sharp", "&": "and" };

export function slugifyTag(tag: string): string {
  const substituted = tag.replace(/[+#&]/g, (ch) => SYMBOL_WORDS[ch] ?? "");
  const asciiSlug = substituted
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  if (asciiSlug) return asciiSlug;

  // Nothing ASCII survived (e.g. a pure-CJK tag) — fall back to a hex-encoded
  // UTF-8 byte string. Not pretty, but guaranteed to be a plain ASCII segment.
  // Uses TextEncoder (not Buffer) so this also works in client bundles.
  const bytes = new TextEncoder().encode(tag);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
