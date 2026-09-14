# Architecture.md

# Duo Digital Garden Architecture

## Goals

- Long-term maintainability (10+ years)
- Content ownership
- Low operational cost
- AI-ready architecture
- Global access

---

# High-Level Architecture

Browser
    -> Cloudflare DNS/CDN
    -> Vercel Hosting
    -> Next.js App Router

Content Sources
    -> MDX Repository (GitHub)
    -> PostgreSQL Metadata
    -> Object Storage (Cloudflare R2)

Services
    -> Search
    -> Analytics
    -> AI/RAG

---

# Frontend

Framework:
- Next.js
- TypeScript
- TailwindCSS

Rendering Strategy:
- Static Generation by default
- ISR for selected pages
- SSR only when required

---

# Content Architecture

MDX stores:
- Articles
- Knowledge
- Notes
- Reading Notes

PostgreSQL stores:
- Metadata
- Tags
- Relationships
- Search index references

---

# Media Architecture

R2 Object Storage:
- Photos
- Audio
- Documents

Store original and optimized versions separately.

---

# Photography Pipeline

RAW Archive
 -> NAS
 -> Export JPEG/WebP
 -> Upload to R2
 -> Generate thumbnails
 -> Publish

Metadata:
- Camera
- Lens
- Location
- EXIF

---

# Music Pipeline

Music Record
 -> Metadata Entry
 -> Optional Audio Asset
 -> Playlist Exposure

Capabilities:
- Play
- Next
- Repeat
- Shuffle (future)

---

# Search Architecture

Phase 1:
- Pagefind

Phase 2:
- PostgreSQL Full Text Search

Phase 3:
- Vector Search
- Semantic Retrieval

---

# AI Architecture

Future Ask Duo Service

User Question
 -> Retriever
 -> Knowledge Base
 -> LLM
 -> Answer

Knowledge Sources:
- Projects
- Notes
- Articles
- Reading
- Music Notes

---

# Security

Public Zone:
- Website

Private Zone:
- Family Archive
- Personal Documents

Authentication:
- OAuth
- Passkeys (future)

---

# Backup Strategy

GitHub
- Content backup

R2
- Media backup

NAS
- Source of truth for originals

Rule:
3-2-1 backup principle

---

# Scalability Targets

- 50,000 photos
- 10,000 notes
- 1,000 articles
- TB-scale media

No architectural redesign required.
