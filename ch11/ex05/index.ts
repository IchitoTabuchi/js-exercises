export const detectFileType = (input: ArrayBuffer | Uint8Array): string => {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  const startsWith = (s: number[]) => s.every((b, i) => bytes[i] === b);
  if (startsWith([0x25, 0x50, 0x44, 0x46])) return 'PDF';
  if (startsWith([0xff, 0xd8, 0xff])) return 'JPG';
  if (startsWith([0x89, 0x50, 0x4e, 0x47])) return 'PNG';
  if (startsWith([0x47, 0x49, 0x46, 0x38])) return 'GIF';
  if (startsWith([0x42, 0x4d])) return 'BMP';
  // 3byte, 4byte目の一致をみる必要がある。
  // https://en.wikipedia.org/wiki/List_of_file_signatures
  if (
    startsWith([0x50, 0x4b, 0x03, 0x04]) ||
    startsWith([0x50, 0x4b, 0x05, 0x06]) ||
    startsWith([0x50, 0x4b, 0x07, 0x08])
  )
    return 'ZIP';
  return 'UNKNOWN';
};
