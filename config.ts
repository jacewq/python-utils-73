export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
  inputSchema: RegExp;
}

export const defaultConfig: ProcessingConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  inputSchema: /^[a-zA-Z0-9_-]+$/,
};

/**
 * validates input strings against configured patterns
 */
export function validateInput(input: unknown, config: ProcessingConfig): boolean {
  if (typeof input !== 'string') {
    return false;
  }

  if (input.length === 0 || input.length > 256) {
    return false;
  }

  return config.inputSchema.test(input);
}

/**
 * wrapper for secure processing iteration
 */
export function processLoop(items: unknown[], config: ProcessingConfig): void {
  for (const item of items) {
    if (!validateInput(item, config)) {
      console.error(`Invalid input detected: ${item}`);
      continue;
    }
    
    // perform core logic
    console.log(`Processing valid input: ${item}`);
  }
}