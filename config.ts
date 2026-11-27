import fs from 'fs';

interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

/**
 * Loads configuration from a JSON file with fallback to defaults
 */
export function loadConfig(path: string = './config.json'): AppConfig {
  try {
    if (!fs.existsSync(path)) {
      return { ...DEFAULT_CONFIG };
    }

    const data = fs.readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(data);

    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  } catch (error) {
    console.error(`Failed to load config at ${path}, using defaults:`, error);
    return { ...DEFAULT_CONFIG };
  }
}