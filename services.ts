export class SafeParsingService {
  /**
   * Safely retrieves a deeply nested value from an object structure.
   * Handles edge cases like null, undefined, or invalid path strings.
   */
  public static getNestedValue<T = unknown>(
    obj: Record<string, any> | null | undefined,
    path: string,
    defaultValue?: T
  ): T | undefined {
    if (!obj || typeof obj !== 'object') {
      return defaultValue;
    }

    const keys = path.split('.').filter(Boolean);
    let current: any = obj;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue;
      }
      if (!(key in current)) {
        return defaultValue;
      }
      current = current[key];
    }

    return (current as T) ?? defaultValue;
  }

  /**
   * Python-style array slice with edge-case bounds checking.
   */
  public static safeSlice<T>(arr: T[] | null | undefined, start?: number, end?: number): T[] {
    if (!Array.isArray(arr)) {
      return [];
    }

    const len = arr.length;
    if (len === 0) return [];

    let s = start ?? 0;
    let e = end ?? len;

    // Handle negative indices similar to Python
    if (s < 0) s = Math.max(0, len + s);
    if (e < 0) e = Math.max(0, len + e);

    // Bound limits
    s = Math.min(Math.max(0, s), len);
    e = Math.min(Math.max(s, e), len);

    return arr.slice(s, e);
  }

  /**
   * Safely parses JSON strings with default fallback for malformed input.
   */
  public static safeJsonParse<T>(jsonString: string | null | undefined, fallback: T): T {
    if (typeof jsonString !== 'string' || !jsonString.trim()) {
      return fallback;
    }

    try {
      const parsed = JSON.parse(jsonString);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }
}