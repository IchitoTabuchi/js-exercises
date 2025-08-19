export const detectFileType = (input: ArrayBuffer | Uint8Array): string => {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  const startsWith = (s: number[]) => s.every((b, i) => bytes[i] === b);
  if (startsWith([0x25, 0x50, 0x44, 0x46])) return 'PDF';
  if (startsWith([0xff, 0xd8, 0xff])) return 'JPG';
  if (startsWith([0x89, 0x50, 0x4e, 0x47])) return 'PNG';
  if (startsWith([0x47, 0x49, 0x46, 0x38])) return 'GIF';
  if (startsWith([0x42, 0x4d])) return 'BMP';
  if (startsWith([0x50, 0x4b])) return 'ZIP';
  return 'UNKNOWN';
};
