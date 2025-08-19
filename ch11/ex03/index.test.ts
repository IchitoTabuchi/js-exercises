import { bigToLittle, littleToBig } from './index.ts';

const cases: Array<{ input: number; expected: number }> = [
  { input: 0x00000000, expected: 0x00000000 },
  { input: 0xffffffff, expected: 0xffffffff },
  { input: 0x12345678, expected: 0x78563412 },
  { input: 0xdeadbeef, expected: 0xefbeadde },
  { input: 0x01020304, expected: 0x04030201 },
];

describe('Endian conversion', () => {
  for (const { input, expected } of cases) {
    it(`littleToBig(${input.toString(16)}) = ${expected.toString(16)}`, () => {
      const arr = new Uint32Array([input]);
      const result = littleToBig(arr);
      expect(result[0]).toBe(expected);
    });

    it(`bigToLittle(${expected.toString(16)}) = ${input.toString(16)}`, () => {
      const arr = new Uint32Array([expected]);
      const result = bigToLittle(arr);
      expect(result[0]).toBe(input);
    });
  }
});
