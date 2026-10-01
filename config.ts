import { readFileSync, existsSync } from 'fs';

interface AppConfig {
  port: number;
  debug: boolean;
  timeout: number;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 8080,
  debug: false,
  timeout: 3000
};

/**
 * Loads configuration from a JSON file with fallbacks to defaults
 */
export function loadConfig(path: string): AppConfig {
  try {
    if (!existsSync(path)) {
      return { ...DEFAULT_CONFIG };
    }

    const fileContent = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(fileContent);

    return {
      ...DEFAULT_CONFIG,
      ...parsed
    };
  } catch (error) {
    console.error(`Failed to load config at ${path}, using defaults`, error);
    return { ...DEFAULT_CONFIG };
  }
}