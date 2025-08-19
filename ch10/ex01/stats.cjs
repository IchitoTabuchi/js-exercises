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
