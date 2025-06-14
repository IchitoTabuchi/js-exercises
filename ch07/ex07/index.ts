// node --loader ts-node/esm ch07/ex07/index.ts

export const bubbleSort = <T>(
  array: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] => {
  const arr = [...array];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1]) > 0)
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  return arr;
};

export const selectionSort = <T>(
  array: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] => {
  const arr = [...array];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (compare(arr[j], arr[minIdx]) < 0) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
};

export const heapSort = <T>(
  array: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] => {
  const a = [...array];
  const heapify = (n: number, i: number) => {
    while (true) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && compare(a[left], a[largest]) > 0) largest = left;
      if (right < n && compare(a[right], a[largest]) > 0) largest = right;

      if (largest === i) break;

      [a[i], a[largest]] = [a[largest], a[i]];
      i = largest;
    }
  };

  const n = a.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(i, 0);
  }

  return a;
};

export const mergeSort = <T>(
  array: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] => {
  let a = [...array];
  const n = a.length;
  let aux: T[] = Array(n);

  for (let width = 1; width < n; width *= 2) {
    for (let i = 0; i < n; i += 2 * width) {
      const left = i;
      const mid = Math.min(i + width, n);
      const right = Math.min(i + 2 * width, n);

      let l = left,
        r = mid,
        k = left;
      while (l < mid && r < right)
        aux[k++] = compare(a[l], a[r]) <= 0 ? a[l++] : a[r++];
      while (l < mid) aux[k++] = a[l++];
      while (r < right) aux[k++] = a[r++];
    }
    [a, aux] = [aux, a];
  }

  return a;
};

export const quickSort = <T>(
  array: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] => {
  const a = [...array];
  const stack: [number, number][] = [[0, a.length - 1]];

  while (stack.length > 0) {
    const [low, high] = stack.pop()!;
    if (low >= high) continue;

    const pivot = a[high];
    let i = low;
    for (let j = low; j < high; j++) {
      if (compare(a[j], pivot) < 0) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
      }
    }
    [a[i], a[high]] = [a[high], a[i]];

    stack.push([low, i - 1]);
    stack.push([i + 1, high]);
  }

  return a;
};
