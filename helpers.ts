export interface ProcessInput {
  payload: Record<string, unknown>;
  timestamp: number;
}

/**
 * validates input structure for processing pipeline
 */
export function validatePayload(data: unknown): data is ProcessInput {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const input = data as Record<string, unknown>;

  // ensure payload exists and is an object
  if (typeof input.payload !== 'object' || input.payload === null) {
    return false;
  }

  // verify timestamp is a valid numeric epoch
  if (typeof input.timestamp !== 'number' || isNaN(input.timestamp)) {
    return false;
  }

  return true;
}

/**
 * processing loop runner with strict input checks
 */
export function processBatch(inputs: unknown[]): void {
  for (const item of inputs) {
    if (!validatePayload(item)) {
      console.error('Invalid schema detected, skipping entry');
      continue;
    }

    try {
      console.log('Processing valid payload at', item.timestamp);
      // execution logic goes here
    } catch (err) {
      console.error('Runtime error during iteration', err);
    }
  }
}