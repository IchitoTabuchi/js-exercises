// npm test ch03/ex05
import { convertCRLFtoLF, convertLFtoCRLF } from './index.ts';
describe('Newline conversion functions', () => {
    test('convertLFtoCRLF should convert LF to CR+LF', () => {
        const input = 'Hello\nWorld\nTest';
        const expected = 'Hello\r\nWorld\r\nTest';
        expect(convertLFtoCRLF(input)).toBe(expected);
    });
    test('convertCRLFtoLF should convert CR+LF to LF', () => {
        const input = 'Hello\r\nWorld\r\nTest';
        const expected = 'Hello\nWorld\nTest';
        expect(convertCRLFtoLF(input)).toBe(expected);
    });
    test('convertLFtoCRLF should not modify a string without LF', () => {
        const input = 'Hello World Test';
        expect(convertLFtoCRLF(input)).toBe(input);
    });
    test('convertCRLFtoLF should not modify a string without CR+LF', () => {
        const input = 'Hello\nWorld\nTest';
        expect(convertCRLFtoLF(input)).toBe(input);
    });
    test('convertLFtoCRLF followed by convertCRLFtoLF should return the original string', () => {
        const input = 'Hello\nWorld\nTest';
        const converted = convertLFtoCRLF(input);
        expect(convertCRLFtoLF(converted)).toBe(input);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUJBQXFCO0FBRXJCLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTlELFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7SUFDNUMsSUFBSSxDQUFDLDRDQUE0QyxFQUFFLEdBQUcsRUFBRTtRQUN0RCxNQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztRQUNuQyxNQUFNLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQztRQUMxQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLDRDQUE0QyxFQUFFLEdBQUcsRUFBRTtRQUN0RCxNQUFNLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQztRQUN0QyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLHVEQUF1RCxFQUFFLEdBQUcsRUFBRTtRQUNqRSxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztRQUNqQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLDBEQUEwRCxFQUFFLEdBQUcsRUFBRTtRQUNwRSxNQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztRQUNuQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLCtFQUErRSxFQUFFLEdBQUcsRUFBRTtRQUN6RixNQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=