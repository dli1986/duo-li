# Duo Digital Garden

Version: 0.1
Author: Duo Li
Status: Draft

---

# 1. Vision

Build a long-term personal digital garden that serves as:

- Personal knowledge base
- Project archive
- Photography portfolio
- Music collection
- Reading journal
- Life record
- Family digital legacy

The website should become a permanent digital asset that can be maintained for decades.

The primary goal is not blogging.

The primary goal is preserving and organizing knowledge, experiences, creations, and memories.

---

# 2. Design Principles

## 2.1 Personal First

The website represents a person, not a product.

Content should reflect:

- Engineering
- Photography
- Music
- Learning
- Family
- Life

## 2.2 Longevity

The platform should remain maintainable for 10+ years.

Requirements:

- Content independence
- Technology replaceability
- Easy migration

## 2.3 Ownership

All content belongs to the owner.

No dependency on external platforms.

Content must remain accessible even if:

- Social platforms disappear
- Hosting providers change
- Frameworks evolve

## 2.4 AI Ready

All content should be searchable by humans and AI agents.

Future support:

- Semantic search
- RAG
- Conversational interface

---

# 3. Target Audience

Primary:

- Future self

Secondary:

- Family
- Children
- Friends

Third level:

- Engineers
- Recruiters
- Researchers
- Photography enthusiasts

---

# 4. Information Architecture

## Home

Purpose:

Personal landing page.

Contents:

- Introduction
- Current focus
- Featured projects
- Featured notes
- Photography highlights
- Now playing

## Now

Purpose:

Current activities and interests.

Fields:

- Location
- Current projects
- Currently learning
- Currently reading
- Currently listening
- Recent thoughts

## Projects

Purpose:

Long-term project archive.

Example projects:

- SpeakerForge
- PersonalCognitiveAgent
- JOB_MONITOR_v2
- AI_NEWS

Each project contains:

- Overview
- Motivation
- Architecture
- Lessons learned
- Roadmap

## Knowledge

Structured knowledge base.

Categories:

- AI
- Agent Runtime
- System Programming
- Databases
- Speech
- Linux
- Career

Purpose:

Long-form evergreen content.

## Notes

Purpose:

Short-form knowledge capture.

Characteristics:

- Lightweight
- Timestamped
- Searchable

Examples:

- Test results
- Learning notes
- Ideas
- Observations

## Photography

Purpose:

Photography showcase and archive.

Categories:

- Street
- Landscape
- Lithuania
- China
- Family
- Favorites

Metadata:

- Camera
- Lens
- Date
- Location
- Story

Support:

- Thumbnail browsing
- Fullscreen viewing
- EXIF display

## Music

Purpose:

Personal music archive.

Not intended to become a music platform.

Each entry contains:

- Title
- Artist
- Lyricist
- Composer
- Arranger
- Notes
- Recommendation

Player features:

- Play
- Pause
- Next
- Repeat

Optional:

- Background playback

Homepage widget:

- Now Playing

## Reading

Purpose:

Reading journal.

Each entry contains:

- Book
- Summary
- Key insights
- Personal reflections

## Career

Purpose:

Professional profile.

Includes:

- Resume
- Work experience
- Skills
- Project highlights

## About

Purpose:

Personal background.

Includes:

- Biography
- Timeline
- Interests
- Contact

---

# 5. Non-Functional Requirements

## Performance

- Homepage load time < 2 seconds
- Global CDN delivery

## Security

- HTTPS only
- Authentication required for private areas

## Availability

Target:

- 99.9% personal-grade availability

## Scalability

Must support:

- 100+ articles
- 10,000+ notes
- 50,000+ photos
- Thousands of music records

without major architectural redesign.

---

# 6. Content Model

## Article

- title
- slug
- tags
- date
- summary
- content

## Note

- date
- tags
- content

## Project

- title
- status
- technologies
- description
- lessons

## Photo

- title
- date
- location
- camera
- lens
- tags
- description
- file

## Music

- title
- artist
- lyricist
- composer
- arranger
- tags
- notes
- audio_reference

---

# 7. MVP

Release Goal: v0.1

Pages:

- Home
- Now
- Projects
- Knowledge
- Notes
- Photography
- Music
- About

Features:

- Responsive design
- Search
- Tag navigation
- Photo gallery
- Music player

Excluded:

- Comments
- User accounts
- Social features

---

# 8. Future Features

## AI Search

Ask Duo

Examples:

- What does Duo think about Agent Runtime?
- What lessons were learned from SpeakerForge?

## Knowledge Graph

Automatic relation discovery.

Example:

SpeakerForge
 -> Whisper.cpp
 -> Real-Time Speech
 -> Sesame

## Personal Timeline

Unified chronological view:

- Life events
- Projects
- Photos
- Reading records

## Family Archive

Private area.

Contains:

- Family photos
- Letters
- Memories

Access controlled.

---

# 9. Technology Direction

Preferred Architecture:

- Next.js
- TypeScript
- MDX
- PostgreSQL
- Cloudflare
- Object Storage (R2/S3/Azure Blob)

Content:

- Markdown / MDX

Media:

- Object Storage

Version Control:

- GitHub

---

# 10. Success Criteria

The project is successful if:

- Content continues growing for years
- Knowledge remains searchable
- Projects remain documented
- Photos remain discoverable
- Music collection remains usable
- Future family members can understand the owner's life and work through the website
- The site can evolve without complete rewrites
