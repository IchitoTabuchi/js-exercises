import * as fs from 'fs';

export function* readLines(filePath: string, fsImpl = fs): Generator<string> {
  const fd = fsImpl.openSync(filePath, 'r');
  const buffer = new Uint8Array(1024);
  let leftover = '';
  try {
    for (;;) {
      const bytesRead = fsImpl.readSync(fd, buffer, 0, buffer.length, null);
      if (bytesRead === 0) break;
      leftover += Buffer.from(buffer.subarray(0, bytesRead)).toString('utf8');
      const lines = leftover.split('\n');
      leftover = lines.pop() ?? '';
      for (const line of lines) yield line;
    }
    if (leftover.length > 0) yield leftover;
  } finally {
    fsImpl.closeSync(fd);
  }
}
