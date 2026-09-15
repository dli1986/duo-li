import { readMdxCollection } from "./mdx-collection";

export interface MusicFrontmatter {
  title: string;
  slug: string;
  artist: string;
  lyricist?: string;
  composer?: string;
  arranger?: string;
  album?: string;
  year?: number;
  tags: string[];
  musicbrainzUrl?: string;
  neteaseId?: string;
  spotifyUrl?: string;
}

export interface MusicEntry extends MusicFrontmatter {
  content: string;
}

export function getAllMusic(): MusicEntry[] {
  return readMdxCollection<MusicFrontmatter>("music").sort(
    (a, b) => (b.year ?? 0) - (a.year ?? 0)
  );
}

export function getMusicBySlug(slug: string): MusicEntry | undefined {
  return getAllMusic().find((m) => m.slug === slug);
}
