/**
 * Python-like utility service providing common data structures and sequence manipulation.
 */

export interface KeyValuePair<K = string, V = unknown> {
  key: K;
  value: V;
}

export class PythonUtilsService {
  /**
   * Zips two arrays together into an array of key-value tuples, similar to Python's zip().
   *
   * @template T, U
   * @param keys First array sequence
   * @param values Second array sequence
   * @returns Array of paired elements
   */
  public static zip<T, U>(keys: T[], values: U[]): Array<[T, U]> {
    const minLength = Math.min(keys.length, values.length);
    const result: Array<[T, U]> = [];

    for (let i = 0; i < minLength; i++) {
      result.push([keys[i], values[i]]);
    }

    return result;
  }

  /**
   * Simulates Python's dict.get method with fallback default value.
   *
   * @template T, K, D
   * @param record Target dictionary object
   * @param key Property key to retrieve
   * @param defaultValue Default value when key does not exist
   * @returns Value associated with key or default value
   */
  public static dictGet<T extends Record<string, unknown>, K extends string, D>(
    record: T,
    key: K,
    defaultValue: D
  ): unknown {
    if (Object.prototype.hasOwnProperty.call(record, key) && record[key] !== undefined) {
      return record[key];
    }
    return defaultValue;
  }

  /**
   * Generates an array of numbers over a specified range, mimicking Python's range().
   *
   * @param start Start integer (inclusive) or stop if end is undefined
   * @param end Stop integer (exclusive)
   * @param step Value increment step
   * @returns Array of numbers in specified range
   */
  public static range(start: number, end?: number, step: number = 1): number[] {
    let actualStart = start;
    let actualEnd = end;

    if (actualEnd === undefined) {
      actualEnd = start;
      actualStart = 0;
    }

    if (step === 0) {
      throw new Error("Step parameter cannot be zero");
    }

    const result: number[] = [];
    if (step > 0) {
      for (let i = actualStart; i < actualEnd; i += step) {
        result.push(i);
      }
    } else {
      for (let i = actualStart; i > actualEnd; i += step) {
        result.push(i);
      }
    }

    return result;
  }
}
