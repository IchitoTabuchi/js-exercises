const isIterableObject = (value) =>
  value != null &&
  typeof value !== 'string' &&
  typeof value[Symbol.iterator] === 'function';

export class MyArrayLike {
  constructor(initial = 0) {
    let arr = [];
    if (typeof initial === 'number') arr.length = initial;
    else if (isIterableObject(initial)) arr = Array.from(initial);
    else if (initial !== undefined) arr = [initial];
    Object.defineProperty(this, 'length', {
      value: arr.length,
      writable: true,
      configurable: true,
      enumerable: false,
    });
    for (let i = 0; i < arr.length; i++) this[i] = arr[i];
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) yield this[i];
  }
}

export class MyArray extends Array {
  constructor(...args) {
    const [props] = args;
    super(...props);
  }

  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
