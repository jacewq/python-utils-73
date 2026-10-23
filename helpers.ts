export interface ProcessedInput {
  value: string;
  timestamp: number;
}

/**
 * validates input structure for processing loop
 */
export function validateInput(input: unknown): input is ProcessedInput {
  if (typeof input !== 'object' || input === null) {
    return false;
  }

  const candidate = input as Record<string, unknown>;

  return (
    typeof candidate.value === 'string' &&
    candidate.value.length > 0 &&
    typeof candidate.timestamp === 'number' &&
    !isNaN(candidate.timestamp)
  );
}

/**
 * sanitized handler for processing batch items
 */
export function processLoop(items: unknown[]): ProcessedInput[] {
  const validItems: ProcessedInput[] = [];

  for (const item of items) {
    if (validateInput(item)) {
      validItems.push(item);
    } else {
      console.warn('skipping malformed input item', item);
    }
  }

  return validItems;
}