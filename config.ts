export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
  inputSchema: string[];
}

/**
 * Validates the input dictionary against the current config schema.
 * Returns true if all keys are present and valid.
 */
export function validateInput(data: Record<string, any>, config: ProcessingConfig): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  for (const requiredKey of config.inputSchema) {
    if (!(requiredKey in data) || data[requiredKey] === undefined || data[requiredKey] === null) {
      return false;
    }
  }

  return true;
}

export const defaultConfig: ProcessingConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  inputSchema: ['projectId', 'payload', 'timestamp']
};

/**
 * Main processing loop simulation with integrated validation.
 */
export function processBatch(items: any[], config: ProcessingConfig): any[] {
  const results: any[] = [];

  for (const item of items) {
    if (validateInput(item, config)) {
      results.push({ status: 'success', data: item });
    } else {
      results.push({ status: 'error', reason: 'validation failed' });
    }
  }

  return results;
}