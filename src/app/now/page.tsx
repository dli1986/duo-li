import { currentFocus, currentlyListening, currentlyReading } from "@/lib/site";
import { Section } from "@/components/Section";

export const metadata = { title: "Now — Duo Li" };

export default function NowPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Now</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        What I am doing now.
      </p>

      <Section title="Current Focus">
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
          {currentFocus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Currently Reading">
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
          {currentlyReading.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Currently Listening">
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
          {currentlyListening.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
