import * as fs from 'node:fs/promises';
import { join } from 'node:path';

export async function fetchSumOfFileSizes(path: string) {
  const files = await fs.readdir(path);

  const sizes = await Promise.all(
    files.map(async (file) => {
      const stats = await fs.stat(join(path, file));
      return stats.size;
    })
  );

  return sizes.reduce((total, size) => total + size, 0);
}
