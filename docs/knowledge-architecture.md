# Knowledge & Content Migration Architecture

Living design doc for how content flows from the two private Obsidian vaults
(`C:\ObsidianNote\PKG`, `C:\ObsidianNote\PKG-Wiki`) into this site. Read this
before migrating anything — it's the "why," `docs/TODO.md` is the "what's
done." Update this doc when the taxonomy or conventions change; don't let it
drift from what the code actually does.

## Context: three different production pipelines feed two vaults

| Pipeline | Vault location | Shape of output |
|---|---|---|
| **PKG (older, topic-folder vault)** | `PKG/<TopicName>/` | Unstructured — mixed `.md`/`.cpp`/`.html`/screenshots per folder. Pre-dates the schema below. |
| **pkg-wiki skill (ingest)** | `PKG-Wiki/wiki/{concepts,entities,sources,synthesis}/` | Structured Obsidian pages, fixed frontmatter (`title`, `type`, `tags`, `date-created`, `date-modified`), wiki-linked (`[[...]]`) |
| **capture skill (real-time, in-session)** | `PKG-Wiki/wiki/examples/` | Structured "knowledge card": 核心定义 / 为什么这样设计 ↑ / 最小示例 / 边界与变体 ↓ / 来源上下文, with `lens` + `tags` |

Both vaults also feed **PersonalCognitiveAgent (PCA)** for spaced-repetition
review — that consumption is independent of this site and out of scope here
(PCA reads `raw/` + `wiki/` directly, never touches this repo).

**This site is a separate, curated destination.** Nothing auto-syncs from
either vault. Migration is always: pick one item → read it → strip
anything private/PII → write a matching `.mdx` here → commit. Confidence
score ≠ safe-to-publish (see `docs/TODO.md` decision log for why this stays
manual).

## Content type inventory (what's actually in the vaults, as of 2026-09-23)

`PKG/` topic folders, roughly bucketed by where they'd eventually land:

- **Knowledge-shaped** (technical, evergreen): `C++ interview & Knowledge/`,
  `Deep Learning-Mu Li/`, `Machine Learning-Hung-yi Lee/`,
  `BuildGPTFromScratch/`, `RAG/`, `MCP/`, `Unsloth/`, `OpenTelemetry/`,
  `D3ToJBASE/`, `JBASE/`, `JAVA/`, `AI_News/`, `Developer API Key Calling/`,
  `Development-troubleshooting/`, `NER和encoder-only实例说明/` (already
  migrated — the one live Knowledge article)
- **Career-shaped**: `Resume/` (has `Key points list.md`, and actual code
  samples `buddy.cpp`/`cache_miss.cpp` + a technical writeup
  `Mmap with bytemap architecture.html` — likely interview-prep material,
  possibly Knowledge-shaped too, needs a human read to decide which)
- **Process/meta, personal, probably not public**: `AI时代一切行动的指导原则/`
  (a conversation log about the user's own AI-era learning methodology —
  this is the private source material behind the already-installed
  `ai-era-action-principles` skill, not obviously site content)
- **Productivity/tooling notes**: `Good Prompting/`, `Drawing Tools/`,
  `Colab/`, `Obsidian/` — doesn't fit either top-level `category` cleanly
  (see "Design decision" below: only `AI` / `Systems Engineering` exist
  now, no `Productivity` bucket). If any of these get migrated, they'd need
  `category: "Systems Engineering"` + a `productivity` tag, or stay private
  reference material — not forced into a category that doesn't exist.
- **No matching site module yet**: `PKG-Wiki/Engineering English/`
  (`Expressions/`, `Videos/` — language-learning material). Not migrating
  this until/unless a site section for it makes sense; noted here so it's
  not forgotten, not so it gets forced into Knowledge.

## Migrated so far (2026-09-23 batch)

Deliberately picked a *mix* across both categories and both `kind`s to prove
the taxonomy works before migrating more — not the "best 4," just a
representative spread:

| Site slug | Source file (`PKG/...`) | `category` | `kind` |
|---|---|---|---|
| `agent-architecture-state-graph-middleware` | `Agent/LangChain  LangGraph Agents 全体系关键概念总结.md` | AI | concept |
| `grpo-reasoning-vs-reward-shaping` | `Unsloth/GRPO Training Process Explained.md` | AI | concept |
| `cpp-copy-move-semantics-leveldb` | `C++ interview & Knowledge/tour_of_cpp_ch4_6_copy_move_leveldb_notes.md` | Systems Engineering | concept |
| `aix-linux-cross-platform-eval-order-bug` | `Development-troubleshooting/一次 AIX vs Linux 的跨平台调试经历...md` | Systems Engineering | article |

Notes on how these were handled:

- All four sourced from `PKG/`'s ChatGPT-conversation-shaped raw notes —
  stripped the `source:`/M365-Copilot/ChatGPT frontmatter and any
  "you said/as you noted" conversational framing, rewritten as
  third-person reference material. This is a real editorial step, not
  copy-paste — don't assume future migrations from this vault are
  copy-paste-ready either.
- `aix-linux-cross-platform-eval-order-bug` had internal jBASE-specific
  class/function/macro names (e.g. an internal AST node type, an
  internal macro for combining boolean results) — genericized those to
  illustrative names while keeping the debugging narrative and the C++
  standard's argument-evaluation-order point 100% faithful. The employer
  product name itself never appeared in the note's visible body text, only
  in an Obsidian wiki-link to a *different* note — dropped that link
  entirely rather than publish it.
- Explicitly did **not** migrate `RAG/RAG & Agentic RAG.md` in this batch
  despite it having real value — it's raw scratch notes (bullet fragments,
  broken `[[wiki-links]]` to notes that don't exist here, video links,
  screenshot references) that would need a full rewrite, not a light edit.
  Good candidate for a *later* batch once there's time to do it properly,
  not a "confirm the pipeline works" candidate.
- Everything currently tagged `LOW`/`SKIP` in the initial survey (link-dump
  folders like `MCP/`, `BuildGPTFromScratch/`, `Machine Learning-Hung-yi
  Lee/`, `C++ algo Resource/`; auto-scraped `AI_News/`; thin overviews like
  `JAVA/`) is intentionally still unmigrated — no original synthesis to
  publish, not worth forcing.

`PKG-Wiki/` structured content, ready to migrate mechanically once reviewed:

- `PKG-Wiki/concepts/` (legacy top-level location, pre-dates `wiki/`
  subfolder convention) — `bpe-algorithm.md`, `inference-engine-deployment.md`,
  `python-environment-management.md`, `pytorch-dataset-dataloader.md`
- `PKG-Wiki/wiki/{concepts,entities,synthesis}/` — the current schema
  (`wiki/sources/` intentionally has no site equivalent, see below)
- `PKG-Wiki/wiki/examples/` — capture-skill knowledge cards

## Design decision: Knowledge gets a `kind` discriminator, not a rewrite

`category` (existing, `site.ts`'s `knowledgeCategories`) keeps meaning "which
domain" — but as of 2026-09-23 that's deliberately just **two** top-level
buckets, reflecting a systems-engineer background: `"AI"` and
`"Systems Engineering"`. No more Agent Runtime/Speech/System
Programming/Linux/Databases/Career/Productivity as separate categories —
those all become `tags` (freeform, already exist, drive `/tags`) under
whichever of the two buckets fits. Career-shaped content doesn't get a
Knowledge category at all — it belongs in the separate Career module (see
below), not here. Still unchanged: `category` drives the `/knowledge`
page's section grouping.

New field `kind` means "which shape," mirroring the vault's own page types
one level down:

```ts
kind: "concept" | "entity" | "example" | "synthesis" | "article"
```

- `concept` — idea/technology/methodology (from `wiki/concepts/` or the
  legacy top-level `concepts/`)
- `entity` — person/org/product/place profile (from `wiki/entities/`)
- `example` — capture-skill knowledge card (from `wiki/examples/`); carries
  an extra optional `lens` field (`systems`/`python-ai`/`llm-core`/`general`/
  custom) straight from the capture-skill frontmatter
- `synthesis` — cross-page comparative/deep-dive analysis (from
  `wiki/synthesis/`)
- `article` — **the buffer/fallback.** Free-form long-form write-up that
  doesn't cleanly fit the other four — this is what the *original*
  `content-model.md` design assumed Knowledge always looked like, and what
  the one existing article (`ner-encoder-only.mdx`) actually is (a
  converted raw PKG note, not a schema-perfect concept page). Also the
  right choice for anything migrated straight out of `PKG/`'s unstructured
  topic folders, where forcing a `concept`/`entity` split isn't worth the
  effort. **Default to `article` when in doubt** — this is the buffer that
  keeps migration low-friction; don't block a migration on picking the
  "perfect" kind.

`wiki/sources/` (per-ingested-article summaries) deliberately has **no**
`kind` mapping — it's vault-internal scaffolding whose distilled value
already lives in the `concepts`/`entities` pages it produced. Don't publish
raw source summaries to the site.

## Directory layout

```
content/knowledge/
├── concepts/*.mdx
├── entities/*.mdx
├── examples/*.mdx
├── synthesis/*.mdx
└── articles/*.mdx        (the buffer bucket — includes ner-encoder-only.mdx)
```

`readMdxCollection()` needs to recurse one level to support this (currently
flat, only reads `content/<dirName>/*.mdx` directly) — this is the one
concrete code change this doc requires; `kind` in frontmatter is the
source of truth for rendering/grouping either way, the subfolder is just
for keeping migrated content mechanically traceable back to its vault
folder, not something the app logic branches on.

## Provenance: `sourceType`, not a path

Every migrated entry gets:

```ts
sourceType?: "pkg-wiki" | "capture" | "pkg-legacy" | "manual"
```

Purely internal metadata — never a real vault file path (that would leak
local machine/directory structure into a public repo, however low-risk).
`manual` = written directly for the site with no vault source (e.g. this
doc's own eventual "About the site" content, if any). Lets a future
retrieval pipeline weight sources differently without needing any private
path information.

## Ask Duo compatibility (per `architecture.md`'s sketched pipeline)

`architecture.md` describes Ask Duo as `Question → Retriever → Knowledge
Base → LLM → Answer` over `Projects, Notes, Articles, Reading, Music Notes`.
The `kind`/`sourceType` split is designed so that whenever that gets built:

- `example` entries are already atomic, self-contained, and written to be
  useful out of context — ideal to hand an LLM verbatim as retrieved
  context, no chunking needed
- `concept`/`entity`/`article` are longer-form — the natural unit for
  summary-embedding + chunked retrieval
- `synthesis` entries are already "answers to past questions" — a
  free warm-start dataset for Ask Duo's own eventual retrieval-augmented
  answers
- `sourceType` lets a retriever prefer e.g. `capture` examples (grounded in
  this person's real debugging sessions) over generic `pkg-wiki` concept
  summaries when both are relevant, without needing any extra tagging work
  at query time

No Ask Duo implementation work is happening now — this is just making sure
today's schema choices don't have to be redone when that phase starts.

## Career module note

`Resume/` in `PKG/` is flagged in `docs/TODO.md` as the likely real-data
source to unblock the Career module (currently blocked on "waiting for real
work history, don't fabricate"). This doc doesn't design Career's schema —
that's a separate task for whenever Career work actually starts — but the
connection is worth remembering so nobody re-asks "where would Career data
come from."

## What this doc does NOT decide (explicitly deferred)

- Career module's own content schema
- Whether/how `PKG-Wiki/Engineering English/` or `PKG/`'s
  productivity/tooling folders ever become public content
- Any automation of the migration itself — it stays one article at a time,
  human-reviewed, per the existing PII/confidence-score reasoning
- Ask Duo's actual implementation (retriever, embeddings, hosting)

## Migration workflow (unchanged, now with `kind`/`sourceType` added)

1. Pick one vault file (any of the folders above)
2. Read it, decide `kind` (default `article` if unsure) and `category`
3. Strip PII (work-email-bearing links, employer-identifying specifics
   unless explicitly meant for Career later, etc.)
4. Write `content/knowledge/<kind-plural>/<slug>.mdx` with frontmatter
   `title, slug, kind, sourceType, category, tags, summary, createdAt,
   updatedAt?` (+ `lens` if `kind: "example"`)
5. `npm run build`, commit, push, update `docs/TODO.md`'s status table
