import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

function fetchFirstFileSize(path) {
  return readdir(path).then((files) => {
    if (files.length === 0) {
      return null;
    }
    return stat(join(path, files[0])).then((stats) => stats.size);
  });
}

function fetchSumOfFileSizes(path) {
  return readdir(path).then((files) => {
    return Promise.all(files.map((file) => stat(join(path, file)))).then(
      (statsArray) => statsArray.reduce((sum, stats) => sum + stats.size, 0)
    );
  });
}
