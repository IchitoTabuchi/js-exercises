/* eslint-disable @typescript-eslint/no-explicit-any */
export function f(body: string) {
  const argNames = Array.from({ length: 10 }, (_, i) => `a${i + 1}`);
  const replacedBody = body.replace(/\$([1-9]|10)/g, (_, n) => `a${n}`);
  return new Function(
    ...argNames,
    replacedBody.startsWith('{') ? replacedBody : `return (${replacedBody});`
  ) as (...args: any[]) => any;
}

// `$$(i+1)`のようにすると、aに変換しなくても計算可能`
