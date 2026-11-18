import { readFileSync, existsSync } from 'fs';

export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 8080,
  host: 'localhost',
  debug: false,
};

/**
 * Loads configuration from a JSON file with deep merge defaults.
 */
export function loadConfig(path: string): AppConfig {
  try {
    if (!existsSync(path)) {
      return { ...DEFAULT_CONFIG };
    }

    const fileContent = readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);

    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  } catch (error) {
    console.error(`Failed to load config at ${path}, using defaults:`, error);
    return { ...DEFAULT_CONFIG };
  }
}
