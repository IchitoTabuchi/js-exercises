import * as fs from "node:fs/promises";
import * as path from "node:path";

export interface WalkEntry {
  path: string;
  isDirectory: boolean;
}

export async function* walk(rootPath: string): AsyncGenerator<WalkEntry> {
  const stats = await fs.stat(rootPath);
  const isDirectory = stats.isDirectory();

  yield { path: rootPath, isDirectory };

  if (isDirectory) {
    const entries = await fs.readdir(rootPath);
    for (const entry of entries) {
      const fullPath = path.join(rootPath, entry);
      yield* walk(fullPath);
    }
  }
}
