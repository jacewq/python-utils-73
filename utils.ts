/**
 * Generates an arithmetic progression of integers, mimicking Python's range().
 * Handles edge cases like zero step, float inputs, and negative steps.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step === 0) {
    throw new RangeError("range() arg 3 must not be zero");
  }

  if (!Number.isInteger(start) || !Number.isInteger(stop) || !Number.isInteger(step)) {
    throw new TypeError("range() arguments must be integers");
  }

  const result: number[] = [];

  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }

  return result;
}

/**
 * Safely retrieves a nested property from an object using a dot-notation path,
 * mimicking a robust nested getattr or dict.get with error resilience.
 */
export function getNestedValue(obj: unknown, path: string, defaultValue: unknown = undefined): unknown {
  if (obj === null || obj === undefined || typeof path !== "string") {
    return defaultValue;
  }

  const parts = path.split(".");
  let current: any = obj;

  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return defaultValue;
    }
    current = current[part];
  }

  return current === undefined ? defaultValue : current;
}