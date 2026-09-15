import Image from "next/image";
import Link from "next/link";
import { ComingSoon } from "@/components/ComingSoon";
import { getAllPhotos } from "@/lib/photos";
import { photographyCategories } from "@/lib/site";

export const metadata = { title: "Photography — Duo Li" };

export default function PhotographyPage() {
  const photos = getAllPhotos();

  if (photos.length === 0) {
    return (
      <ComingSoon
        title="Photography"
        description="Photography showcase and archive."
        categories={photographyCategories}
        phase="Phase 3 — Photography"
      />
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Photography</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        A personal photography archive.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo) => (
          <Link
            key={photo.slug}
            href={`/photography/${photo.slug}`}
            className="group relative aspect-square overflow-hidden rounded-md bg-black/[.05] dark:bg-white/[.06]"
          >
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
