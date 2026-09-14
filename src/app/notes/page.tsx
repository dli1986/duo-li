import Link from "next/link";
import { Prose } from "@/components/Prose";
import { ComingSoon } from "@/components/ComingSoon";
import { getAllNotes } from "@/lib/notes";

export const metadata = { title: "Notes — Duo Li" };

export default function NotesPage() {
  const notes = getAllNotes();

  if (notes.length === 0) {
    return (
      <ComingSoon
        title="Notes"
        description="Short-form, timestamped, searchable knowledge capture."
        phase="Phase 2 — Knowledge System"
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Quick thoughts and discoveries.
      </p>

      <ul className="mt-10 space-y-8">
        {notes.map((note) => (
          <li
            key={note.slug}
            id={note.slug}
            className="scroll-mt-24 border-b border-black/[.06] pb-8 dark:border-white/[.08]"
          >
            <time className="text-sm text-zinc-500" dateTime={note.timestamp}>
              {new Date(note.timestamp).toLocaleDateString()}
            </time>
            {note.title && <h2 className="mt-1 text-lg font-medium">{note.title}</h2>}
            <Prose source={note.content} className="prose-sm mt-2" />
            <div className="mt-3 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 hover:text-accent dark:bg-white/[.08] dark:text-zinc-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
