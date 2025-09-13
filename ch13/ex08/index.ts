import { promises as fs } from 'fs';
import { join } from 'path';

export async function fetchFirstFileSize(path: string): Promise<number | null> {
  const files = await fs.readdir(path);
  if (files.length === 0) {
    return null;
  }

  const stats = await fs.stat(join(path, files[0]));
  return stats.size;
}

export async function fetchSumOfFileSizes(path: string): Promise<number> {
  const files = await fs.readdir(path);
  let total = 0;

  for (const file of files) {
    const stats = await fs.stat(join(path, file));
    total += stats.size;
  }

  return total;
}
