/**
 * Flattens a deeply nested object into a single-level object with dot-delimited keys.
 */
export function flattenObject(
  obj: Record<string, any>,
  prefix = ''
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length > 0
    ) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * Reconstructs a nested object from a flattened object with dot-delimited keys.
 */
export function unflattenObject(
  obj: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = value;
      } else {
        if (!current[k] || typeof current[k] !== 'object') {
          current[k] = {};
        }
        current = current[k];
      }
    }
  }

  return result;
}

/**
 * Groups an array of items by a key path or extraction function.
 */
export function groupBy<T>(
  items: T[],
  keySelector: (item: T) => string | number
): Record<string | number, T[]> {
  return items.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string | number, T[]>);
}