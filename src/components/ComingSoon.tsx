export function ComingSoon({
  title,
  description,
  categories,
  phase,
}: {
  title: string;
  description: string;
  categories?: string[];
  phase: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>

      {categories && (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-black/[.05] px-3 py-1 text-xs text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <p className="mt-10 text-sm text-zinc-500">
        This section is planned for {phase}. Content will appear here as it is
        published.
      </p>
    </div>
  );
}
