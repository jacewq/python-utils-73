interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

interface ServerConfig {
  port: number;
  host: string;
  devMode: boolean;
}

interface AppConfig {
  server: ServerConfig;
  database: DatabaseConfig;
  appName: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

const DEFAULT_CONFIG: AppConfig = {
  server: {
    port: 8080,
    host: '0.0.0.0',
    devMode: false
  },
  database: {
    host: 'localhost',
    port: 5432,
    name: 'app_db',
    user: 'admin',
    password: 'password'
  },
  appName: 'MyApp',
  logLevel: 'info'
};

/**
 * Loads the application config from env vars with defaults.
 * @returns typed AppConfig
 */
export function loadConfig(): AppConfig {
  return {
    server: {
      port: parseInt(process.env.PORT || '8080', 10),
      host: process.env.HOST || '0.0.0.0',
      devMode: process.env.DEV === 'true'
    },
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      name: process.env.DB_NAME || 'app_db',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'password'
    },
    appName: process.env.APP_NAME || 'MyApp',
    logLevel: (process.env.LOG_LEVEL as any) || 'info'
  };
}

/**
 * Validates config values.
 * @param config config to check
 */
export function validateConfig(config: AppConfig): boolean {
  return config.server.port > 0 && 
         config.server.port < 65536 &&
         config.database.name.length > 0;
}

/**
 * Gets a string representation of the config for logging.
 * @param config the config object
 */
export function configToString(config: AppConfig): string {
  return `App: ${config.appName}, Port: ${config.server.port}, DB: ${config.database.name}`;
}