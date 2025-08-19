/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
const { BitSet } = require('./sets.cjs');

const modules = {};
function require(moduleName) {
  return module[moduleName];
}

modules['sets.cjs'] = (function () {
  const exports = {};

  exports.BitSet = BitSet;

  return exports;
})();

modules['stats.cjs'] = (function () {
  const exports = {};
  const sum = (x, y) => x + y;
  const square = (x) => x * x;
  exports.mean = function (data) {
    return sum(...data) / data.length;
  };
  exports.stddev = function (data) {
    const mean = exports.mean(data);
    return Math.sqrt(sum(...data.map(square)) / data.length - square(mean));
  };

  return exports;
})();


/***/ }),
/* 2 */
/***/ ((module) => {

/* eslint-disable @typescript-eslint/no-unused-vars */
class AbstractSet {
  has(x) {
    {
      throw new Error('Abstract method');
    }
  }
}

class NotSet extends AbstractSet {
  constructor(set) {
    super();
    this.set = set;
  }
  has(x) {
    return !this.set.has(x);
  }
  toString() {
    return `{ x | x ∉ ${this.set.toString()} }`;
  }
}

class RangeSet extends AbstractSet {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }

  has(x) {
    return x >= this.from && x <= this.to;
  }
  toString() {
    return `{ x | ${this.from} ≤ x ≤ ${this.to} }`;
  }
}

class AbstractEnumerable extends AbstractSet {
  get size() {
    throw new Error('Abstract method');
  }
  [Symbol.iterator]() {
    throw new Error('Abstract method');
  }
  isEmpty() {
    return this.size === 0;
  }
  toString() {
    return `{${Array.from(this).join(', ')}}`;
  }
  equals(set) {
    if (!(set instanceof AbstractEnumerable)) return false;
    if (this.size !== set.size) return false;
    for (const element of this) {
      if (!set.has(element)) return false;
    }
    return true;
  }
}

class SingletonSet extends AbstractEnumerable {
  constructor(member) {
    super();
    this.member = member;
  }
  has(x) {
    return x === this.member;
  }
  get size() {
    return 1;
  }
  *[Symbol.iterator]() {
    yield this.member;
  }
}

class AbstractWritableSet extends AbstractEnumerable {
  insert(x) {
    throw new Error('Abstract method');
  }
  remove(x) {
    throw new Error('Abstract method');
  }

  add(set) {
    for (const element of set) {
      this.insert(element);
    }
  }

  subtract(set) {
    for (const element of set) {
      this.remove(element);
    }
  }

  intersect(set) {
    for (const element of set) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}

class BitSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max;
    this.n = 0;
    this.numBytes = Math.floor(max / 8) + 1;
    this.data = new Uint8Array(this.numBytes);
  }

  _valid(x) {
    return Number.isInteger(x) && x >= 0 && x <= this.max;
  }

  _has(byte, bit) {
    return (this.data[byte] & BitSet.bits[bit]) !== 0;
  }

  has(x) {
    if (this._valid(x)) {
      const byte = Math.floor(x / 8);
      const bit = x % 8;
      return this._has(byte, bit);
    } else {
      return false;
    }
  }

  insert(x) {
    if (this._valid(x)) {
      const byte = Math.floor(x / 8);
      const bit = x % 8;
      if (!this._has(byte, bit)) {
        this.data[byte] |= BitSet.bits[bit];
        this.n++;
      }
    } else {
      throw new TypeError('Invalid set element: ' + x);
    }
  }

  remove(x) {
    if (this._valid(x)) {
      const byte = Math.floor(x / 8);
      const bit = x % 8;
      if (this._has(byte, bit)) {
        this.data[byte] &= BitSet.masks[bit];
        this.n--;
      }
    } else {
      throw new TypeError('Invalid set element: ' + x);
    }
  }

  get size() {
    return this.n;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i <= this.max; i++) {
      if (this.has(i)) {
        yield i;
      }
    }
  }
}

BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);

module.exports = { BitSet };


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/* eslint-disable @typescript-eslint/no-var-requires */
const stats = __webpack_require__(1);
const BitSet = __webpack_require__(2);

let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]);

console.log(average);

})();

/******/ })()
;