export const assign = (target, ...sources) => {
    if (target == null)
        throw new TypeError('Cannot convert undefined or null to object');
    const to = Object(target);
    for (const src of sources ?? [])
        if (src != null) {
            for (const key of Object.keys(src))
                to[key] = src[key];
            const symbols = Object.getOwnPropertySymbols(src);
            if (symbols.length > 0) {
                const sym = symbols[0];
                to[sym] = src[sym];
            }
        }
    return to;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFjLEVBQUUsR0FBRyxPQUFpQixFQUFFLEVBQUU7SUFDN0QsSUFBSSxNQUFNLElBQUksSUFBSTtRQUNoQixNQUFNLElBQUksU0FBUyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7SUFDcEUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLEtBQUssTUFBTSxHQUFHLElBQUksT0FBTyxJQUFJLEVBQUU7UUFDN0IsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDaEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFBRyxFQUFVLENBQUMsR0FBRyxDQUFDLEdBQUksR0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsRUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFJLEdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQztJQUNILE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyxDQUFDIn0=