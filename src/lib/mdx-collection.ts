import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function readMdxCollection<T>(dirName: string): (T & { content: string })[] {
  const dir = path.join(process.cwd(), "content", dirName);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as T), content };
  });
}
