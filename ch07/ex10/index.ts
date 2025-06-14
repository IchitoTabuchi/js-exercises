function makeFixedSizeArray<T>(size: number) {
  const array = new Array<T | undefined>(size);
  return {
    get(index: number): T {
      if (index < 0 || index >= array.length) {
        throw new Error(`Array index out of range: ${index}`);
      }
      const value = array[index];
      if (value === undefined) {
        throw new Error(`Value at index ${index} is undefined`);
      }
      return value;
    },
    set(index: number, value: T) {
      if (index < 0 || index >= array.length) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length(): number {
      return array.length;
    },
  };
}

export class DynamicSizeArray<T> {
  static INITIAL_SIZE = 4;

  private array = makeFixedSizeArray<T>(DynamicSizeArray.INITIAL_SIZE);
  private len = 0;

  get(index: number): T {
    if (index < 0 || index >= this.len)
      throw new Error(`Index out of range: ${index}`);
    return this.array.get(index);
  }

  set(index: number, value: T): void {
    if (index < 0 || index >= this.len)
      throw new Error(`Index out of range: ${index}`);
    this.array.set(index, value);
  }

  length(): number {
    return this.len;
  }

  push(value: T): void {
    if (this.len >= this.array.length()) {
      const old = this.array;
      this.array = makeFixedSizeArray<T>(old.length() * 2);
      for (let i = 0; i < old.length(); i++) this.array.set(i, old.get(i));
    }
    this.array.set(this.len, value);
    this.len++;
  }
}
