/**
 * Core utilities for data manipulation in python-utils-73
 */

export type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

/**
 * Ensures a value is returned as an array
 * @param input The value to wrap or return
 * @returns An array containing the item or the original array
 */
export function ensureArray<T>(input: T | T[]): T[] {
  return Array.isArray(input) ? input : [input];
}

/**
 * Sanitizes string input by trimming and removing null bytes
 * @param input The raw string input
 * @returns A cleaned string ready for processing
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/\0/g, '');
}

/**
 * Deeply clones a standard JSON-serializable object
 * @param data The object to clone
 * @returns A deep copy of the input object
 */
export function deepClone<T extends JsonValue>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Checks if an object is empty
 * @param obj The object to inspect
 * @returns True if object has no enumerable keys
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}