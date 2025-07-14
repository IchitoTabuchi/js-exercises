import { jest } from '@jest/globals';
import { getNow, repeatChar, square } from './index.ts';

describe('repeatChar', () => {
  it('should return an array with the character repeated n times', () => {
    expect(repeatChar(3, 'a')).toEqual(['a', 'a', 'a']);
    expect(repeatChar(0, 'b')).toEqual([]);
    expect(repeatChar(1, 'z')).toEqual(['z']);
  });

  it('should print the character n times to the console', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    repeatChar(2, 'x');
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('x');
    logSpy.mockRestore();
  });
});

describe('square', () => {
  it('should return the square of a positive number', () => {
    expect(square(2)).toBe(4);
    expect(square(5)).toBe(25);
  });

  it('should return the square of zero', () => {
    expect(square(0)).toBe(0);
  });

  it('should return the square of a negative number', () => {
    expect(square(-3)).toBe(9);
  });
});

describe('getNow', () => {
  it('should return an object with a now property', () => {
    const result = getNow();
    expect(result).toHaveProperty('now');
    expect(typeof result.now).toBe('number');
  });

  it('should return a now value close to Date.now()', () => {
    const before = Date.now();
    const { now } = getNow();
    const after = Date.now();
    expect(now).toBeGreaterThanOrEqual(before);
    expect(now).toBeLessThanOrEqual(after);
  });
});
