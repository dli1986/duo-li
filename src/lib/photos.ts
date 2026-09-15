import { readMdxCollection } from "./mdx-collection";

export interface PhotoFrontmatter {
  title: string;
  slug: string;
  dateTaken?: string;
  location?: string;
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  tags: string[];
  imageUrl: string;
}

export interface PhotoEntry extends PhotoFrontmatter {
  content: string;
}

export function getAllPhotos(): PhotoEntry[] {
  return readMdxCollection<PhotoFrontmatter>("photos").sort(
    (a, b) => +new Date(b.dateTaken ?? 0) - +new Date(a.dateTaken ?? 0)
  );
}

export function getPhotoBySlug(slug: string): PhotoEntry | undefined {
  return getAllPhotos().find((p) => p.slug === slug);
}
