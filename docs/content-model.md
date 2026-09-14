# Content Model

# Core Principles

Every content type should:
- Be searchable
- Be taggable
- Support future AI indexing

---

# Article

Fields:
- id
- title
- slug
- summary
- tags
- createdAt
- updatedAt
- content

---

# Note

Fields:
- id
- content
- tags
- timestamp

---

# Project

Fields:
- id
- name
- description
- status
- technologies
- repository
- lessonsLearned
- roadmap

---

# Photo

Fields:
- id
- title
- dateTaken
- location
- camera
- lens
- focalLength
- aperture
- shutterSpeed
- iso
- tags
- story
- imageUrl

---

# Music

Fields:
- id
- title
- artist
- lyricist
- composer
- arranger
- genre
- tags
- notes
- audioUrl

---

# Reading

Fields:
- id
- bookTitle
- author
- dateFinished
- rating
- summary
- reflections

---

# Timeline Event

Fields:
- id
- date
- type
- title
- description

Examples:
- Project
- Travel
- Career
- Family

---

# Relationships

Project -> Article
Project -> Note
Project -> Photo
Music -> Note
Book -> Note
Timeline -> Any Content
