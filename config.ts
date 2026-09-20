import * as fs from 'fs';

interface AppConfig {
  port: number;
  debug: boolean;
  timeout: number;
}

const defaultSettings: AppConfig = {
  port: 3000,
  debug: false,
  timeout: 5000,
};

/**
 * Merges user configuration with application defaults
 */
export function loadConfig(path: string): AppConfig {
  try {
    if (!fs.existsSync(path)) {
      return { ...defaultSettings };
    }

    const rawData = fs.readFileSync(path, 'utf-8');
    const userConfig: Partial<AppConfig> = JSON.parse(rawData);

    return {
      ...defaultSettings,
      ...userConfig,
    };
  } catch (error) {
    console.error('Failed to parse config file, using defaults');
    return { ...defaultSettings };
  }
}

export const config = loadConfig('./config.json');