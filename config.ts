export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
  inputSchema: Record<string, string>;
}

/**
 * Validates incoming data against the defined schema
 * to ensure type safety in the main processing loop
 */
export function validateInput(data: unknown, schema: Record<string, string>): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const input = data as Record<string, any>;
  for (const [key, expectedType] of Object.entries(schema)) {
    if (typeof input[key] !== expectedType) {
      return false;
    }
  }

  return true;
}

export const DEFAULT_CONFIG: ProcessingConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  inputSchema: {
    id: 'number',
    payload: 'string',
    active: 'boolean'
  }
};

export function processLoop(items: unknown[]): void {
  for (const item of items) {
    if (!validateInput(item, DEFAULT_CONFIG.inputSchema)) {
      console.error('Invalid item format skipped:', item);
      continue;
    }
    
    // Proceed with safe processing
    console.log('Processing item:', (item as any).id);
  }
}