/* eslint-disable @typescript-eslint/no-explicit-any */
export function stringifyJSON(val) {
    if (val === null)
        return 'null';
    if (typeof val === 'boolean' || typeof val === 'number')
        return isFinite(val) ? String(val) : 'null';
    if (typeof val === 'string')
        return quote(val);
    if (typeof val?.toJSON === 'function')
        return stringifyJSON(val.toJSON()); // toJSONメソッドがあればそれを使う
    if (val instanceof Date)
        return quote(val.toISOString()); // Date型はtoISOString()で文字列化
    if (Array.isArray(val))
        return `[${val
            .map((v) => v === undefined || typeof v === 'function' || typeof v === 'symbol'
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
    return undefined;
}
// エスケープ
const quote = (s) => {
    return ('"' +
        // eslint-disable-next-line no-control-regex
        s.replace(/[\u0000-\u001F"\\]/g, (c) => {
            return ({
                '"': '\\"',
                '\\': '\\\\',
                '\b': '\\b',
                '\f': '\\f',
                '\n': '\\n',
                '\r': '\\r',
                '\t': '\\t',
            }[c] ?? '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
        }) +
        '"');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxHQUFRO0lBQ3BDLElBQUksR0FBRyxLQUFLLElBQUk7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUNoQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFNBQVMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1FBQ3JELE9BQU8sUUFBUSxDQUFDLEdBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN4RCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQyxJQUFJLE9BQU8sR0FBRyxFQUFFLE1BQU0sS0FBSyxVQUFVO1FBQUUsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7SUFDakcsSUFBSSxHQUFHLFlBQVksSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO0lBRXJGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDcEIsT0FBTyxJQUFJLEdBQUc7YUFDWCxHQUFHLENBQ0YsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNKLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7WUFDakUsQ0FBQyxDQUFDLE1BQU07WUFDUixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDN0I7YUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUVsQixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzVCLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUN4QixPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNiLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7Z0JBQ3JFLE9BQU8sRUFBRSxDQUFDO1lBQ1osT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7UUFDakQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELE9BQU8sU0FBZ0IsQ0FBQztBQUMxQixDQUFDO0FBRUQsUUFBUTtBQUNSLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBUyxFQUFVLEVBQUU7SUFDbEMsT0FBTyxDQUNMLEdBQUc7UUFDSCw0Q0FBNEM7UUFDNUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sQ0FDTDtnQkFDRSxHQUFHLEVBQUUsS0FBSztnQkFDVixJQUFJLEVBQUUsTUFBTTtnQkFDWixJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsS0FBSzthQUNaLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQzlELENBQUM7UUFDSixDQUFDLENBQUM7UUFDRixHQUFHLENBQ0osQ0FBQztBQUNKLENBQUMsQ0FBQyJ9