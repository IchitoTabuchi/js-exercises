// npm test ch05/ex09

import { safeJsonParse } from './index.ts';

describe('safeJsonParse', () => {
  it('parses valid JSON object', () => {
    expect(safeJsonParse('{"x":1}')).toEqual({ success: true, data: { x: 1 } });
  });

  it('parses valid JSON string', () => {
    expect(safeJsonParse('"hello"')).toEqual({ success: true, data: 'hello' });
  });

  it('parses valid number', () => {
    expect(safeJsonParse('123')).toEqual({ success: true, data: 123 });
  });

  it('parses null', () => {
    expect(safeJsonParse('null')).toEqual({ success: true, data: null });
  });

  it('parses array', () => {
    expect(safeJsonParse('[true, false]')).toEqual({
      success: true,
      data: [true, false],
    });
  });

  it('fails on invalid JSON (missing quotes)', () => {
    const result = safeJsonParse('{x:1}');
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error).toMatch(/Expected property name|Unexpected/i);
  });

  it('fails on "undefined"', () => {
    const result = safeJsonParse('undefined');
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error).toMatch(/"undefined" is not valid JSON/i);
  });

  it('fails on empty string', () => {
    const result = safeJsonParse('');
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error).toMatch(/Unexpected end of JSON input/);
  });

  it('fails on single-quoted string', () => {
    const result = safeJsonParse("'abc'");
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error).toMatch(/Unexpected token|Unexpected string/);
  });
});

// エラーのメッセージはモジュールや関数などで変わるので、テストで合っているか判定するのはあまりよくない。
