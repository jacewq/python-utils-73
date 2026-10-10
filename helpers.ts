/**
 * Safely parses input for python-utils-73 operations.
 */
export function safeParseJson<T>(input: unknown, defaultValue: T): T {
  if (typeof input !== 'string') {
    return defaultValue;
  }

  try {
    return JSON.parse(input) as T;
  } catch (err) {
    console.error('Failed to parse input string:', err);
    return defaultValue;
  }
}

/**
 * Handles potential null or undefined identifiers gracefully.
 */
export function validateId(id: string | null | undefined): string {
  if (!id || id.trim().length === 0) {
    throw new Error('Identifier cannot be empty or null');
  }
  return id.trim();
}

/**
 * Wrapper for operations requiring strict output validation.
 */
export async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error('Operation timed out')), ms)
  );
  
  return Promise.race([promise, timeout]);
}

/**
 * Ensures array input for bulk python operations.
 */
export function ensureArray<T>(data: T | T[] | undefined | null): T[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}