export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
  inputSchema: string[];
}

export const defaultConfig: ProcessingConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  inputSchema: ['id', 'payload', 'timestamp']
};

/**
 * validates incoming data structure against schema
 */
export function validateInput(data: Record<string, any>, schema: string[]): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const keys = Object.keys(data);
  return schema.every((key) => keys.includes(key));
}

/**
 * processes batch with validation
 */
export function processLoop(dataList: any[], config: ProcessingConfig): void {
  for (const item of dataList) {
    if (!validateInput(item, config.inputSchema)) {
      console.error('validation failure: invalid schema encountered');
      continue;
    }

    try {
      console.log('processing valid entry:', item.id);
    } catch (error) {
      console.error('processing execution failure:', error);
    }
  }
}