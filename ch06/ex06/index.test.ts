import { getAllPropertyKeys } from './index.ts';

describe('getAllPropertyKeys', () => {
  it('should include own enumerable, non-enumerable, and symbol keys', () => {
    const sym = Symbol('s');
    const obj = {} as Record<PropertyKey, any>;
    Object.defineProperty(obj, 'hidden', { value: 1, enumerable: false });
    Object.defineProperty(obj, 'visible', { value: 2, enumerable: true });
    obj[sym] = 3;

    const keys = getAllPropertyKeys(obj);
    expect(keys).toEqual(expect.arrayContaining(['hidden', 'visible', sym]));
  });

  it('should include inherited enumerable properties (string only)', () => {
    const parent = { inherited: 1 };
    const obj = Object.create(parent);
    obj.own = 2;

    const keys = getAllPropertyKeys(obj);
    expect(keys).toEqual(expect.arrayContaining(['own', 'inherited']));
  });

  it('should exclude shadowed inherited properties', () => {
    const parent = { prop: 'from parent' };
    const obj = Object.create(parent);
    obj.prop = 'from self';

    const keys = getAllPropertyKeys(obj);
    expect(keys).toContain('prop');
    expect(keys.filter((k) => k === 'prop')).toHaveLength(1);
  });

  it('should ignore non-enumerable and symbol properties on prototype', () => {
    const sym = Symbol('s');
    const proto = {} as Record<PropertyKey, any>;
    Object.defineProperty(proto, 'nonEnum', { value: 1, enumerable: false });
    proto[sym] = 2;
    const obj = Object.create(proto);

    const keys = getAllPropertyKeys(obj);
    expect(keys).not.toContain('nonEnum');
    expect(keys).not.toContain(sym);
  });

  it('should be empty object returns empty for inherited', () => {
    const obj = {};
    const keys = getAllPropertyKeys(obj);
    expect(keys).toEqual([]);
  });

  it('should be null prototype is safe', () => {
    const obj = Object.create(null);
    obj.a = 1;
    expect(getAllPropertyKeys(obj)).toEqual(['a']);
  });
});
