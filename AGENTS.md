# AGENTS.md

Before making implementation decisions read:

0. TODO.md (current status, what's live vs stub, open decisions — read this first)
1. vision.md
2. spec.md
3. architecture.md
4. content-model.md
5. knowledge-architecture.md (Knowledge module's kind/sourceType taxonomy + the two-vault content migration plan)
6. roadmap.md
7. design-system.md
8. homepage-wireframe.md
9. navigation.md
10. digital-legacy.md

Important:

This is NOT a blog project.

This is a long-term personal digital archive.

Priorities:

1. Longevity
2. Content ownership
3. Simplicity
4. Searchability
5. AI readiness

Avoid introducing unnecessary complexity.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
