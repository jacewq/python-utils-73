import { readFileSync } from 'fs';

export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  host: '127.0.0.1',
  port: 8080,
  debug: false,
};

/**
 * Merges file-based config with system defaults
 */
export function loadConfig(path?: string): AppConfig {
  let fileConfig: Partial<AppConfig> = {};

  if (path) {
    try {
      const raw = readFileSync(path, 'utf-8');
      fileConfig = JSON.parse(raw) as Partial<AppConfig>;
    } catch (err) {
      console.error(`Failed to load config at ${path}, using defaults`);
    }
  }

  return {
    ...DEFAULT_CONFIG,
    ...fileConfig,
  };
}

/**
 * Type guard for validating config integrity
 */
export function isValidConfig(config: any): config is AppConfig {
  return (
    typeof config.host === 'string' &&
    typeof config.port === 'number' &&
    typeof config.debug === 'boolean'
  );
}