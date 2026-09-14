import { SearchBox } from "@/components/SearchBox";

export const metadata = { title: "Search — Duo Li" };

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Search across Projects, Knowledge, Notes and Reading.
      </p>

      <div className="mt-10">
        <SearchBox />
      </div>
    </div>
  );
}
