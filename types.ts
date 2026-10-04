export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
  inputSchema: Record<string, string>;
}

export interface ProcessedResult {
  status: 'success' | 'error';
  payload?: unknown;
  error?: string;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateInput(data: unknown, schema: Record<string, string>): void {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Input must be a non-null object');
  }

  for (const [key, type] of Object.entries(schema)) {
    const value = (data as Record<string, unknown>)[key];
    if (typeof value !== type) {
      throw new ValidationError(`Property ${key} must be of type ${type}`);
    }
  }
}

export function runProcessingLoop(items: unknown[], schema: Record<string, string>): ProcessedResult[] {
  return items.map((item) => {
    try {
      validateInput(item, schema);
      return { status: 'success', payload: item };
    } catch (err) {
      return {
        status: 'error',
        error: err instanceof ValidationError ? err.message : 'Unknown processing error'
      };
    }
  });
}