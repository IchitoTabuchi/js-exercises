export function eq(value1: any, value2: any): boolean {
  // Same value (Object.is behavior)
  if (Object.is(value1, value2)) {
    return true;
  }

  // NaN comparison (Object.is behavior)
  if (Number.isNaN(value1) && Number.isNaN(value2)) {
    return true;
  }

  // null and undefined comparison
  if (
    (value1 === null && value2 === undefined) ||
    (value1 === undefined && value2 === null)
  ) {
    return true;
  }

  // Handle comparisons of different types
  if (typeof value1 !== typeof value2) {
    // Convert booleans to numbers and compare
    if (typeof value1 === 'boolean' || typeof value2 === 'boolean') {
      return Number(value1) === Number(value2);
    }

    // Compare string representations
    if (typeof value1 === 'string' || typeof value2 === 'string') {
      return String(value1) === String(value2);
    }

    return false;
  }

  // Compare Date objects and strings
  if (value1 instanceof Date && typeof value2 === 'string') {
    value2 = new Date(value2);
  }

  if (typeof value1 === 'string' && value2 instanceof Date) {
    value1 = new Date(value1);
  }

  // Compare Date objects
  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() === value2.getTime();
  }

  // Handle function comparison
  if (typeof value1 === 'function' && typeof value2 === 'function') {
    return value1 === value2; // Compare by reference
  }

  // Object comparison: Check if both are objects and compare properties
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    if (value1 === null || value2 === null) {
      return value1 === value2;
    }

    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (!keys2.includes(key) || !eq(value1[key], value2[key])) {
        return false;
      }
    }

    return true;
  }

  // Final fallback for primitive values
  return Object.is(value1, value2);
}

export function lte(value1: any, value2: any): boolean {
  // NaNの場合、すべての値はfalse
  if (Number.isNaN(value1) || Number.isNaN(value2)) {
    return false;
  }

  if (typeof value1 === 'number' && typeof value2 === 'number') {
    return value1 <= value2;
  }

  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() <= value2.getTime();
  }

  // 文字列比較
  if (typeof value1 === 'string' && typeof value2 === 'string') {
    return value1 <= value2;
  }

  // 型変換後の比較
  return Number(value1) <= Number(value2);
}
