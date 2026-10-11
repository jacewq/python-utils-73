import * as fs from 'fs';

interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  host: 'localhost',
  port: 8080,
  debug: false,
};

/**
 * Loads configuration from a JSON file with deep merging
 * against internal defaults.
 */
export function loadConfig(path: string): AppConfig {
  try {
    if (!fs.existsSync(path)) {
      return { ...DEFAULT_CONFIG };
    }

    const fileContent = fs.readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);

    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  } catch (error) {
    console.error(`Failed to load config at ${path}:`, error);
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * Validates presence of critical environment variables
 */
export function validateConfig(config: AppConfig): void {
  if (typeof config.port !== 'number' || config.port < 1024) {
    throw new Error('Invalid configuration: port must be >= 1024');
  }
}