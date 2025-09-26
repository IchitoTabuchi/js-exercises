export const escapeStringIf = (input) => {
    let result = '';
    for (const ch of input) {
        if (ch === '\0')
            result += '\\0';
        else if (ch === '\b')
            result += '\\b';
        else if (ch === '\t')
            result += '\\t';
        else if (ch === '\n')
            result += '\\n';
        else if (ch === '\v')
            result += '\\v';
        else if (ch === '\f')
            result += '\\f';
        else if (ch === '\r')
            result += '\\r';
        else if (ch === '"')
            result += '\\"';
        else if (ch === "'")
            result += "\\'";
        else if (ch === '\\')
            result += '\\\\';
        else
            result += ch;
    }
    return result;
};
export const escapeStringSwitch = (input) => {
    let result = '';
    for (const ch of input) {
        switch (ch) {
            case '\0':
                result += '\\0';
                break;
            case '\b':
                result += '\\b';
                break;
            case '\t':
                result += '\\t';
                break;
            case '\n':
                result += '\\n';
                break;
            case '\v':
                result += '\\v';
                break;
            case '\f':
                result += '\\f';
                break;
            case '\r':
                result += '\\r';
                break;
            case '"':
                result += '\\"';
                break;
            case "'":
                result += "\\'";
                break;
            case '\\':
                result += '\\\\';
                break;
            default:
                result += ch;
        }
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFhLEVBQVUsRUFBRTtJQUN0RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN2QixJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUM1QixJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNqQyxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNqQyxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNqQyxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNqQyxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNqQyxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNqQyxJQUFJLEVBQUUsS0FBSyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNoQyxJQUFJLEVBQUUsS0FBSyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQzthQUNoQyxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQzs7WUFDbEMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxLQUFhLEVBQVUsRUFBRTtJQUMxRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN2QixRQUFRLEVBQUUsRUFBRSxDQUFDO1lBQ1gsS0FBSyxJQUFJO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQUM7Z0JBQ2hCLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQztnQkFDaEIsTUFBTTtZQUNSLEtBQUssSUFBSTtnQkFDUCxNQUFNLElBQUksS0FBSyxDQUFDO2dCQUNoQixNQUFNO1lBQ1IsS0FBSyxJQUFJO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQUM7Z0JBQ2hCLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQztnQkFDaEIsTUFBTTtZQUNSLEtBQUssSUFBSTtnQkFDUCxNQUFNLElBQUksS0FBSyxDQUFDO2dCQUNoQixNQUFNO1lBQ1IsS0FBSyxJQUFJO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQUM7Z0JBQ2hCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQztnQkFDaEIsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixNQUFNLElBQUksS0FBSyxDQUFDO2dCQUNoQixNQUFNO1lBQ1IsS0FBSyxJQUFJO2dCQUNQLE1BQU0sSUFBSSxNQUFNLENBQUM7Z0JBQ2pCLE1BQU07WUFDUjtnQkFDRSxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=