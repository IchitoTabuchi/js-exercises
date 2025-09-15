import * as fs from 'node:fs/promises';
import { join } from 'node:path';

export async function fetchSumOfFileSizesPromiseAll(path) {
  const files = await fs.readdir(path);
  const sizes = await Promise.all(
    files.map(async (file) => (await fs.stat(join(path, file))).size)
  );
  return sizes.reduce((total, size) => total + size, 0);
}
