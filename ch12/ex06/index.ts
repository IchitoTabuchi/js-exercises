import * as fs from 'fs';
import * as path from 'path';

export interface WalkEntry {
  path: string;
  isDirectory: boolean;
}

export function* walk(rootPath: string): Generator<WalkEntry> {
  const stats = fs.statSync(rootPath);
  const isDirectory = stats.isDirectory();

  yield { path: rootPath, isDirectory };

  if (isDirectory) {
    const entries = fs.readdirSync(rootPath);
    for (const entry of entries) {
      const fullPath = path.join(rootPath, entry);
      yield* walk(fullPath);
    }
  }
}
