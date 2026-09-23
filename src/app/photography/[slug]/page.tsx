import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Prose } from "@/components/Prose";
import { getAllPhotos, getPhotoBySlug } from "@/lib/photos";
import { slugifyTag } from "@/lib/tags";

export function generateStaticParams() {
  return getAllPhotos().map((photo) => ({ slug: photo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);
  return { title: photo ? `${photo.title} — Duo Li` : "Photography" };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);

  if (!photo) {
    notFound();
  }

  const exif = [
    ["Date", photo.dateTaken],
    ["Location", photo.location],
    ["Camera", photo.camera],
    ["Lens", photo.lens],
    ["Focal length", photo.focalLength],
    ["Aperture", photo.aperture],
    ["Shutter speed", photo.shutterSpeed],
    ["ISO", photo.iso],
  ].filter(([, value]) => value) as [string, string][];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-black/[.05] dark:bg-white/[.06]">
        <Image src={photo.imageUrl} alt={photo.title} fill sizes="768px" className="object-contain" priority />
      </div>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{photo.title}</h1>

      {exif.length > 0 && (
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          {exif.map(([label, value]) => (
            <>
              <dt key={`${label}-t`} className="text-zinc-500">{label}</dt>
              <dd key={`${label}-d`}>{value}</dd>
            </>
          ))}
        </dl>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {photo.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${slugifyTag(tag)}`}
            className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 hover:text-accent dark:bg-white/[.08] dark:text-zinc-300"
          >
            {tag}
          </Link>
        ))}
      </div>

      {photo.content?.trim() && <Prose source={photo.content} className="mt-10" />}
    </article>
  );
}
