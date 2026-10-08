import * as fs from 'fs';

export interface AppConfig {
  port: number;
  debug: boolean;
  timeout: number;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  debug: false,
  timeout: 5000,
};

/**
 * loads json configuration with fallback defaults
 */
export function loadConfig(path: string): AppConfig {
  try {
    if (!fs.existsSync(path)) {
      return { ...DEFAULT_CONFIG };
    }

    const fileContent = fs.readFileSync(path, 'utf-8');
    const userConfig = JSON.parse(fileContent);

    return {
      ...DEFAULT_CONFIG,
      ...userConfig,
    };
  } catch (error) {
    console.error('failed to load config, using defaults:', error);
    return { ...DEFAULT_CONFIG };
  }
}