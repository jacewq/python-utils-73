import * as fs from 'fs';
import * as path from 'path';

export interface AppConfig {
  timeout: number;
  retries: number;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  timeout: 3000,
  retries: 3,
  debug: false,
};

/**
 * Loads configuration from a JSON file with deep merging against defaults.
 */
export function loadConfig(configPath: string): AppConfig {
  try {
    if (!fs.existsSync(configPath)) {
      return { ...DEFAULT_CONFIG };
    }

    const fileContent = fs.readFileSync(path.resolve(configPath), 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);

    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  } catch (error) {
    console.error(`Failed to load config at ${configPath}, using defaults:`, error);
    return { ...DEFAULT_CONFIG };
  }
}
