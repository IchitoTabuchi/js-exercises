// npm test ch05/ex02
import { escapeStringIf, escapeStringSwitch } from './index.ts';
describe('escapeString functions', () => {
    const testCases = [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUJBQXFCO0FBRXJCLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFaEUsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtJQUN0QyxNQUFNLFNBQVMsR0FBdUI7UUFDcEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ1YsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1FBQ2QsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ2IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ2IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ2IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ2IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ2IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ2IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ2IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1FBQ1osQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1FBQ1osQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ1IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDO1FBQzlCLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQztRQUN2QixDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDO1FBQ3hDLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztRQUM5QixDQUFDLHdCQUF3QixFQUFFLG1DQUFtQyxDQUFDO1FBQy9ELENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUM7S0FDdkMsQ0FBQztJQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDWixDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztRQUNsQyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDO0tBQzNDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUU7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUMvRCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9