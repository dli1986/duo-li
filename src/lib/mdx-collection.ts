import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function readMdxCollection<T>(dirName: string): (T & { content: string })[] {
  const dir = path.join(process.cwd(), "content", dirName);
  if (!fs.existsSync(dir)) return [];

  // Recurse one level so content can be organized into subfolders
  // (e.g. content/knowledge/{concepts,entities,examples,synthesis,articles}/)
  // without changing how callers read the collection.
  const filePaths: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const subDir = path.join(dir, entry.name);
      for (const subEntry of fs.readdirSync(subDir)) {
        if (subEntry.endsWith(".mdx")) filePaths.push(path.join(subDir, subEntry));
      }
    } else if (entry.name.endsWith(".mdx")) {
      filePaths.push(path.join(dir, entry.name));
    }
  }

  return filePaths.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    return { ...(data as T), content };
  });
}
