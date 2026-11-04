/**
 * Configuration and validation schemas for python-utils-73
 */

export interface ProcessConfig {
  inputPath: string;
  maxRetries: number;
  timeoutMs: number;
}

export class ConfigValidator {
  /**
   * Validates configuration objects before processing
   */
  public static validate(config: unknown): config is ProcessConfig {
    const c = config as any;

    if (typeof c !== 'object' || c === null) {
      return false;
    }

    if (typeof c.inputPath !== 'string' || c.inputPath.trim() === '') {
      return false;
    }

    if (typeof c.maxRetries !== 'number' || c.maxRetries < 0) {
      return false;
    }

    if (typeof c.timeoutMs !== 'number' || c.timeoutMs <= 0) {
      return false;
    }

    return true;
  }

  public static getDefaultConfig(): ProcessConfig {
    return {
      inputPath: './data',
      maxRetries: 3,
      timeoutMs: 5000,
    };
  }
}

/**
 * Main processing loop entry point with validation
 */
export function processLoop(config: unknown): void {
  if (!ConfigValidator.validate(config)) {
    throw new Error('invalid configuration schema provided');
  }

  console.log('processing with config:', config);
}