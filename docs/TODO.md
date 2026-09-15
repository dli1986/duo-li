# TODO / Project Status

Living status doc — what's actually live, what's designed-but-not-built, and where the open decisions are. `docs/roadmap.md` is the long-term phase plan; this file is "where are we right now and what's the next concrete entry point." Update this, don't let it go stale.

## Live right now

- **Site**: https://duo-li.vercel.app (Next.js on Vercel, auto-deploys on push to `main` of `github.com/dli1986/duo-li`)
- **Domain**: still the `.vercel.app` subdomain — custom domain purchase deliberately deferred (Cloudflare blocked on work network at the time; not urgent, `.vercel.app` is fully functional)
- **Repos**:
  - `duo-li` = this Next.js site (public, static, stateless — deployed to Vercel)
  - `duo-nas` (`github.com/dli1986/duo-nas`) = private media backend (Postgres + Navidrome in Docker), runs on the dev machine via WSL2 (Rancher Desktop). **Never** talks to `duo-li` at runtime — only via exported artifacts (MDX files, optimized media) committed into `duo-li`'s `content/`.
  - Both repos are cloned twice: once on Windows (`C:\Users\dli\Projects\MyTest\{duo-nas,Duo-digital-garden}` — the "authoring" copies) and once natively inside WSL Ubuntu (`~/duo-nas`, `~/duo-li` — the "runtime" copies, synced via `git pull` from the Windows path set as `origin`). Cloned as siblings so scripts can use relative paths across the two repos.

## What's actually built vs. stub

| Section | Status |
|---|---|
| Home / Now / About / Projects | Built, real content. Projects page is a chronological timeline (8 entries, `startDate` auto-fetched from GitHub repo `created_at` when omitted from frontmatter) |
| Knowledge | Pipeline built, **1 real article** (`ner-encoder-only.mdx`). Grouped-by-category list page. |
| Notes | Pipeline built, **0 entries** — still renders the `ComingSoon` stub |
| Reading | Pipeline built, **0 entries** — still renders the `ComingSoon` stub |
| Music | Pipeline built, **1 real entry** (`si-shi-gu-ren-lai.mdx`, sourced from verified MusicBrainz data). Site-wide BGM player component exists but is inert in production (see "Blocked" below) |
| Photography | Still the `ComingSoon` stub. About to be designed (this session) |
| Career | Still the `ComingSoon` stub. Blocked on user providing real work-history data — do not fabricate |
| Tags, Search (Pagefind) | Built and working across Knowledge/Notes/Reading |

## Conventions to remember

- Content = MDX + frontmatter in `content/{knowledge,notes,reading,music,projects}/`, loaded via `src/lib/*.ts` (`readMdxCollection` helper in `src/lib/mdx-collection.ts`)
- MDX rendering goes through the shared `src/components/Prose.tsx` (remark-gfm for tables + remark-math/rehype-katex for LaTeX) — always use this, never call `MDXRemote` directly, or tables/math silently break (this happened once, see Knowledge session notes)
- Project `startDate` is optional — omit it and set `repository` (a github.com URL) to auto-fetch the real repo creation date at build time instead of guessing
- New Knowledge articles: user points to a specific file (usually somewhere under `C:\ObsidianNote\PKG` or `PKG-Wiki`), agent reads it, picks one `category`, extracts `tags`, strips any PII (personal note sources sometimes have work-email-bearing metadata — strip it), fixes Obsidian-specific formatting artifacts, writes the MDX. One at a time, manual curation, never bulk import (privacy — PKG contains mixed-sensitivity content like resume/private notes).
- `duo-nas` acquires audio via `scripts/acquire/acquire.py` (yt-dlp, own `.venv`), gets real composer/lyricist/etc. via `scripts/export-music/musicbrainz_lookup.py` (MusicBrainz API — free, no token needed, just needs a descriptive User-Agent).

## Open decisions / blocked items — read before resuming

1. **BGM public playback — BLOCKED on this machine, not just risky.** Corporate laptop: tailscale.com and Cloudflare Tunnel docs are network-blocked, and installing unauthorized tunnel software isn't allowed anyway. No path forward here until either (a) testing from a personal device/network, or (b) real always-on NAS hardware (a personal device). Do not suggest resuming without the user raising it first.
2. **Photography module — about to be designed.** User has real local photos as source material. Open question raised: does Photography face the same kind of access-blocker as the BGM/Tailscale situation, specifically around Cloudflare R2 (needs a Cloudflare account + `dash.cloudflare.com` access to create a bucket/API token — check whether that specific subdomain is blocked, separate question from the tunnel-software block). Unlike the BGM case, uploading to R2 is a plain HTTPS API call (S3-compatible), not "tunnel/remote-access software," so it's a different risk category than Tailscale/Cloudflared even if related Cloudflare surfaces are involved — needs its own check, don't assume it's blocked just because Tailscale/Cloudflare Tunnel were.
3. **Custom domain** — deferred, not urgent, revisit whenever the user wants.
4. **Career page** — waiting on the user's real work history; don't fabricate.
5. **PKG/PKG-Wiki → Knowledge pipeline** — deliberately manual/curated, one article at a time. Not automating this (see session notes on why: confidence score ≠ safe-to-publish).

## Next candidate entry points (pick one, don't guess which)

- Design + start building the Photography module (pending the R2 access question above)
- Add a second Knowledge article
- Start populating Notes or Reading
- Revisit custom domain
- Something else the user raises
