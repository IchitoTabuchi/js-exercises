// node ch11/ex04/index.js

/* eslint-disable @typescript-eslint/no-unused-vars */
// これから (N, K) と (K, M) の行列の乗算を行う (この値は色々変更して試すこと)
const [N, K, M] = [1000, 2000, 3000];

// 配列版: (N, K) の行列を要素数 N * K の1次元配列で表現する ((i, j) は array[K * i + j] で参照)
const lhsA = Array(N * K)
  .fill(0.0)
  .map(() => Math.random());
const rhsA = Array(K * M)
  .fill(0.0)
  .map(() => Math.random());
const resultA = Array(N * M).fill(0.0);

function arrayMultiply() {
  for (let i = 0; i < N; i++) {
    for (let k = 0; k < K; k++) {
      const tmp = lhsA[i * K + k];
      for (let j = 0; j < M; j++) resultA[i * M + j] += tmp * rhsA[k * M + j];
    }
  }
  return resultA;
}

// 型付き配列版 (Float64Array 以外の型も試してみると良い)
const lhsB = new Float64Array(N * K).map((_, i) => lhsA[i]);
const rhsB = new Float64Array(K * M).map((_, i) => rhsA[i]);
const resultB = new Float64Array(N * M);

function typedArrayMultiply() {
  for (let i = 0; i < N; i++) {
    for (let k = 0; k < K; k++) {
      const tmp = lhsB[i * K + k];
      for (let j = 0; j < M; j++) resultB[i * M + j] += tmp * rhsB[k * M + j];
    }
  }
  return resultB;
}

const TEST_TIMES = 100;
const TESTS = [arrayMultiply, typedArrayMultiply];
function test(fn) {
  let result;
  for (let i = 0; i < TEST_TIMES; ++i) {
    result = fn();
  }
  return result;
}

// warmup
for (let i = 0; i < TESTS.length; ++i) {
  test(TESTS[i]);
}

// 測定開始
for (let i = 0; i < TESTS.length; ++i) {
  const start = performance.now();
  test(TESTS[i]);
  const end = performance.now();
  console.log(`${TESTS[i].name}: ${end - start}`);
}
