// Configuration loader with defaults from environment and overrides

interface Config {
  port: number;
  host: string;
  debug: boolean;
  maxConnections: number;
  timeout: number;
}

const DEFAULTS: Config = {
  port: 8080,
  host: '0.0.0.0',
  debug: false,
  maxConnections: 100,
  timeout: 30000
};

export class ConfigService {
  private loadedConfig: Config;

  constructor(customConfig: Partial<Config> = {}) {
    this.loadedConfig = this.mergeConfigs(customConfig);
  }

  private mergeConfigs(custom: Partial<Config>): Config {
    const envOverrides: Partial<Config> = {};

    const portEnv = process.env.PORT;
    if (portEnv) {
      const portNum = parseInt(portEnv, 10);
      if (!isNaN(portNum) && portNum > 0) envOverrides.port = portNum;
    }

    if (process.env.HOST) envOverrides.host = process.env.HOST;

    const debugEnv = process.env.DEBUG;
    if (debugEnv !== undefined) {
      envOverrides.debug = debugEnv.toLowerCase() === 'true' || debugEnv === '1';
    }

    const maxConnEnv = process.env.MAX_CONNECTIONS;
    if (maxConnEnv) {
      const num = parseInt(maxConnEnv, 10);
      if (!isNaN(num) && num > 0) envOverrides.maxConnections = num;
    }

    const timeoutEnv = process.env.TIMEOUT;
    if (timeoutEnv) {
      const num = parseInt(timeoutEnv, 10);
      if (!isNaN(num) && num > 0) envOverrides.timeout = num;
    }

    return { ...DEFAULTS, ...envOverrides, ...custom };
  }

  getConfig(): Config {
    return { ...this.loadedConfig };
  }
}

export function loadConfiguration(custom: Partial<Config> = {}): Config {
  return new ConfigService(custom).getConfig();
}