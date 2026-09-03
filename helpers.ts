export interface ProcessedData {
  id: string;
  value: number;
}

/**
 * Validates the raw input object for the processing loop.
 * Ensures required fields exist and conform to expected types.
 */
export function validateInput(data: unknown): data is ProcessedData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const candidate = data as Record<string, unknown>;

  const isIdValid = typeof candidate.id === 'string' && candidate.id.length > 0;
  const isValueValid = typeof candidate.value === 'number' && Number.isFinite(candidate.value);

  return isIdValid && isValueValid;
}

/**
 * Main processing loop wrapper with input validation.
 */
export function processBatch(inputs: unknown[]): ProcessedData[] {
  const results: ProcessedData[] = [];

  for (const item of inputs) {
    if (validateInput(item)) {
      results.push(item);
    } else {
      console.warn('Skipping invalid input record:', item);
    }
  }

  return results;
}