// npm test ch05/ex02

import { escapeStringIf, escapeStringSwitch } from './index.ts';

describe('escapeString functions', () => {
  const testCases: [string, string][] = [
    ['a', 'a'],
    ['\\', '\\\\'],
    ['\0', '\\0'],
    ['\b', '\\b'],
    ['\t', '\\t'],
    ['\n', '\\n'],
    ['\v', '\\v'],
    ['\f', '\\f'],
    ['\r', '\\r'],
    ['"', '\\"'],
    ["'", "\\'"],
    ['', ''],
    ['normal text', 'normal text'],
    ['\n\t\r', '\\n\\t\\r'],
    ['He said: "Hi!"', 'He said: \\"Hi!\\"'],
    ["It's okay.", "It\\'s okay."],
    ['mix: \0\b\t\n\v\f\r"\'', 'mix: \\0\\b\\t\\n\\v\\f\\r\\"\\\''],
    ['\\n is newline', '\\\\n is newline'],
  ];

  describe.each([
    ['escapeStringIf', escapeStringIf],
    ['escapeStringSwitch', escapeStringSwitch],
  ])('%s', (_, escapeFn) => {
    test.each(testCases)('escapes %j correctly', (input, expected) => {
      expect(escapeFn(input)).toBe(expected);
    });
  });
});
