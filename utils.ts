/**
 * Utility functions inspired by Python standard library behaviors
 * with comprehensive edge-case handling.
 */

export class UtilityError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'UtilityError';
  }
}

/**
 * Safely parses a JSON string with fallback value and error context.
 */
export function safeJsonParse<T>(jsonString: string | null | undefined, fallback: T): T {
  if (!jsonString || typeof jsonString !== 'string') {
    return fallback;
  }
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

/**
 * Accesses nested properties safely, returning fallback if any key fails or is null.
 */
export function safeGet<T, R>(obj: T, path: string, fallback: R): R {
  if (obj === null || obj === undefined || typeof path !== 'string' || !path.trim()) {
    return fallback;
  }

  const keys = path.split('.').filter(Boolean);
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return fallback;
    }
    current = current[key];
  }

  return (current !== undefined ? current : fallback) as R;
}

/**
 * Generates an array of numbers like Python's range(), handling negative steps and zero steps safely.
 */
export function safeRange(start: number, stop?: number, step: number = 1): number[] {
  if (typeof start !== 'number' || Number.isNaN(start)) {
    throw new UtilityError('Start value must be a valid number', 'INVALID_START');
  }

  let actualStart = start;
  let actualStop = stop;

  if (actualStop === undefined) {
    actualStop = actualStart;
    actualStart = 0;
  }

  if (step === 0) {
    throw new UtilityError('Step size cannot be zero', 'ZERO_STEP');
  }

  if (!Number.isFinite(actualStart) || !Number.isFinite(actualStop) || !Number.isFinite(step)) {
    throw new UtilityError('Range arguments must be finite numbers', 'NON_FINITE_ARGS');
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = actualStart; i < actualStop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = actualStart; i > actualStop; i += step) {
      result.push(i);
    }
  }

  return result;
}