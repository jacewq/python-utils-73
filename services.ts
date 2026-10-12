/**
 * Service providing utility methods for manipulating and transforming
 * nested object structures similar to Python dictionary operations.
 */

export type Dict<T = any> = Record<string, T>;

export class DataTransformService {
  /**
   * Flattens a nested object into a single-level object with dot-notated keys.
   */
  static flatten(obj: Dict, prefix = ''): Dict {
    const flattened: Dict = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length > 0
      ) {
        Object.assign(flattened, this.flatten(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }

    return flattened;
  }

  /**
   * Unflattens a dot-notated single-level object back into a nested object structure.
   */
  static unflatten(obj: Dict): Dict {
    const result: Dict = {};

    for (const [key, value] of Object.entries(obj)) {
      const keys = key.split('.');
      let current = result;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
          current[k] = value;
        } else {
          if (!(k in current) || typeof current[k] !== 'object' || current[k] === null) {
            current[k] = {};
          }
          current = current[k];
        }
      }
    }

    return result;
  }

  /**
   * Safely retrieves nested values using dot-notation path with default fallback.
   */
  static getPath<T = any>(obj: Dict, path: string, defaultValue?: T): T | undefined {
    const keys = path.split('.');
    let current: any = obj;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[key];
    }

    return current === undefined ? defaultValue : current;
  }
}
