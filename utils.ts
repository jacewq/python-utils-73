/**
 * Python-utils-73 general utility functions
 */

export type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

/**
 * Safely deep clones a simple JSON object
 */
export function cloneObject<T extends JsonValue>(source: T): T {
  return JSON.parse(JSON.stringify(source)) as T;
}

/**
 * Generates a standard delay for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Groups an array of objects by a specific key
 */
export function groupBy<T extends Record<string, any>>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((accumulator, item) => {
    const groupKey = String(item[key]);
    if (!accumulator[groupKey]) {
      accumulator[groupKey] = [];
    }
    accumulator[groupKey].push(item);
    return accumulator;
  }, {} as Record<string, T[]>);
}

/**
 * Formats a string to title case for UI display
 */
export function toTitleCase(input: string): string {
  return input
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}