import { sequenceToObject } from './index.ts';

describe('sequenceToObject', () => {
  it('returns object for valid string-value pairs', () => {
    expect(sequenceToObject('a', 1, 'b', 2)).toEqual({ a: 1, b: 2 });
    expect(sequenceToObject('key', 'value')).toEqual({ key: 'value' });
    expect(sequenceToObject('x', null, 'y', undefined)).toEqual({
      x: null,
      y: undefined,
    });
    expect(sequenceToObject('flag', true, 'count', 0)).toEqual({
      flag: true,
      count: 0,
    });
  });

  it('throws error when number of arguments is odd', () => {
    expect(() => sequenceToObject('a', 1, 'b')).toThrow(
      'Invalid number of arguments. Expected even number of elements.'
    );
    expect(() => sequenceToObject('onlyKey')).toThrow(
      'Invalid number of arguments. Expected even number of elements.'
    );
  });

  it('throws error when a key is not a string', () => {
    expect(() => sequenceToObject(1, 'value')).toThrow(
      'Key at index 0 is not a string: 1'
    );
    expect(() => sequenceToObject('a', 1, {}, 2)).toThrow(
      'Key at index 2 is not a string: [object Object]'
    );
    expect(() => sequenceToObject(true, 'yes')).toThrow(
      'Key at index 0 is not a string: true'
    );
  });

  it('returns empty object when called with no arguments', () => {
    expect(sequenceToObject()).toEqual({});
  });

  it('works with spread operator', () => {
    const args = ['name', 'Alice', 'age', 30];
    const obj = sequenceToObject(...args);
    expect(obj).toEqual({ name: 'Alice', age: 30 });
  });

  it('throws error via spread operator when key is not string', () => {
    const args = [true, 'value'];
    expect(() => sequenceToObject(...args)).toThrow(
      'Key at index 0 is not a string: true'
    );
  });

  it('throws error via spread operator when length is odd', () => {
    const args = ['a', 1, 'b'];
    expect(() => sequenceToObject(...args)).toThrow(
      'Invalid number of arguments. Expected even number of elements.'
    );
  });
});
