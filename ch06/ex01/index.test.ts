import { newHashTable } from './index.ts';

describe('HashTable', () => {
  it('should insert and retrieve values correctly', () => {
    const ht = newHashTable(10);
    ht.put('key1', 'value1');
    ht.put('key2', { a: 1 });
    expect(ht.get('key1')).toBe('value1');
    expect(ht.get('key2')).toEqual({ a: 1 });
    expect(ht.size).toBe(2);
  });

  it('should overwrite existing key', () => {
    const ht = newHashTable(10);
    ht.put('key', 'value1');
    ht.put('key', 'value2');
    expect(ht.get('key')).toBe('value2');
    expect(ht.size).toBe(1);
  });

  it('should remove key and update size', () => {
    const ht = newHashTable(10);
    ht.put('key1', 'value1');
    ht.put('key2', 'value2');
    ht.remove('key1');
    expect(ht.get('key1')).toBeUndefined();
    expect(ht.size).toBe(1);
  });

  it('should not change size if removing non-existent key', () => {
    const ht = newHashTable(10);
    ht.put('key1', 'value1');
    ht.remove('nonexistent');
    expect(ht.size).toBe(1);
  });

  it('should handle collisions correctly', () => {
    const ht = newHashTable(1);
    ht.put('a', 1);
    ht.put('b', 2);
    ht.put('c', 3);
    expect(ht.get('a')).toBe(1);
    expect(ht.get('b')).toBe(2);
    expect(ht.get('c')).toBe(3);
    expect(ht.size).toBe(3);
  });

  it('should remove middle node in chain correctly', () => {
    const ht = newHashTable(1);
    ht.put('a', 1);
    ht.put('b', 2);
    ht.put('c', 3);
    ht.remove('b');
    expect(ht.get('b')).toBeUndefined();
    expect(ht.get('a')).toBe(1);
    expect(ht.get('c')).toBe(3);
    expect(ht.size).toBe(2);
  });

  it('should remove head of chain correctly', () => {
    const ht = newHashTable(1);
    ht.put('a', 1);
    ht.put('b', 2);
    ht.remove('a');
    expect(ht.get('a')).toBeUndefined();
    expect(ht.get('b')).toBe(2);
    expect(ht.size).toBe(1);
  });

  it('should remove tail of chain correctly', () => {
    const ht = newHashTable(1);
    ht.put('a', 1);
    ht.put('b', 2);
    ht.put('c', 3);
    ht.remove('c');
    expect(ht.get('c')).toBeUndefined();
    expect(ht.size).toBe(2);
  });
});
