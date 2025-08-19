type Constructor<T = unknown> = new (...args: unknown[]) => T;

export class TypeMap {
  private map = new Map<Constructor, unknown>();

  set<T>(key: Constructor<T>, value: T): void {
    if (key === null || key === undefined)
      throw new TypeError('Key must be a constructor function');
    if (value === null || value === undefined)
      throw new TypeError('Value must be a instance of key constructor');
    if ((value as object).constructor !== key) {
      throw new TypeError(`Constructor of value must be key: ${key.name}`);
    }
    this.map.set(key, value);
  }

  get<T>(key: Constructor<T>): T | undefined {
    return this.map.get(key) as T | undefined;
  }
}
