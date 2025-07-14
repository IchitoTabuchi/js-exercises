export class TypedMap<K, V> {
  private readonly keyType: string;
  private readonly valueType: string;
  private readonly map: Map<K, V>;

  constructor(
    keyType: string,
    valueType: string,
    entries?: readonly (readonly [K, V])[] | null
  ) {
    this.keyType = keyType;
    this.valueType = valueType;
    this.map = new Map<K, V>();

    if (entries) {
      for (const [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType)
          throw new TypeError(`Wrong type for entry: [${k}, ${v}]`);

        this.map.set(k, v);
      }
    }
  }

  set(key: K, value: V): this {
    if (typeof key !== this.keyType)
      throw new TypeError(`${key} is not of type ${this.keyType}`);

    if (typeof value !== this.valueType)
      throw new TypeError(`${value} is not of type ${this.valueType}`);

    this.map.set(key, value);
    return this;
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }

  forEach(
    callbackFn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: unknown
  ): void {
    this.map.forEach(callbackFn, thisArg);
  }

  get size(): number {
    return this.map.size;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map[Symbol.iterator]();
  }
}
