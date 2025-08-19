/* eslint-disable @typescript-eslint/no-explicit-any */
export function stringifyJSON(val: any): string {
  if (val === null) return 'null';
  if (typeof val === 'boolean' || typeof val === 'number')
    return isFinite(val as number) ? String(val) : 'null';
  if (typeof val === 'string') return quote(val);

  if (typeof val?.toJSON === 'function') return stringifyJSON(val.toJSON()); // toJSONメソッドがあればそれを使う
  if (val instanceof Date) return quote(val.toISOString()); // Date型はtoISOString()で文字列化

  if (Array.isArray(val))
    return `[${val
      .map(
        (v) =>
          v === undefined || typeof v === 'function' || typeof v === 'symbol'
            ? 'null'
            : stringifyJSON(v) // 再帰
      )
      .join(',')}]`;

  if (typeof val === 'object') {
    return `{${Object.keys(val)
      .flatMap((k) => {
        const v = val[k];
        if (v === undefined || typeof v === 'function' || typeof v === 'symbol')
          return [];
        return `${quote(k)}:${stringifyJSON(v)}`; // 再帰
      })
      .join(',')}}`;
  }

  return undefined as any;
}

// エスケープ
const quote = (s: string): string => {
  return (
    '"' +
    // eslint-disable-next-line no-control-regex
    s.replace(/[\u0000-\u001F"\\]/g, (c) => {
      return (
        {
          '"': '\\"',
          '\\': '\\\\',
          '\b': '\\b',
          '\f': '\\f',
          '\n': '\\n',
          '\r': '\\r',
          '\t': '\\t',
        }[c] ?? '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')
      );
    }) +
    '"'
  );
};
