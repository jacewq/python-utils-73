import { readFileSync } from 'fs';

export interface AppConfig {
  port: number;
  host: string;
  timeout: number;
}

const defaults: AppConfig = {
  port: 8080,
  host: 'localhost',
  timeout: 5000
};

/**
 * Loads configuration from a JSON file, merging with defaults.
 */
export function loadConfig(path?: string): AppConfig {
  if (!path) return { ...defaults };

  try {
    const fileContent = readFileSync(path, 'utf-8');
    const userConfig = JSON.parse(fileContent);
    return { ...defaults, ...userConfig };
  } catch (err) {
    console.error('Failed to load config, falling back to defaults');
    return { ...defaults };
  }
}
