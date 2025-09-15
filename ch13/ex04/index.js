import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

export const fetchFirstFileSizePromise = (path) =>
  readdir(path).then((files) => {
    if (files.length === 0) return null;
    return stat(join(path, files[0])).then((stats) => stats.size);
  });

export const fetchSumOfFileSizesPromise = (path) =>
  readdir(path).then((files) =>
    Promise.all(files.map((file) => stat(join(path, file)))).then(
      (statsArray) => statsArray.reduce((sum, stats) => sum + stats.size, 0)
    )
  );
