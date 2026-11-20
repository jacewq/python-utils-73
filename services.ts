export interface DataProcessor<T> {
  transform: (data: unknown) => T | null;
  validate: (data: T) => boolean;
}

/**
 * Safely processes input data using a provided schema or transformation logic
 */
export function processData<T>(
  input: unknown,
  processor: DataProcessor<T>,
  fallback: T
): T {
  try {
    const transformed = processor.transform(input);
    if (transformed !== null && processor.validate(transformed)) {
      return transformed;
    }
  } catch (error) {
    console.error('Data processing failure:', error);
  }
  return fallback;
}

/**
 * Normalizes object keys to lowercase for consistent data access
 */
export function normalizeKeys<T extends Record<string, any>>(obj: T): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Batch grouping utility for array data reduction
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}