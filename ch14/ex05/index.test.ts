import { template } from './index.ts';

describe('template', () => {
  test('returns empty string for empty template literal', () => {
    expect(template``).toBe('');
  });

  test('returns raw string when no interpolations are provided', () => {
    expect(template`test`).toBe('test');
  });

  test('replaces interpolated values with their type name', () => {
    expect(template`Hello, ${'A'}`).toBe('Hello, string');
    expect(template`${1} ${null} ${() => {}}`).toBe('number object function');
    expect(template`type of 'A' is ${'A'}`).toBe(`type of 'A' is string`);
  });

  describe('interpolated type coverage', () => {
    const cases: Array<[label: string, value: unknown, expectedType: string]> =
      [
        ['string', 'text', 'string'],
        ['number', 123, 'number'],
        ['bigint', BigInt(10), 'bigint'],
        ['boolean true', true, 'boolean'],
        ['boolean false', false, 'boolean'],
        ['undefined', undefined, 'undefined'],
        ['null', null, 'object'],
        ['array', [1, 2, 3], 'object'],
        ['plain object', { a: 1 }, 'object'],
        ['date', new Date(), 'object'],
        ['function', () => undefined, 'function'],
        ['class instance', new (class {})(), 'object'],
        ['symbol', Symbol('id'), 'symbol'],
      ];

    test.each(cases)('returns type name for %s', (_, value, expectedType) => {
      expect(template`value is ${value}`).toBe(`value is ${expectedType}`);
    });
  });

  test('handles multiple interpolations of various types', () => {
    const sym = Symbol('multi');
    const result = template`${0n} ${false} ${undefined} ${sym}`;
    expect(result).toBe('bigint boolean undefined symbol');
  });
});
