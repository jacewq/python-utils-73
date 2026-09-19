import * as fs from 'fs';

export interface AppConfig {
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
 * Loads configuration from a JSON file or returns defaults
 */
export function loadConfig(path?: string): AppConfig {
  if (!path || !fs.existsSync(path)) {
    return { ...DEFAULT_CONFIG };
  }

  try {
    const rawData = fs.readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(rawData);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (error) {
    console.error(`Failed to parse config at ${path}, using defaults`, error);
    return { ...DEFAULT_CONFIG };
  }
}