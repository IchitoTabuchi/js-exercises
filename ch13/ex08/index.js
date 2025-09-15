import { promises as fs } from 'fs';
import { join } from 'path';

export async function fetchFirstFileSizeAsync(path) {
  const files = await fs.readdir(path);
  if (files.length === 0) return null;
  return (await fs.stat(join(path, files[0]))).size;
}

export async function fetchSumOfFileSizesAsync(path) {
  const files = await fs.readdir(path);
  let total = 0;
  for (const file of files) total += (await fs.stat(join(path, file))).size;
  return total;
}
