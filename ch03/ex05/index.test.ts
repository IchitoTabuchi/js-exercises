// npm test ch03/ex05

import { convertCRLFtoLF, convertLFtoCRLF } from './index.ts';

describe('Newline conversion functions', () => {
  test('convertLFtoCRLF should convert LF to CR+LF', () => {
    const input = 'Hello\nWorld\nTest';
    const expected = 'Hello\r\nWorld\r\nTest';
    expect(convertLFtoCRLF(input)).toBe(expected);
  });

  test('convertCRLFtoLF should convert CR+LF to LF', () => {
    const input = 'Hello\r\nWorld\r\nTest';
    const expected = 'Hello\nWorld\nTest';
    expect(convertCRLFtoLF(input)).toBe(expected);
  });

  test('convertLFtoCRLF should not modify a string without LF', () => {
    const input = 'Hello World Test';
    expect(convertLFtoCRLF(input)).toBe(input);
  });

  test('convertCRLFtoLF should not modify a string without CR+LF', () => {
    const input = 'Hello\nWorld\nTest';
    expect(convertCRLFtoLF(input)).toBe(input);
  });

  test('convertLFtoCRLF followed by convertCRLFtoLF should return the original string', () => {
    const input = 'Hello\nWorld\nTest';
    const converted = convertLFtoCRLF(input);
    expect(convertCRLFtoLF(converted)).toBe(input);
  });
});
