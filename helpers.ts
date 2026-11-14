export interface InputData {
  payload: string;
  version: number;
}

/**
 * Validates input payload and version for processing
 */
export function validateInput(data: any): data is InputData {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.payload !== 'string' || data.payload.trim() === '') return false;
  if (typeof data.version !== 'number' || data.version < 1) return false;
  return true;
}

/**
 * Main loop processor with integrated validation
 */
export function processLoop(items: any[]): void {
  for (const item of items) {
    if (!validateInput(item)) {
      console.error('Invalid input encountered, skipping item:', item);
      continue;
    }

    try {
      console.log(`Processing payload: ${item.payload} (v${item.version})`);
    } catch (err) {
      console.error('Runtime error during processing:', err);
    }
  }
}