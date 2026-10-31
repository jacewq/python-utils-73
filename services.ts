export interface DataEnvelope<T> {
  data: T;
  timestamp: number;
  source: string;
}

/**
 * Safely transforms incoming API data into a standardized envelope
 */
export function createDataEnvelope<T>(payload: T, source: string = 'unknown'): DataEnvelope<T> {
  return {
    data: payload,
    timestamp: Date.now(),
    source,
  };
}

/**
 * Recursively flattens an object to dot-notation strings for simplified path access
 */
export function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Filters object properties based on a provided whitelist array
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}