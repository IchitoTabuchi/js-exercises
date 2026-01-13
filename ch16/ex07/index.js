import fs from 'fs';

// パスを指定してファイルシステムエントリの種類を判定する
export const checkEntry = async (path) => {
  const stats = await fs.promises.stat(path);

  if (stats.isFile()) return 'file';
  if (stats.isDirectory()) return 'directory';
  if (stats.isBlockDevice()) return 'blockDevice';
  if (stats.isCharacterDevice()) return 'characterDevice';
  if (stats.isFIFO()) return 'fifo';
  if (stats.isSocket()) return 'socket';
  return 'unknown';
};
